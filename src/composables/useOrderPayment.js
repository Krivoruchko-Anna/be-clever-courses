import { onBeforeUnmount, ref } from 'vue'
import { createEposOrder, getOrderStatus } from '@/api/client'

const PAID_STATUSES = ['processing', 'completed']

// Опрос статуса: часто в первые минуты, потом реже, через 20 минут — стоп.
// В фоне вкладку не дёргаем совсем (проверка document.hidden).
const POLL_FAST_MS = 10000
const POLL_SLOW_MS = 30000
const POLL_FAST_PERIOD_MS = 2 * 60 * 1000
const POLL_MAX_MS = 20 * 60 * 1000

// Вставляем WebPay-форму (HTML с hidden-полями от бэкенда) и отправляем её:
// покупатель уходит на платёжную страницу шлюза в той же вкладке.
const submitWebpayForm = (html) => {
  const container = document.createElement('div')
  container.style.display = 'none'
  container.innerHTML = html
  document.body.appendChild(container)

  const form = container.querySelector('form')

  if (!form) {
    container.remove()
    throw new Error('Не удалось открыть страницу оплаты. Оплатите счёт по ЕРИП.')
  }

  form.submit()
}

/**
 * Жизненный цикл оплаты:
 * idle → creating → awaiting (ЕРИП) → paid
 *       ↘ redirecting (карта: уход на шлюз)      awaiting → expired (перестали опрашивать)
 *       ↘ error
 */
export function useOrderPayment() {
  const paymentPhase = ref('idle')
  const paymentError = ref('')
  const paymentBill = ref(null)
  const order = ref(null)

  let pollTimer = null
  let pollStartedAt = 0

  const stopPolling = () => {
    if (pollTimer) {
      clearTimeout(pollTimer)
      pollTimer = null
    }
  }

  const schedulePoll = (delayMs) => {
    pollTimer = setTimeout(pollTick, delayMs)
  }

  const pollTick = async () => {
    if (!order.value) return

    // вкладка скрыта — пропускаем проверку, вернёмся через медленный интервал
    if (document.hidden) {
      schedulePoll(POLL_SLOW_MS)
      return
    }

    try {
      const { status } = await getOrderStatus(order.value.id, order.value.key)

      if (PAID_STATUSES.includes(status)) {
        paymentPhase.value = 'paid'
        stopPolling()
        return
      }
    } catch {
      // сеть могла моргнуть — попробуем на следующем тике
    }

    if (Date.now() - pollStartedAt >= POLL_MAX_MS) {
      paymentPhase.value = 'expired'
      stopPolling()
      return
    }

    const fastPeriodOver = Date.now() - pollStartedAt >= POLL_FAST_PERIOD_MS
    schedulePoll(fastPeriodOver ? POLL_SLOW_MS : POLL_FAST_MS)
  }

  const startPolling = () => {
    stopPolling()
    pollStartedAt = Date.now()
    schedulePoll(POLL_FAST_MS)
  }

  const startPayment = async ({
    productId,
    name,
    email,
    phone,
    promoCode,
    quantity = 1,
    payBy = 'erip',
  }) => {
    stopPolling()
    paymentPhase.value = 'creating'
    paymentError.value = ''
    paymentBill.value = null
    order.value = null

    if (!productId) {
      paymentPhase.value = 'error'
      paymentError.value = 'Товар ещё не подключён к оплате. Свяжитесь с нами, пожалуйста.'
      return
    }

    try {
      const data = await createEposOrder({ productId, name, email, phone, promoCode, quantity, payBy })

      if (!data.order_id || !data.order_key) {
        throw new Error('Некорректный ответ сервера. Попробуйте позже.')
      }

      order.value = { id: data.order_id, key: data.order_key }
      paymentBill.value = {
        billNumber: data.bill_number,
        amount: data.total,
        currency: data.currency,
        instruction: data.erip?.instruction || '',
        expiresDays: data.erip?.expires_days || 2,
      }

      // Карта: счёт выставлен, уводим покупателя на шлюз
      if (payBy === 'card' && data.webpay_form) {
        paymentPhase.value = 'redirecting'
        submitWebpayForm(data.webpay_form)
        return
      }

      // Карта недоступна (шлюз не ответил) — показываем ЕРИП как запасной путь
      if (payBy === 'card' && data.webpay_error) {
        paymentBill.value = {
          ...paymentBill.value,
          instruction: `${paymentBill.value.instruction} Оплата картой временно недоступна — оплатите счёт по ЕРИП.`,
        }
      }

      paymentPhase.value = 'awaiting'
      startPolling()
    } catch (error) {
      paymentPhase.value = 'error'
      paymentError.value = error.message || 'Не удалось выставить счёт. Попробуйте позже.'
    }
  }

  onBeforeUnmount(stopPolling)

  return { paymentPhase, paymentError, paymentBill, order, startPayment, stopPolling }
}

export const formatAmount = (amount, currency = 'BYN') =>
  `${Number(amount).toLocaleString('ru-RU')} ${currency}`
