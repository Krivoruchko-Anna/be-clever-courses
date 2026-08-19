<template>
  <div class="app-form" :class="{ '--purchase': isPurchase }">
    <div v-if="!hideTabs" class="app-form__tabs">
      <div
        class="app-form__tab"
        :class="{ '--active': activeTab === 'lesson' }"
        @click="activeTab = 'lesson'"
      >
        Получить пробный урок
      </div>
      <div
        class="app-form__tab"
        :class="{ '--active': activeTab === 'course' }"
        @click="activeTab = 'course'"
      >
        Приобрести годовой курс
      </div>
    </div>

    <div class="app-form__content">
      <div v-if="displayedPurchaseProduct" class="app-form__product">
        <div class="app-form__product-label">{{ purchaseProductLabel }}</div>
        <div class="app-form__product-title">{{ displayedPurchaseProduct.title }}</div>
        <div class="app-form__product-price">
          <span>{{ displayedProductPrice }}</span>
          <span v-if="isProductPromoApplied" class="app-form__product-old-price">
            {{ displayedPurchaseProduct.price }}
          </span>
        </div>

        <div v-if="isProductPromoApplied" class="app-form__product-promo">
          Промокод {{ appliedPromoCode.code }} применён. Скидка
          {{ appliedPromoCode.discountPercent }}%.
        </div>
      </div>

      <div class="app-form__hint">{{ hintText }}</div>

      <div class="app-form__inputs">
        <div class="app-form__field">
          <div class="app-form__label">Имя *</div>
          <input v-model="name" class="app-form__input" placeholder="Введите ваше имя" />
        </div>

        <div class="app-form__field">
          <div class="app-form__label">Номер телефона *</div>
          <input v-model="phone" class="app-form__input" placeholder="+375 XX XXX-XX-XX" />
        </div>

        <div class="app-form__field">
          <div class="app-form__label">{{ contactLabel }}</div>
          <input v-model="contact" class="app-form__input" :placeholder="contactPlaceholder" />
        </div>

        <div v-if="isPurchase" class="app-form__field">
          <div class="app-form__label">Промокод</div>
          <input v-model="promoCode" class="app-form__input" placeholder="Введите промокод" />
        </div>
      </div>

      <div class="app-form__footer">
        <label class="app-form__agreement">
          <input v-model="isAgreed" class="app-form__checkbox" type="checkbox" />
          <div class="app-form__agreement-text">
            <div>Я согласен(а) с</div>
            <span> политикой обработки персональных данных</span>
            и
            <RouterLink to="/public-offer" class="app-form__link">публичным договором</RouterLink>
          </div>
        </label>

        <AppButton
          class="app-form__button"
          :text="buttonText"
          type="orange"
          @click="handleSubmit"
        />
      </div>

      <div v-if="submitMessage" class="app-form__message">
        {{ submitMessage }}
      </div>

      <div v-if="showPaymentBlock" class="app-form__payment">
        <div class="app-form__payment-title">Оплата через EPOS</div>

        <template v-if="displayedPurchaseProduct?.eposInstruction">
          <div class="app-form__payment-text">{{ displayedPurchaseProduct.eposInstruction }}</div>
        </template>

        <template v-else>
          <div class="app-form__payment-text">
            Здесь будет отображаться ссылка, QR-код или инструкция для оплаты после получения данных
            EPOS от заказчика.
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import AppButton from '@/components/AppButton.vue'
import { findPromoCode, formatPrice, getFinalPriceValue } from '@/constants/promoCodes'

const props = defineProps({
  modelValue: {
    type: String,
    default: 'lesson',
  },
  product: {
    type: Object,
    default: null,
  },
  initialPromo: {
    type: String,
    default: '',
  },
  hideTabs: {
    type: Boolean,
    default: false,
  },
  courseProduct: {
    type: Object,
    default: () => ({
      id: 'full-course',
      title: 'Вся программа',
      price: '1000 руб.',
      priceValue: 1000,
      period: '/ 9 месяцев',
      eposInstruction: '',
    }),
  },
})

