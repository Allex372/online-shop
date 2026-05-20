require('dotenv').config()

const {
  handleSubmitOrderRequest,
  getClientIpFromNetlifyEvent,
} = require('../../lib/handle-submit-order')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST', 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  const clientIp = getClientIpFromNetlifyEvent(event)
  return handleSubmitOrderRequest({
    body: event.body || '',
    clientIp,
  })
}
