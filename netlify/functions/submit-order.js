require('dotenv').config()

const { submitOrder } = require('../../lib/submit-order-handler')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const orderData = JSON.parse(event.body || '{}')
    const { statusCode, body } = await submitOrder(orderData)

    return {
      statusCode,
      headers: { 'Content-Type': 'application/json' },
      body,
    }
  } catch (error) {
    console.error('submit-order function error:', error)

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Failed to submit order',
      }),
    }
  }
}