const emit = defineEmits(['update:modelValue', 'submit'])

const activeTab = computed({
  get: () => props.modelValue || 'lesson',
  set: (val) => emit('update:modelValue', val),
})

const name = ref('')
const phone = ref('')
const contact = ref('')
const promoCode = ref(props.initialPromo)
const isAgreed = ref(false)
const isSubmitted = ref(false)
const submitMessage = ref('')

watch(
  () => props.initialPromo,
  (value) => {
    promoCode.value = value || ''
  },
)

const isPurchase = computed(() => Boolean(props.product) || activeTab.value === 'course')

const displayedPurchaseProduct = computed(() => {
  if (props.product) {
    return props.product
  }

  if (activeTab.value === 'course') {
    return props.courseProduct
  }

  return null
})

const purchaseProductLabel = computed(() => {
  return props.product ? 'Выбранный продукт' : 'Стоимость курса'
})

const buttonText = computed(() => {
  if (props.product) return 'Оформить заявку'
  return activeTab.value === 'lesson' ? 'Получить материалы' : 'Купить курс'
})

const hintText = computed(() => {
  if (props.product) {
    return 'Заполните данные — после отправки заявки появится инструкция по оплате.'
  }

  return activeTab.value === 'lesson'
    ? 'Мы отправим пример урока вам в телеграм'
    : 'Получите годовой курс для детей от 3-5 лет'
})

const contactLabel = computed(() => {
  return isPurchase.value ? 'Почта *' : 'Ник в Telegram'
})

const contactPlaceholder = computed(() => {
  return isPurchase.value ? 'example@email.com' : '@ваш_ник'
})

const showPaymentBlock = computed(() => {
  return isSubmitted.value && isPurchase.value
})

const appliedPromoCode = computed(() => {
  if (!displayedPurchaseProduct.value || !promoCode.value.trim()) {
    return null
  }

  return findPromoCode(promoCode.value)
})

const isProductPromoApplied = computed(() => Boolean(appliedPromoCode.value))

const finalProductPriceValue = computed(() => {
  if (!displayedPurchaseProduct.value?.priceValue) {
    return 0
  }

  return getFinalPriceValue(displayedPurchaseProduct.value.priceValue, appliedPromoCode.value)
})

const displayedProductPrice = computed(() => {
  if (!displayedPurchaseProduct.value) {
    return ''
  }

  if (!isProductPromoApplied.value) {
    return displayedPurchaseProduct.value.price
  }

  return formatPrice(finalProductPriceValue.value)
})

const handleSubmit = () => {
  if (!name.value || !phone.value || (isPurchase.value && !contact.value)) {
    submitMessage.value = 'Пожалуйста, заполните обязательные поля.'
    return
  }

  if (!isAgreed.value) {
    submitMessage.value = 'Пожалуйста, подтвердите согласие с условиями.'
    return
  }

  const preparedProduct = displayedPurchaseProduct.value
    ? {
        ...displayedPurchaseProduct.value,
        originalPrice: displayedPurchaseProduct.value.price,
        price: displayedProductPrice.value,
        finalPriceValue: finalProductPriceValue.value,
        appliedPromoCode: appliedPromoCode.value,
      }
    : null

  const payload = {
    type: props.product ? 'purchase' : activeTab.value,
    product: preparedProduct,
    name: name.value,
    phone: phone.value,
    contact: contact.value,
    promoCode: promoCode.value,
  }

  emit('submit', payload)

  isSubmitted.value = true
  submitMessage.value = isPurchase.value
    ? 'Заявка сформирована. Ниже показан блок оплаты.'
    : 'Спасибо! Мы свяжемся с вами.'
}
</script>

