<template>
  <div>
    <AppHeader />
    <main class="main">
      <section class="main__promo">
        <img src="/images/main.png" alt="group-photo" class="main__promo-img" />
        <div class="container">
          <h1 class="main__promo-title">
            <span>Готовые уроки и материалы</span>
            <br />
            <span>по системе смарт-клуба «Be Clever»</span>
          </h1>

          <div class="main__promo-description">
            Преподавать легко с проверенной методикой и занятиями, адаптированными для самых
            маленьких исследователей
          </div>

          <div class="main__promo-digits">
            <div v-for="digit in digits" :key="digit.value" class="main__promo-digit">
              <div class="digit-value">{{ digit.value }}</div>
              <div class="digit-title">{{ digit.title }}</div>
            </div>
          </div>

          <div class="main__promo-buttons">
            <a href="#app-form" @click="activeFormType = 'lesson'">
              <AppButton text="Получить пробный урок" />
            </a>
            <a href="#app-form" @click="activeFormType = 'course'">
              <AppButton text="Приобрести годовой курс для детей 3-5 лет" type="orange" />
            </a>
          </div>
        </div>
      </section>

      <section class="main__teacher-bg">
        <MainTeacher />
      </section>

      <section class="main__products">
        <h2 class="main-title">Готовые решения для педагогов</h2>
        <div class="products__list">
          <ProductCard v-for="(product, index) in productCards" :key="index" :product="product" />
        </div>
      </section>

      <section class="main__advantages">
        <div class="container">
          <h2 class="main-title">Основные преимущества</h2>

          <div class="advantages__list">
            <AdvantageItem
              v-for="advantage in advantagesList"
              :key="advantage.id"
              :advantage="advantage"
            />
          </div>
        </div>
      </section>

      <section class="main__questions">
        <div class="container container-center">
          <h2 class="main-title">Часто задаваемые вопросы</h2>

          <div class="questions__list">
            <QuestionItem
              v-for="question in questionsList"
              :key="question.id"
              :question="question"
            />
          </div>
        </div>
      </section>

      <section class="main__form" id="app-form">
        <div class="container">
          <AppForm v-model="activeFormType" />
        </div>
      </section>

      <section class="main__contacts">
        <AppContacts class="container" />
      </section>

      <AppFooter class="main__footer" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppButton from '../components/AppButton.vue'
import ProductCard from '@/components/ProductCard.vue'
import MainTeacher from '@/components/MainTeacher.vue'
import AdvantageItem from '@/components/AdvantageItem.vue'
import QuestionItem from '@/components/QuestionItem.vue'
import AppForm from '@/components/AppForm.vue'
import AppContacts from '@/components/AppContacts.vue'
import AppFooter from '@/components/AppFooter.vue'

const digits = [
  { title: 'Учеников', value: '500+' },
  { title: 'Лет смарт-клубу', value: '5+' },
  { title: 'Довольных родителей', value: '99%' },
]

const productCards = ref([
  {
    title: 'Авторские курсы для детей 3-5 лет',
    icon: 'product_learn',
    description: 'Выстройте свою эффективную работу с готовым годовым курсом Be Clever',
    image: 'product_1.png',
    link: '',
  },
  {
    title: 'Авторские учебные материалы',
    icon: 'product_book',
    description: 'Ресурсы, которые сделают изучение английского языка увлекательным и эффективным',
    image: 'product_2.png',
    link: '',
  },
  {
    title: 'Личная консультация',
    icon: 'product_video',
    description:
      'Индивидуальная поддержка и разбор ваших вопросов по обучению детей английскому языку с учётом их возраста и особенностей.',
    image: 'product_3.png',
    link: '',
  },
  {
    title: 'Пакет образовательных документов для детского центра РБ',
    icon: 'product_folders',
    description:
      'Получите пакет всех необходимых образовательных документов для вашего детского центра РБ',
    image: 'product_4.png',
    link: '',
  },
])

