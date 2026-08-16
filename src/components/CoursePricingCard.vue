<template>
  <div class="course-pricing-card" :class="{ 'course-pricing-card--highlighted': highlighted }">
    <div class="course-pricing-card__wrapper">
      <div>
        <div v-if="badge" class="course-pricing-card__badge">{{ badge }}</div>
        <div class="course-pricing-card__title">{{ title }}</div>
        <div class="course-pricing-card__price-wrapper">
          <span class="course-pricing-card__price">{{ displayedPrice }}</span>
          <span v-if="isPromoApplied" class="course-pricing-card__old-price">{{ price }}</span>
          <span class="course-pricing-card__period">{{ period }}</span>
        </div>
        <ul class="course-pricing-card__features">
          <li v-for="feature in features" :key="feature" class="course-pricing-card__feature">
            <img src="/icons/check-mark.svg" alt="Check icon" />
            {{ feature }}
          </li>
        </ul>
      </div>
      <div class="course-pricing-card__purchase">
        <button
          type="button"
          class="course-pricing-card__promo-toggle"
          @click="isPromoCodeVisible = !isPromoCodeVisible"
        >
          {{ isPromoCodeVisible ? 'Скрыть промокод' : 'Есть промокод?' }}
        </button>

        <div v-if="isPromoCodeVisible" class="course-pricing-card__promo">
          <label class="course-pricing-card__promo-label">
            <span class="course-pricing-card__promo-label-text">Промокод</span>

            <span class="course-pricing-card__promo-field">
              <input
                v-model="promoCode"
                type="text"
                class="course-pricing-card__promo-input"
                placeholder="Введите промокод"
                autocomplete="off"
                @input="resetPromoCode"
              />
              <button
                type="button"
                class="course-pricing-card__promo-apply"
                :class="{ '--cancel': isPromoApplied }"
                @click="handlePromoCodeButtonClick"
              >
                {{ promoCodeButtonText }}
              </button>
            </span>
          </label>

          <div
            v-if="promoMessage"
            class="course-pricing-card__promo-message"
            :class="{
              '--success': promoStatus === 'success',
              '--error': promoStatus === 'error',
            }"
          >
            {{ promoMessage }}
          </div>
        </div>

        <AppButton class="course-pricing-card__button" :text="buttonText" :type="buttonType" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import AppButton from '@/components/AppButton.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  badge: {
    type: String,
    default: '',
  },
  price: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  priceValue: {
    type: Number,
    default: 0,
  },
  features: {
    type: Array,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  buttonType: {
    type: String,
    default: 'orange',
  },
  highlighted: {
    type: Boolean,
    default: false,
  },
})

const promoCodes = [
  {
    code: 'TEST10',
    discountPercent: 10,
  },
]

const promoCode = ref('')
const appliedPromoCode = ref(null)
const isPromoCodeVisible = ref(false)
const promoStatus = ref('idle')

const normalizedPromoCode = computed(() => promoCode.value.trim().toUpperCase())
const isPromoApplied = computed(() => Boolean(appliedPromoCode.value))
const promoCodeButtonText = computed(() => (isPromoApplied.value ? 'Отменить' : 'Применить'))

const formatPrice = (value) => `${new Intl.NumberFormat('ru-RU').format(value)} руб.`

const discountAmount = computed(() => {
  if (!appliedPromoCode.value) {
    return 0
  }

  return Math.round((props.priceValue * appliedPromoCode.value.discountPercent) / 100)
})

const finalPrice = computed(() => Math.max(props.priceValue - discountAmount.value, 0))

const displayedPrice = computed(() => {
  if (!isPromoApplied.value) {
    return props.price
  }

  return formatPrice(finalPrice.value)
})

const promoMessage = computed(() => {
  if (promoStatus.value === 'success' && appliedPromoCode.value) {
    return `Промокод ${appliedPromoCode.value.code} применён. Скидка ${appliedPromoCode.value.discountPercent}%.`
  }

  if (promoStatus.value === 'error') {
    return 'Промокод не найден.'
  }

  return ''
})

const findPromoCode = () =>
  promoCodes.find((promoCodeItem) => promoCodeItem.code === normalizedPromoCode.value)

const resetPromoCode = () => {
  appliedPromoCode.value = null
  promoStatus.value = 'idle'
}

