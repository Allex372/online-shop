const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const UKR_PHONE_E164_RE = /^\+380\d{9}$/

const normalizeUkrPhone = (raw) => {
  const digits = raw.replace(/\D/g, '')

  if (digits.length === 12 && digits.startsWith('380')) {
    return `+${digits}`
  }

  if (digits.length === 10 && digits.startsWith('0')) {
    return `+38${digits}`
  }

  if (digits.length === 9) {
    return `+380${digits}`
  }

  return null
}

const MAX = {
  name: 120,
  email: 254,
  phone: 32,
  address: 500,
  productName: 200,
  products: 50,
  quantity: 9999,
  totalAmount: 10_000_000,
}

const trimStr = (value) => (typeof value === 'string' ? value.trim() : '')

const pushError = (errors, field, message) => {
  errors.push({ field, message })
}

const parsePositiveInt = (value) => {
  const num = Number(value)
  if (!Number.isFinite(num) || !Number.isInteger(num) || num < 1) return null
  return num
}

const parseMoney = (value) => {
  const num = Number(value)
  if (!Number.isFinite(num) || num < 0) return null
  return Math.round(num * 100) / 100
}

const validateProduct = (item, index, errors) => {
  const prefix = `products[${index}]`

  const id = parsePositiveInt(item?.id)
  if (id === null) pushError(errors, `${prefix}.id`, 'Невірний id товару')

  const productName = trimStr(item?.productName)
  if (!productName || productName.length > MAX.productName) {
    pushError(errors, `${prefix}.productName`, 'Невірна назва товару')
  }

  const quantity = parsePositiveInt(item?.quantity)
  if (quantity === null || quantity > MAX.quantity) {
    pushError(errors, `${prefix}.quantity`, 'Невірна кількість')
  }

  const price = parseMoney(item?.price)
  if (price === null || price > MAX.totalAmount) {
    pushError(errors, `${prefix}.price`, 'Невірна ціна')
  }

  const totalAmount = parseMoney(item?.totalAmount)
  if (totalAmount === null || totalAmount > MAX.totalAmount) {
    pushError(errors, `${prefix}.totalAmount`, 'Невірна сума рядка')
  }

  if (
    quantity !== null &&
    price !== null &&
    totalAmount !== null &&
    Math.abs(totalAmount - quantity * price) > 0.02
  ) {
    pushError(errors, `${prefix}.totalAmount`, 'Сума рядка не збігається з ціною × кількість')
  }

  return {
    id,
    productName,
    quantity,
    price,
    totalAmount,
  }
}

/**
 * @param {unknown} payload
 * @returns {{ success: true, data: object } | { success: false, errors: Array<{ field: string, message: string }> }}
 */
function validateOrderPayload(payload) {
  const errors = []

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return {
      success: false,
      errors: [{ field: 'body', message: 'Невірний формат замовлення' }],
    }
  }

  const fullName = trimStr(payload.fullName)
  if (fullName.length < 2 || fullName.length > MAX.name) {
    pushError(errors, 'fullName', 'Вкажіть ПІБ (від 2 символів)')
  }

  const email = trimStr(payload.email)
  if (!email || email.length > MAX.email || !EMAIL_RE.test(email)) {
    pushError(errors, 'email', 'Вкажіть коректний email')
  }

  const phoneRaw = trimStr(payload.phoneNumber)
  const phoneNormalized = phoneRaw ? normalizeUkrPhone(phoneRaw) : null

  if (
    !phoneRaw ||
    phoneRaw.length > MAX.phone ||
    !phoneNormalized ||
    !UKR_PHONE_E164_RE.test(phoneNormalized)
  ) {
    pushError(errors, 'phoneNumber', 'Вкажіть коректний номер телефону (+380…)')
  }

  const address = trimStr(payload.address)
  if (address.length < 5 || address.length > MAX.address) {
    pushError(errors, 'address', 'Вкажіть адресу доставки (від 5 символів)')
  }

  const totalAmount = parseMoney(payload.totalAmount)
  if (totalAmount === null || totalAmount <= 0 || totalAmount > MAX.totalAmount) {
    pushError(errors, 'totalAmount', 'Невірна загальна сума')
  }

  if (!Array.isArray(payload.products) || payload.products.length === 0) {
    pushError(errors, 'products', 'Додайте хоча б один товар')
  } else if (payload.products.length > MAX.products) {
    pushError(errors, 'products', 'Занадто багато позицій у замовленні')
  }

  const products = []
  if (Array.isArray(payload.products)) {
    payload.products.forEach((item, index) => {
      const normalized = validateProduct(item, index, errors)
      if (
        normalized.id &&
        normalized.productName &&
        normalized.quantity &&
        normalized.price !== null &&
        normalized.totalAmount !== null
      ) {
        products.push({
          id: normalized.id,
          productName: normalized.productName,
          quantity: normalized.quantity,
          price: normalized.price,
          totalAmount: normalized.totalAmount,
        })
      }
    })
  }

  if (errors.length > 0) {
    return { success: false, errors }
  }

  const productsSum = products.reduce((acc, row) => acc + row.totalAmount, 0)
  const roundedSum = Math.round(productsSum * 100) / 100

  if (Math.abs(roundedSum - totalAmount) > 0.05) {
    pushError(errors, 'totalAmount', 'Загальна сума не збігається з товарами')
    return { success: false, errors }
  }

  return {
    success: true,
    data: {
      fullName,
      email,
      phoneNumber: phoneNormalized,
      address,
      totalAmount,
      products,
    },
  }
}

module.exports = { validateOrderPayload }
