const API_URL = import.meta.env.VITE_API_URL || 'https://api.irinakovalenko.by'

const request = async (path, { method = 'GET', body } = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || `Ошибка запроса (${response.status})`)
  }

  return data
}

/**
 * Создаёт заказ и сразу выставляет счёт в EPOS (ЕРИП).
 * Ответ: { order_id, order_key, bill_number, total, currency, erip: { instruction, expires_days }, ... }
 */
export const createEposOrder = (payload) =>
  request('/wp-json/ik/v1/orders', {
    method: 'POST',
    body: {
      product_id: payload.productId,
      quantity: payload.quantity ?? 1,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      promo_code: payload.promoCode || '',
    },
  })

/**
 * Статус заказа: pending — ждёт оплаты, processing/completed — оплачен.
 */
export const getOrderStatus = (orderId, orderKey) =>
  request(`/wp-json/ik/v1/order-status?order=${orderId}&key=${encodeURIComponent(orderKey)}`)

/**
 * Товар из БД WooCommerce: { id, name, price, regular_price, sale_price, currency, in_stock }.
 * Отдаётся только для товаров из whitelist на бэкенде.
 */
export const getProduct = (productId) => request(`/wp-json/ik/v1/products/${productId}`)