const cancelPromoCode = () => {
  promoCode.value = ''
  resetPromoCode()
}

const applyPromoCode = () => {
  if (!normalizedPromoCode.value) {
    resetPromoCode()
    return
  }

  const foundPromoCode = findPromoCode()

  if (!foundPromoCode) {
    appliedPromoCode.value = null
    promoStatus.value = 'error'
    return
  }

  appliedPromoCode.value = foundPromoCode
  promoStatus.value = 'success'
}

const handlePromoCodeButtonClick = () => {
  if (isPromoApplied.value) {
    cancelPromoCode()
    return
  }

  applyPromoCode()
}
</script>

<style lang="scss" scoped>
.course-pricing-card {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 380px;
  min-height: 338px;
  padding: 30px 28px;
  background-color: var(--white);
  border: 1px solid var(--satin-linen);
  border-radius: 16px;

  &--highlighted {
    border-color: var(--ecstasy);
  }

  &__wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__badge {
    position: absolute;
    top: -14px;
    left: 70px;
    padding: 6px 18px;
    color: var(--white);
    background-color: var(--ecstasy);
    border-radius: 12px;
    transform: translateX(-50%);
    font-size: 13px;
    font-weight: 800;
    white-space: nowrap;
  }

  &__title {
    color: var(--tundora);
    font-size: 16px;
    font-weight: 700;
  }

  &__price-wrapper {
    margin-top: 14px;
  }

  &__price {
    color: var(--killarney);
    font-size: 24px;
    font-weight: 800;
    text-align: center;
  }

  &__old-price {
    margin-left: 8px;
    color: var(--dove-gray);
    font-size: 15px;
    font-weight: 700;
    text-decoration: line-through;
  }

  &__period {
    margin-left: 4px;
    color: var(--dove-gray);
  }

  &__features {
    margin: 24px 0 0;
    padding: 0;
    list-style: none;
  }

  &__feature {
    position: relative;
    font-size: 16px;
    line-height: 22px;
    color: var(--dove-gray);

    img {
      margin-right: 6px;
    }

    & + & {
      margin-top: 6px;
    }
  }

  &__purchase {
    margin-top: auto;
  }

  &__button {
    width: 100%;
    margin: 20px auto 0;
  }

  &__promo-toggle {
    display: block;
    margin: 20px auto 0;
    padding: 0;
    border: none;
    background-color: transparent;
    color: var(--dove-gray);
    cursor: pointer;
    font-family: 'Mulish', sans-serif;
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: all 0.3s;

    &:hover {
      color: var(--la-palma);
    }
  }

  &__promo {
    margin-top: 12px;
    padding: 14px;
    background-color: var(--hint-of-green);
    border: 1px solid var(--satin-linen);
    border-radius: 12px;
  }

  &__promo-label {
    display: block;
  }

  &__promo-label-text {
    color: var(--tundora);
    font-size: 13px;
    font-weight: 700;
  }

  &__promo-field {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }

  &__promo-input {
    box-sizing: border-box;
    min-width: 0;
    flex: 1;
    height: 38px;
    padding: 8px 10px;
    border: 1px solid var(--satin-linen);
    border-radius: 10px;
    color: var(--dark-gray);
    font-family: 'Mulish', sans-serif;
    font-size: 14px;
    outline: none;

    &:focus {
      border-color: var(--killarney);
    }
  }

  &__promo-apply {
    height: 38px;
    padding: 8px 12px;
    border: none;
    border-radius: 10px;
    background-color: var(--killarney);
    color: var(--white);
    cursor: pointer;
    font-family: 'Mulish', sans-serif;
    font-size: 13px;
    font-weight: 700;

    &.--cancel {
      border: 1px solid var(--ecstasy);
      background-color: transparent;
      color: var(--ecstasy);
    }
  }

  &__promo-message {
    margin-top: 8px;
    font-size: 13px;
    line-height: 18px;

    &.--success {
      color: var(--killarney);
    }

    &.--error {
      color: var(--ecstasy);
    }
  }

  @media (max-width: 660px) {
    width: 100%;
    min-height: auto;
    padding: 28px 22px;

    &__description {
      min-height: auto;
    }

    &__promo-field {
      flex-direction: column;
    }

    &__promo-apply {
      width: 100%;
    }
  }
}
</style>
