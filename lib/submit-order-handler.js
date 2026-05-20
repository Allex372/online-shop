const STRAPI_ORDERS_API_URL =
  process.env.STRAPI_ORDERS_API_URL ||
  'https://dry-tundra-95600-dbbf09fef1a1.herokuapp.com/api/orders'

async function submitOrder(orderData) {
  const token = process.env.STRAPI_API_TOKEN

  if (!token) {
    throw new Error('STRAPI_API_TOKEN is not configured')
  }

  const response = await fetch(STRAPI_ORDERS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  })

  const body = await response.text()

  return {
    statusCode: response.status,
    body,
  }
}

module.exports = { submitOrder, STRAPI_ORDERS_API_URL }
