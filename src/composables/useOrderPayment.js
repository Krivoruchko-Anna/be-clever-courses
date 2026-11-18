import { ref } from 'vue'
import { createEposOrder } from '@/api/client'

// Вставляем платёжную форму (HTML с hidden-полями от бэкенда) и отправляем её:
// покупатель уходит на страницу оплаты pay.raschet.by в той же вкладке.
const submitPaymentForm = (html) => {
  const container = document.createElement('div')
  container.style.display = 'none'
  container.innerHTML = html
  document.body.appendChild(container)

  const form = container.querySelector('form')

  if (!form) {
    container.remove()
    throw new Error('Не удалось открыть страницу оплаты. Попробуйте позже.')
  }

  form.submit()
}

/**
 * Оба способа оплаты (ЕРиП и карта) сейчас ведут на страницу pay.raschet.by:
 * idle → creating → redirecting (уход на страницу оплаты)
 *                ↘ error
 * Статус оплаты после возврата покупателя показывает страница /#/pay-result.
 */
export function useOrderPayment() {
  const paymentPhase = ref('idle')
  const paymentError = ref('')
  const paymentBill = ref(null)
  const order = ref(null)

  const startPayment = async ({ productId, name, email, phone, promoCode, quantity = 1 }) => {
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
      const data = await createEposOrder({
        productId,
        name,
        email,
        phone,
        promoCode,
        quantity,
        payBy: 'card', // обе кнопки сейчас ведут на платёжную ссылку pay.raschet.by
      })

      if (!data.order_id || !data.order_key) {
        throw new Error('Некорректный ответ сервера. Попробуйте позже.')
      }

      order.value = { id: data.order_id, key: data.order_key }
      paymentBill.value = {
        billNumber: data.bill_number,
        amount: data.total,
        currency: data.currency,
      }

      if (!data.webpay_form) {
        throw new Error(data.webpay_error || 'Платёжная страница недоступна. Попробуйте позже.')
      }

      paymentPhase.value = 'redirecting'
      submitPaymentForm(data.webpay_form)
    } catch (error) {
      paymentPhase.value = 'error'
      paymentError.value = error.message || 'Не удалось выставить счёт. Попробуйте позже.'
    }
  }

  return { paymentPhase, paymentError, paymentBill, order, startPayment }
}

export const formatAmount = (amount, currency = 'BYN') =>
  `${Number(amount).toLocaleString('ru-RU')} ${currency}`
