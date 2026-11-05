const API_URL = import.meta.env.VITE_API_URL || 'https://api.irinakovalenko.by'

const DEFAULT_TIMEOUT_MS = 15000

const request = async (path, { method = 'GET', body, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) => {
  let response

  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(timeoutMs),
    })
  } catch (error) {
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      throw new Error('Сервер не ответил за отведённое время. Попробуйте ещё раз.')
    }

    throw error
  }

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
 * Заявка на бесплатный урок: создаёт бесплатный заказ (без счёта EPOS).
 * Контакт (ник в Telegram) сохраняется в мета заказа.
 */
export const createLead = ({ productId, name, phone, contact }) =>
  request('/wp-json/ik/v1/orders', {
    method: 'POST',
    body: {
      product_id: productId,
      quantity: 1,
      name,
      phone,
      tg_nick: contact || '',
    },
  })

/**
 * Товар из БД WooCommerce: { id, name, price, regular_price, sale_price, currency, in_stock }.
 * Отдаётся только для товаров из whitelist на бэкенде.
 */
export const getProduct = (productId) => request(`/wp-json/ik/v1/products/${productId}`)