const advantagesList = ref([
  {
    id: '1',
    title: 'Преподавать английский детям - легко',
    paragraphs: ['Готовые уроки', 'Экономия времени', 'Быстрый результат'],
    bullets: true,
  },
  {
    id: '2',
    title: 'Проверенная методика',
    paragraphs: [
      'Проверенная успешная методика, \n' + 'которая экономит ваше время, силы и нервы.',
      'Все уже продумано и структурировано. Вам останется только учить.',
    ],
  },
  {
    id: '3',
    title: 'Полный комплект материалов',
    text: 'Полный комплект: конспекты, игры, аудио и видео — просто откройте и начните урок.',
  },
  {
    id: '4',
    title: 'Для всех уровней',
    text: 'Для репетиторов и педагогов, даже если у вас нет опыта работы с малышами.',
  },
])

const questionsList = ref([
  {
    id: '1',
    question: 'Как быстро я получу материалы?',
    answer: 'Мгновенно! Ссылка на скачивание придет сразу после оплаты.',
  },
  {
    id: '2',
    question: 'Какая длительность курса?',
    answer:
      'Курс рассчитан на весь учебный год - 9 месяцев и состоит из 72 уроков (в каждом подробный план-конспект, аудио, видео, необходимые печатные материалы).',
  },
  {
    id: '3',
    question: 'Подойдет ли курс для начинающих педагогов?',
    answer: 'Да. Все уроки простые и понятные, содержат все необходимые материалы для занятий.',
  },
])

const activeFormType = ref('lesson')
</script>

<style lang="scss" scoped>
.main {
  &__promo-wrapper {
    padding: 32px 80px 80px 100px;
  }

  &__promo {
    padding-bottom: 60px;
  }

  &__promo-img {
    width: 100%;
  }

  &__promo-title {
    color: var(--killarney);
    font-size: 30px;
    font-weight: 800;

    @media (max-width: 900px) {
      font-size: 26px;
    }

    @media (max-width: 660px) {
      font-size: 20px;
    }
  }

  &__promo-description {
    width: 580px;
    color: var(--dark-gray);
    font-size: 16px;
    line-height: 22px;

    @media (max-width: 900px) {
      max-width: 100%;
    }
  }

  &__promo-digits {
    display: flex;
    gap: 50px;
    align-items: flex-start;
    margin-top: 38px;

    .digit-value {
      color: var(--killarney);
      font-size: 40px;
      font-weight: 800;

      @media (max-width: 1200px) {
        font-size: 36px;
      }

      @media (max-width: 1200px) {
        font-size: 32px;
      }

      @media (max-width: 660px) {
        font-size: 24px;
      }
    }

    .digit-title {
      color: var(--dark-gray);
      font-size: 16px;

      @media (max-width: 400px) {
        font-size: 14px;
      }
    }

    @media (max-width: 660px) {
      gap: 30px;
      font-size: 15px;
    }

    @media (max-width: 400px) {
      gap: 16px;
    }
  }

  &__promo-digit {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    @media (max-width: 660px) {
      width: fit-content;
    }

    @media (max-width: 400px) {
      max-width: 118px;
      min-width: 90px;
    }
  }

  &__promo-buttons {
    margin-top: 50px;
    display: flex;
    gap: 36px;

    a {
      display: flex;
      justify-content: center;
    }

    @media (max-width: 660px) {
      flex-direction: column;
      align-items: center;
      gap: 20px;

      a,
      .app-button {
        width: 100%;
      }
    }
  }

  &__teacher-bg {
    background-color: var(--hint-of-green);
  }

  &__products {
    max-width: 954px;
    margin: 60px auto 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 1200px) {
      margin-top: 40px;
    }
  }

  .products__list {
    margin-top: 32px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 34px;

    @media (max-width: 1200px) {
      justify-content: center;
    }
  }

  &__advantages {
    margin: 126px auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 1200px) {
      margin-top: 80px;
    }
  }

  .advantages__list {
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @media (max-width: 1200px) {
      gap: 40px;
      margin-top: 40px;
    }
  }

  &__questions {
    margin: 60px auto 0 auto;
    padding-bottom: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .questions__list {
    max-width: 1036px;
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 36px;

    @media (max-width: 1200px) {
      flex-direction: column;
      margin-top: 20px;
    }
  }

  &__form {
    background-color: var(--hint-of-green);
    padding: 80px 0;

    @media (max-width: 900px) {
      padding: 40px 0;
    }
  }

  &__contacts {
    margin-top: 80px;
  }

  &__footer {
    margin-top: 40px;

    @media (max-width: 400px) {
      margin-top: 20px;
    }
  }

  @media (max-width: 660px) {
    padding-top: 56px;
  }
}
</style>
