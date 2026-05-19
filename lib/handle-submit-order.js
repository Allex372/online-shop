const { validateOrderPayload } = require('./validate-order')
const {
  checkRateLimit,
  getClientIpFromNetlifyEvent,
  getClientIpFromRequest,
} = require('./rate-limit-order')
const { submitOrder } = require('./submit-order-handler')

const MAX_BODY_BYTES = 32 * 1024

const jsonResponse = (statusCode, payload) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
})

/**
 * @param {{ body?: string, clientIp?: string }} options
 */
async function handleSubmitOrderRequest({ body = '', clientIp = 'unknown' }) {
  const rawBody = typeof body === 'string' ? body : ''
  const bodyBytes = Buffer.byteLength(rawBody, 'utf8')

  if (bodyBytes === 0) {
    return jsonResponse(400, { error: 'Порожнє тіло запиту' })
  }

  if (bodyBytes > MAX_BODY_BYTES) {
    return jsonResponse(413, { error: 'Занадто великий запит' })
  }

  if (!checkRateLimit(clientIp)) {
    return jsonResponse(429, {
      error: 'Занадто багато спроб оформлення. Спробуйте через 15 хвилин.',
    })
  }

  let parsed
  try {
    parsed = JSON.parse(rawBody)
  } catch {
    return jsonResponse(400, { error: 'Невірний формат JSON' })
  }

  const validation = validateOrderPayload(parsed)
  if (!validation.success) {
    return jsonResponse(400, {
      error: 'Некоректні дані замовлення',
      details: validation.errors,
    })
  }

  try {
    const { statusCode, body: upstreamBody } = await submitOrder(validation.data)

    if (statusCode >= 200 && statusCode < 300) {
      return {
        statusCode,
        headers: { 'Content-Type': 'application/json' },
        body: upstreamBody,
      }
    }

    console.error('Strapi order error:', statusCode, upstreamBody?.slice?.(0, 500))

    return jsonResponse(statusCode >= 500 ? 502 : 400, {
      error: 'Не вдалося оформити замовлення. Спробуйте ще раз або зателефонуйте нам.',
    })
  } catch (error) {
    console.error('submit-order handler error:', error)
    return jsonResponse(500, {
      error: 'Помилка сервера. Спробуйте пізніше.',
    })
  }
}

module.exports = {
  handleSubmitOrderRequest,
  getClientIpFromNetlifyEvent,
  getClientIpFromRequest,
  MAX_BODY_BYTES,
}
