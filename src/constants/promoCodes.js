export const promoCodes = [
  {
    code: 'TEST10',
    discountPercent: 10,
  },
]

export const normalizePromoCode = (code) => code.trim().toUpperCase()

export const findPromoCode = (code) => {
  const normalizedCode = normalizePromoCode(code)

  return promoCodes.find((promoCode) => promoCode.code === normalizedCode) || null
}

export const formatPrice = (value) => `${new Intl.NumberFormat('ru-RU').format(value)} руб.`

export const getDiscountAmount = (priceValue, promoCode) => {
  if (!promoCode) {
    return 0
  }

  return Math.round((priceValue * promoCode.discountPercent) / 100)
}

export const getFinalPriceValue = (priceValue, promoCode) => {
  return Math.max(priceValue - getDiscountAmount(priceValue, promoCode), 0)
}
