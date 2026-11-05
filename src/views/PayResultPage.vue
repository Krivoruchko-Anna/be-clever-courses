<template>
  <div>
    <AppHeader />
    <main class="pay-result">
      <div class="pay-result__card">
        <template v-if="!orderId || !orderKey">
          <h1 class="pay-result__title">Ссылка недействительна</h1>
          <p class="pay-result__text">
            Не удалось определить заказ. Напишите нам, пожалуйста, и мы всё проверим.
          </p>
        </template>

        <template v-else>
          <h1 class="pay-result__title">{{ title }}</h1>
          <p class="pay-result__text">{{ text }}</p>
          <p v-if="orderNumber" class="pay-result__order">Заказ №{{ orderNumber }}</p>
        </template>

        <AppButton text="Вернуться на главную" type="green" @click="goHome" />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppButton from '@/components/AppButton.vue'
import { getOrderStatus } from '@/api/client'

const route = useRoute()
const router = useRouter()

const orderId = Number(route.query.order) || null
const orderKey = String(route.query.key || '')
const webpayStatus = String(route.query.wp || '')

const state = ref('checking') // checking | paid | waiting | error
const orderNumber = ref('')

let timer = null
let tries = 0

const title = computed(() => {
  if (state.value === 'paid') return 'Оплата получена!'
  if (state.value === 'waiting') return 'Ожидаем оплату'
  if (state.value === 'error') return 'Не удалось получить статус'

  return 'Проверяем оплату…'
})

const text = computed(() => {
  if (state.value === 'paid') {
    return 'Доступ к курсу будет открыт на указанную при заказе почту.'
  }
  if (webpayStatus === 'failed') {
    return 'Оплата картой не прошла. Попробуйте оформить заказ ещё раз или оплатите счёт по ЕРИП.'
  }
  if (state.value === 'error') {
    return 'Обновите страницу через пару минут или напишите нам.'
  }
  if (state.value === 'waiting') {
    return 'Если вы уже оплатили — статус обновится на этой странице автоматически.'
  }

  return 'Секунду, узнаём статус счёта…'
})

const stop = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const check = async () => {
  tries += 1

  try {
    const data = await getOrderStatus(orderId, orderKey)
    orderNumber.value = data.order_number || orderNumber.value

    if (['processing', 'completed'].includes(data.status)) {
      state.value = 'paid'
      stop()
      return
    }

    state.value = 'waiting'

    // больше 20 минут не опрашиваем (оплата по ЕРИП может прийти и позже)
    if (tries >= 240) {
      stop()
    }
  } catch {
    state.value = 'error'
    stop()
  }
}

const goHome = () => router.push({ name: 'MainPage' })

onMounted(() => {
  if (orderId && orderKey) {
    check()
    timer = setInterval(check, 5000)
  }
})

onBeforeUnmount(stop)
</script>

<style scoped lang="scss">
.pay-result {
  display: flex;
  justify-content: center;
  padding: 120px 20px 80px;
  min-height: 60vh;

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 560px;
    padding: 48px 40px;
    text-align: center;
    background-color: var(--white);
    border: 1px solid var(--satin-linen);
    border-radius: 16px;
    box-shadow:
      0 4px 3px #0000000a,
      0 4px 14px #0000000a;
  }

  &__title {
    margin: 0;
    color: var(--dark-gray);
    font-size: 28px;
    font-weight: 800;
  }

  &__text {
    margin: 16px 0 0;
    color: var(--dove-gray);
    font-size: 16px;
    line-height: 24px;
  }

  &__order {
    margin: 12px 0 0;
    color: var(--killarney);
    font-size: 18px;
    font-weight: 700;
  }

  .app-button {
    margin-top: 32px;
  }
}
</style>
