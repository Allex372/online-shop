const SUBMIT_ORDER_URL = '/api/submit-order'

export async function submitOrder(orderData) {
  const response = await fetch(SUBMIT_ORDER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })

  const body = await response.text()

  if (!response.ok) {
    let message = `Помилка оформлення (${response.status})`

    try {
      const parsed = JSON.parse(body)
      if (parsed?.error) message = parsed.error
    } catch {
      if (body) message = body
    }

    const error = new Error(message)
    error.status = response.status
    throw error
  }

  return {
    status: response.status,
    data: body,
  }
}