<style lang="scss">
.app-form {
  border-radius: 16px;
  background-color: var(--white);
  box-shadow:
    0 4px 3px #0000000a,
    0 4px 14px #0000000a;

  &__tabs {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  &__tab {
    display: flex;
    justify-content: center;
    align-self: center;
    padding: 18px 22px;
    width: 100%;
    color: var(--gray);
    background-color: var(--gray-nurse);
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;

    &:first-child {
      border-radius: 16px 0 0 0;
    }

    &:last-child {
      border-radius: 0 16px 0 0;
    }

    &.--active {
      color: var(--hippi-green);
      background-color: var(--hint-of-green-bright);
      box-shadow: 0 2px 2px rgba(130, 155, 120, 0.25);
    }

    @media (max-width: 1200px) {
      font-size: 16px;
    }

    @media (max-width: 660px) {
      font-size: 15px;
      padding: 16px 12px;
      text-align: center;
    }
  }

  &__content {
    padding: 40px 34px;

    @media (max-width: 660px) {
      padding: 20px 20px 24px;
    }
  }

  &__product {
    margin-bottom: 18px;
    padding: 16px;
    border-radius: 14px;
    border: 2px solid var(--spring-rain);
    text-align: center;
  }

  &__product-label {
    color: var(--dove-gray);
    font-size: 14px;
  }

  &__product-title {
    margin-top: 6px;
    color: var(--tundora);
    font-size: 20px;
    font-weight: 800;
  }

  &__product-price {
    margin-top: 4px;
    color: var(--hippi-green);
    font-size: 18px;
    font-weight: 800;
  }

  &__product-old-price {
    margin-left: 8px;
    color: var(--dove-gray);
    font-size: 15px;
    text-decoration: line-through;
  }

  &__product-promo {
    margin-top: 6px;
    color: var(--dove-gray);
    font-size: 14px;
    font-weight: 500;
  }

  &__link {
    color: var(--hippi-green);
  }

  &__hint {
    text-align: center;
    color: var(--dove-gray);
    font-size: 16px;

    @media (max-width: 400px) {
      font-size: 14px;
    }
  }

  &__inputs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 26px;

    @media (max-width: 1200px) {
      grid-template-columns: 1fr;
    }
  }

  &.--purchase {
    .app-form__inputs {
      grid-template-columns: repeat(4, 1fr);

      @media (max-width: 1100px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 660px) {
        grid-template-columns: 1fr;
      }
    }
  }

  &__input {
    width: 100%;
  }

  &__field {
    width: 100%;
  }

  &__label {
    font-size: 14px;
    font-weight: 600;
    color: var(--killarney);
  }

  &__input {
    margin-top: 8px;
    height: 50px;
    outline: none;
    border: var(--mercury) 2px solid;
    border-radius: 12px;
    padding: 14px 16px;
    box-sizing: border-box;
    font-size: 14px;
    color: var(--gray);
  }

  &__footer {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 1200px) {
      flex-direction: column;
      gap: 20px;
    }

    @media (max-width: 660px) {
      margin-top: 24px;
    }
  }

  &__agreement {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  &__agreement-text {
    font-size: 14px;

    div {
      display: inline;
    }

    span {
      color: var(--hippi-green);
    }
  }

  &__message {
    margin-top: 18px;
    color: var(--killarney);
    font-size: 14px;
    font-weight: 700;
    text-align: center;
  }

  &__payment {
    margin-top: 18px;
    padding: 18px;
    border: 1px dashed var(--ecstasy);
    border-radius: 14px;
    background-color: var(--ercu-white);
  }

  &__payment-title {
    color: var(--ecstasy);
    font-size: 18px;
    font-weight: 800;
    text-align: center;
  }

  &__payment-text {
    margin-top: 8px;
    color: var(--tundora);
    font-size: 15px;
    line-height: 22px;
    text-align: center;
  }

  .app-button {
    width: 250px;
    height: 52px;
  }
}
</style>
