<template>
  <div class="app-form">
    <div class="app-form__tabs">
      <div
        class="app-form__tab"
        :class="{'--active': activeTab === 'lesson'}"
        @click="activeTab = 'lesson'"
      >Получить пробный урок</div>
      <div
        class="app-form__tab"
        :class="{'--active': activeTab === 'course'}"
        @click="activeTab = 'course'"
      >Приобрести годовой курс</div>
    </div>

    <div class="app-form__content">
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
          <div class="app-form__label">Ник в Telegram</div>
          <input v-model="nick" class="app-form__input" placeholder="@ваш_ник" />
        </div>
      </div>
      <div class="app-form__footer">
        <div class="app-form__agreement">
          <input class="app-form__checkbox" type="checkbox" />
          <div class="app-form__agreement-text">
            <div>Я согласен(а) с</div>
            <span> политикой обработки персональных данных</span>
            и
            <span>публичным договором</span>
          </div>
        </div>
        <AppButton class="app-form__button" :text="buttonText" type="orange" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppButton from '@/components/AppButton.vue'

const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const activeTab = computed({
  get: () => props.modelValue || 'lesson',
  set: (val) => emit('update:modelValue', val)
})

const name = ref('')
const phone = ref('')
const nick = ref('')

const buttonText = computed(() => {
  return activeTab.value === 'lesson' ? 'Получить материалы' : 'Купить курс'
})

const hintText = computed(() => {
  return activeTab.value === 'lesson' ? 'Мы отправим пример урока вам в телеграм' : 'Получите годовой курс для детей от 3-5 лет'
})
</script>

<style lang="scss">
.app-form {
  border-radius: 16px;
  background-color: var(--white);
  box-shadow: 0 4px 3px #0000000a, 0 4px 14px #0000000a;

  &__tabs {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  &__tab {
    display: flex;
    justify-content: center;
    align-self: center;
    padding: 16px 22px;
    width: 100%;
    color: var(--gray);
    background-color: var(--gray-nurse);
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;

    &:first-child {
      border-radius: 16px 0 0 0;
    }

    &:last-child {
      border-radius: 0 16px 0 0;
    }

    &.--active {
      color: var(--killarney);
      background-color: var(--hint-of-green-bright);
      box-shadow: 2px 2px 2px rgba(142, 142, 142, 0.25);
    }

    @media (max-width: 1200px) {
      font-size: 16px;
    }

    @media (max-width: 660px) {
      font-size: 14px;
      padding: 16px 12px;
      text-align: center;
    }
  }

  &__content {
    padding: 20px 40px 34px;

    @media (max-width: 660px) {
      padding: 20px 20px 24px;
    }
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
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 26px;

    @media (max-width: 1200px) {
      flex-direction: column;
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
      color: var(--japanese-laurel);
    }
  }

  .app-button {
    width: 250px;
    height: 52px;
  }
}
</style>
