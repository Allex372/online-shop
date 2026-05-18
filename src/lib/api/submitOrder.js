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
    throw new Error(body || `Order request failed (${response.status})`)
  }

  return {
    status: response.status,
    data: body,
  }
}
