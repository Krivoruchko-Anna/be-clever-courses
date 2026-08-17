<template>
  <div>
    <AppHeader />
    <main class="courses">
      <section class="courses__hero">
        <div class="container">
          <div class="courses__hero-wrapper">
            <div class="courses__hero-content">
              <div class="courses__hero-tag">Для педагогов и репетиторов</div>
              <h1 class="courses__hero-title">
                Годовой курс «Английский с нуля
                <span>для детей 3–5 лет»</span>
              </h1>

              <p class="courses__hero-description">
                Готовая программа на 9 месяцев в помощь педагогам.
              </p>
              <p class="courses__hero-description">
                <span>65 основных уроков и 7 тематических занятий:</span>
                <span
                  >4 занятия по Рождеству и по одному занятию на Хэллоуин, День Св. Валентина и
                  Пасху.</span
                >
              </p>

              <div class="courses__hero-stats">
                <div v-for="stat in courseStats" :key="stat.value" class="courses__hero-stat">
                  <div class="courses__hero-stat-value">{{ stat.value }}</div>
                  <div class="courses__hero-stat-title">{{ stat.title }}</div>
                </div>
              </div>

              <a href="#pricing" class="courses__hero-button">
                <AppButton
                  text="Попробовать урок бесплатно"
                  type="orange"
                  height="56px"
                  @click="handleFreeLessonClick"
                />
              </a>
            </div>

            <div class="courses__hero-image-wrapper">
              <img
                src="/images/courses/courses-hero.webp"
                alt="Занятие с детьми"
                class="courses__hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="courses__included">
        <div class="container container-center">
          <h2 class="main-title">Что входит в курс?</h2>
          <div class="courses__section-description">
            Всё необходимое для занятий уже готово — остаётся открыть урок и провести его
          </div>

          <div class="courses__included-list">
            <CourseInfoCard
              v-for="item in includedItems"
              :key="item.title"
              :icon="item.icon"
              :title="item.title"
              :text="item.text"
              color="var(--ercu-white)"
            />
          </div>
        </div>
      </section>

      <section class="courses__topics-section">
        <div class="container container-center">
          <h2 class="main-title">Курс охватывает 15 лексических тем</h2>
          <div class="courses__section-description">
            Ребёнок знакомится с языком через понятные ситуации, игры и повторение.
          </div>

          <div class="courses__topics">
            <span v-for="topic in topics" :key="topic.title" class="courses__topic">
              <img :src="topic.icon" :alt="topic.title" class="courses__topic-icon" />
              {{ topic.title }}
            </span>
          </div>
        </div>
      </section>

      <section class="courses__quote">
        <div class="container">
          <div class="courses__quote-content">
            <img src="/icons/quote.svg" alt="Quote" class="courses__quote-mark" />
            <p class="courses__quote-text">
              Это не просто курс по заучиванию слов! Это полноценная программа по всестороннему
              развитию ребёнка на английском языке. Методически грамотно выстроенная программа от
              простого к сложному со встроенным регулярным повторением пройденного материала и
              полным погружением в языковую среду позволяет заложить крепкий фундамент в изучении
              английского языка у дошкольников.
            </p>
            <p class="courses__quote-author">
              Ирина Коваленко, основатель и руководитель смарт-клуба Be Clever
            </p>
          </div>
        </div>
      </section>

      <section class="courses__support">
        <div class="container container-center">
          <h2 class="main-title">Задания встроены в программу гармонично</h2>
          <div class="courses__section-description">
            Помимо языковых компетенций, занятия развивают ещё пять важных сфер
          </div>

          <div class="courses__support-list">
            <div v-for="item in supportItems" :key="item.title" class="courses__support-item">
              <div class="courses__support-icon-wrapper">
                <img :src="item.icon" :alt="item.title" class="courses__support-icon" />
              </div>
              <div class="courses__support-title">{{ item.title }}</div>
              <div class="courses__support-text">{{ item.text }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="courses__method">
        <div class="container container-center">
          <h2 class="courses__method-title">Мультисенсорный подход</h2>
          <p class="courses__method-text">
            Задания задействуют разные каналы восприятия, что помогает мозгу лучше усваивать и
            запоминать материал. Все задания подобраны с учётом психолого-возрастных особенностей
            учащихся.
          </p>
        </div>
      </section>

      <section class="courses__audience">
        <div class="container container-center">
          <h2 class="main-title">Для кого этот курс?</h2>
          <div class="courses__section-description">
            Преподавайте уверенно, не тратя часы на подготовку
          </div>

          <div class="courses__audience-list">
            <CourseInfoCard
              v-for="item in audienceItems"
              :key="item.title"
              :icon="item.icon"
              :title="item.title"
              :text="item.text"
            />
          </div>

          <a href="#pricing" class="courses__audience-button">
            <AppButton text="Попробовать урок бесплатно" type="orange" />
          </a>
        </div>
      </section>

      <section class="courses__pricing" id="pricing">
        <div class="container container-center">
          <h2 class="main-title">Как приобрести курс?</h2>
          <div class="courses__section-description">
            Выберите удобный формат — помесячно или всю программу сразу
          </div>

          <div class="courses__pricing-list">
            <CoursePricingCard
              v-for="card in pricingCards"
              :key="card.title"
              :title="card.title"
              :badge="card.badge"
              :price="card.price"
              :price-value="card.priceValue"
              :period="card.period"
              :features="card.features"
              :button-text="card.buttonText"
              :button-type="card.buttonType"
              :highlighted="card.highlighted"
            />
          </div>
        </div>
      </section>

      <section class="courses__questions-cta">
        <div class="container container-center">
          <h2 class="main-title">Есть вопросы?</h2>
          <div class="courses__section-description">Напишите нам, если остались вопросы</div>
          <AppButton
            class="courses__question-button"
            text="Написать в телеграм"
            type="green"
            link="https://t.me/Irina_kovalenko_beclever"
            icon="telegram.svg"
          />
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppButton from '@/components/AppButton.vue'
import CourseInfoCard from '@/components/CourseInfoCard.vue'
import CoursePricingCard from '@/components/CoursePricingCard.vue'

const courseStats = [
  { value: '72', title: 'готовых урока' },
  { value: '15', title: 'лексических тем' },
  { value: '9', title: 'месяцев обучения' },
]

const includedItems = [
  {
    icon: '/icons/courses/writing-board.svg',
    title: 'Подробные конспекты',
    text: 'Планы всех уроков со словами учителя и комментариями к играм и заданиям.',
  },
  {
    icon: '/icons/courses/books-and-people.svg',
    title: 'Печатные материалы',
    text: 'Авторские карточки, игры, рабочие листы и заготовки для поделок к каждому уроку.',
  },
  {
    icon: '/icons/courses/youtuber-female.svg',
    title: 'Аудио и видео',
    text: 'Авторские видео-презентации, песни, мультфильмы, начитки книг и видео к творческим заданиям.',
  },
  {
    icon: '/icons/courses/online-shopping.svg',
    title: 'Ссылки на материалы',
    text: 'Подборка ссылок на маркетплейсы и интернет-магазины для игр и материалов к занятиям.',
  },
]

const topics = [
  {
    title: 'Домашние животные',
    icon: '/icons/topics/animals.svg',
  },
  {
    title: 'Дикие животные',
    icon: '/icons/topics/wild-animals.svg',
  },
  {
    title: 'Цвета',
    icon: '/icons/topics/colors.svg',
  },
  {
    title: 'Счёт',
    icon: '/icons/topics/digits.svg',
  },
  {
    title: 'Геометрические фигуры',
    icon: '/icons/topics/figures.svg',
  },
  {
    title: 'Фрукты и овощи',
    icon: '/icons/topics/fruits.svg',
  },
  {
    title: 'Еда',
    icon: '/icons/topics/food.svg',
  },
  {
    title: 'Игрушки',
    icon: '/icons/topics/toys.svg',
  },
  {
    title: 'Части тела',
    icon: '/icons/topics/body-parts.svg',
  },
  {
    title: 'Погода',
    icon: '/icons/topics/weather.svg',
  },
  {
    title: 'Одежда',
    icon: '/icons/topics/cloths.svg',
  },
  {
    title: 'Транспорт',
    icon: '/icons/topics/transport.svg',
  },
  {
    title: 'Мебель',
    icon: '/icons/topics/furniture.svg',
  },
  {
    title: 'Эмоции',
    icon: '/icons/topics/emotions.svg',
  },
  {
    title: 'Глаголы движения',
    icon: '/icons/topics/verbs.svg',
  },
]

const supportItems = [
  {
    icon: '/icons/courses/gymnast.svg',
    title: 'Физическое развитие',
    text: 'Крупная и мелкая моторика',
  },
  {
    icon: '/icons/courses/conversation.svg',
    title: 'Социально-эмоциональное',
    text: 'Эмоциональный интеллект, бытовые навыки',
  },
  {
    icon: '/icons/courses/autumn-tree.svg',
    title: 'Художественно-эстетическое',
    text: 'Творчество, литература, музыка',
  },
  {
    icon: '/icons/courses/thinking.svg',
    title: 'Логика и мышление',
    text: 'Первичная математика, критическое мышление',
  },
  {
    icon: '/icons/courses/reading-a-book.svg',
    title: 'Познавательное',
    text: 'Окружающий мир, традиции и праздники',
  },
]

const audienceItems = [
  {
    icon: '/icons/courses/teacher-female.svg',
    title: 'Начинающие педагоги',
    text: 'Никогда не работали с дошкольниками и не знают, с чего начать — курс даёт готовую систему с первого урока.',
  },
  {
    icon: '/icons/courses/woman-uses-computer.svg',
    title: 'Опытные преподаватели',
    text: 'Устали часами готовиться к каждому уроку и хотят внедрить системный подход, чтобы получать качественный результат.',
  },
]

const pricingCards = [
  {
    title: 'Помесячно',
    badge: '',
    price: '100 руб.',
    priceValue: 100,
    period: '/ месяц',
    features: [
      'Доступ к урокам текущего месяца',
      'Все материалы месяца',
      'Можно продлевать по ходу года',
    ],
    buttonText: 'Купить 1 месяц',
    buttonType: 'green-outline',
    highlighted: false,
  },
  {
    title: 'Вся программа',
    badge: 'Выгоднее',
    price: '1000 руб.',
    priceValue: 1000,
    period: '/ 9 месяцев',
    features: ['72 готовых урока', 'Полный комплект материалов сразу'],
    buttonText: 'Купить целиком',
    buttonType: 'orange',
    highlighted: true,
  },
]

const handleFreeLessonClick = () => {
  console.log('handleFreeLessonClick') // TODO
}
</script>

<style scoped lang="scss">
.courses {
  padding-top: 64px;
  color: var(--dark-gray);

  &__hero {
    padding: 54px 0 70px;
    background-color: var(--hint-of-green);
  }

  &__hero-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 60px;
  }

  &__hero-content {
    max-width: 560px;
  }

  &__hero-tag {
    border: 1px solid var(--satin-linen);
    border-radius: 50px;
    width: fit-content;
    padding: 4px 10px;
    color: var(--killarney);
    background-color: var(--white);
    font-size: 13px;
  }

  &__hero-title {
    margin-top: 16px;
    color: var(--dark-gray);
    font-size: 30px;
    font-weight: 800;

    span {
      color: var(--hippi-green);
    }
  }

  &__hero-description {
    margin: 22px 0 0;
    color: var(--tundora);
    font-size: 18px;
    font-weight: 500;
    line-height: 26px;

    span {
      display: block;
    }
  }

  &__hero-stats {
    display: flex;
    gap: 26px;
    margin-top: 26px;
  }

  &__hero-stat {
    text-align: center;
  }

  &__hero-stat-value {
    color: var(--hippi-green);
    font-size: 28px;
    font-weight: 800;
    line-height: 1;
  }

  &__hero-stat-title {
    margin-top: 8px;
    color: var(--tundora);
    font-size: 16px;
  }

  &__hero-button {
    display: inline-flex;
    margin-top: 36px;
  }

  &__hero-image-wrapper {
    position: relative;
    max-width: 490px;
  }

  &__hero-image {
    display: block;
    width: 100%;
    border-radius: 18px;
  }

  &__section-description {
    max-width: 900px;
    text-align: center;
    color: var(--dove-gray);
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
  }

  &__included {
    padding: 40px 0 64px 0;
  }

  &__included-list {
    width: 760px;
    margin-top: 36px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  &__topics-section {
    padding: 40px 0 70px;
    background-color: var(--hint-of-green);
  }

  &__topics {
    max-width: 1100px;
    margin-top: 32px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px 18px;
  }

  &__topic {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 18px;
    background-color: var(--white);
    border: 1px solid var(--satin-linen);
    border-radius: 50px;
    font-size: 15px;
  }

  &__quote {
    padding: 54px 0;
    background-color: var(--hippi-green);
  }

  &__quote-content {
    position: relative;
    max-width: 860px;
    margin: 0 auto;
    padding-left: 58px;
  }

  &__quote-mark {
    position: absolute;
    top: 40px;
    left: -20px;
  }

  &__quote-text {
    margin: 0;
    color: var(--white);
    font-size: 18px;
    line-height: 28px;
    font-weight: 600;
  }

  &__quote-author {
    margin-top: 20px;
    color: var(--white);
    font-size: 18px;
    font-weight: 400;
    opacity: 0.7;
  }

  &__support {
    padding: 66px 0;
  }

  &__support-list {
    width: 100%;
    margin-top: 36px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  &__support-item {
    max-width: 180px;
    text-align: center;
  }

  &__support-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    margin: 0 auto 14px;
    border-radius: 50%;
    background-color: var(--kidnapper);
  }

  &__support-icon {
    width: 36px;
    height: 36px;
    object-fit: contain;
  }

  &__support-title {
    color: var(--dark-gray);
    font-size: 16px;
    font-weight: 700;
  }

  &__support-text {
    margin-top: 8px;
    color: var(--dove-gray);
    font-size: 14px;
    font-weight: 500;
  }

  &__method {
    padding: 64px 0;
    background-color: var(--zest);
    text-align: center;
  }

  &__method-title {
    margin: 0;
    color: var(--white);
    font-size: 26px;
    font-weight: 800;
  }

  &__method-text {
    max-width: 632px;
    margin: 18px auto 0;
    color: var(--white);
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }

  &__audience {
    padding: 40px 0 64px 0;
    background-color: var(--ercu-white);
  }

  &__audience-list {
    width: 1180px;
    margin-top: 34px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  &__audience-button {
    display: inline-flex;
    justify-content: center;
    margin-top: 34px;
  }

  &__pricing {
    padding: 40px 0 64px;
    background-color: var(--hint-of-green);
  }

  &__pricing-list {
    margin-top: 42px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 28px;
  }

  &__questions-cta {
    padding: 40px 0 64px;
  }

  &__question-button {
    margin-top: 26px;
  }

  @media (max-width: 1200px) {
    &__hero-wrapper {
      gap: 32px;
    }

    &__hero-title {
      font-size: 30px;
    }

    &__included-list,
    &__audience-list {
      width: 100%;
    }

    &__support-list {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  @media (max-width: 900px) {
    &__hero-wrapper {
      align-items: flex-start;
      flex-direction: column-reverse;
    }

    &__hero-image-wrapper {
      max-width: 100%;
    }

    &__pricing-list {
      flex-direction: column;
      align-items: center;
    }
  }

  @media (max-width: 660px) {
    padding-top: 56px;

    &__hero {
      padding: 36px 0 48px;
    }

    &__hero-title {
      font-size: 24px;
    }

    &__hero-description {
      font-size: 15px;
      line-height: 23px;
    }

    &__hero-stats {
      gap: 18px;
      justify-content: space-between;
    }

    &__hero-stat-value {
      font-size: 28px;
    }

    &__hero-stat-title {
      font-size: 12px;
    }

    &__included,
    &__support,
    &__audience,
    &__questions-cta {
      padding: 24px 0 55px 0;
    }

    &__topics-section,
    &__pricing {
      padding: 24px 0 50px;
    }

    &__included-list,
    &__audience-list {
      grid-template-columns: 1fr;
      gap: 18px;
    }

    &__section-description {
      font-size: 14px;
      line-height: 22px;
    }

    &__quote {
      padding: 40px 0;
    }

    &__quote-content {
      padding-left: 36px;
    }

    &__quote-mark {
      font-size: 58px;
    }

    &__quote-text {
      font-size: 16px;
      line-height: 26px;
    }

    &__support-list {
      flex-direction: column;
      align-items: center;
    }

    &__support-item {
      max-width: 260px;
    }

    &__method-title {
      font-size: 22px;
    }

    &__method-text {
      font-size: 14px;
      line-height: 22px;
    }
  }

  @media (max-width: 400px) {
    &__hero-stats {
      gap: 18px;
    }

    &__hero-stat {
      text-align: left;
    }

    &__topic {
      width: 100%;
      box-sizing: border-box;
      text-align: center;
    }
  }
}
</style>
