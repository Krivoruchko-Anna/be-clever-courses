<template>
  <div>
    <AppHeader />

    <main class="contacts-page">
      <section class="contacts-page__hero">
        <div class="container">
          <div class="contacts-page__hero-content">
            <h1 class="contacts-page__title">Контакты</h1>
            <p class="contacts-page__description">
              Свяжитесь с нами удобным способом — ответим на вопросы по курсам, материалам и
              консультациям.
            </p>
          </div>
        </div>
      </section>

      <section class="contacts-page__content">
        <div class="container">
          <div class="contacts-page__grid">
            <div class="contacts-page__contacts-card">
              <div class="contacts-page__contacts-list">
                <a
                  v-for="contact in contacts"
                  :key="contact.title"
                  :href="contact.href"
                  :target="contact.external ? '_blank' : undefined"
                  :rel="contact.external ? 'noopener noreferrer' : undefined"
                  class="contacts-page__contact"
                >
                  <span class="contacts-page__contact-icon-wrapper">
                    <img
                      :src="contact.icon"
                      :alt="contact.title"
                      class="contacts-page__contact-icon"
                    />
                  </span>

                  <span>
                    <span class="contacts-page__contact-title">{{ contact.title }}</span>
                    <span class="contacts-page__contact-value">{{ contact.value }}</span>
                  </span>
                </a>
              </div>
            </div>

            <div class="contacts-page__info-card">
              <h2 class="contacts-page__section-title">Адрес</h2>

              <div class="contacts-page__address">
                <address>Беларусь, г. Гомель, ул. Кирова, 59Б, каб. 15</address>
                <address>Беларусь, г. Гомель, Кирова 55, каб. 302</address>
              </div>

              <img src="/images/clover.webp" class="contacts-page__clover" alt="clover" />
            </div>
          </div>

          <div class="contacts-page__map-card">
            <div class="contacts-page__map-header">
              <h2 class="contacts-page__section-title">Мы на карте</h2>
            </div>

            <iframe
              class="contacts-page__map"
              title="Be Clever на карте"
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A67fadc5567c0c40994292b8007cca2485cb8c45780de39db428fcf2e6ba6dc8b&amp;source=constructor"
              width="1065"
              height="700"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const contacts = [
  {
    title: 'Телефон',
    value: '+375 25 966-42-61',
    href: 'tel:+375259964261',
    icon: '/icons/phone.svg',
    external: false,
  },
  {
    title: 'E-mail',
    value: 'kovalenko.irene@yandex.ru',
    href: 'mailto:kovalenko.irene@yandex.ru',
    icon: '/icons/website.svg',
    external: false,
  },
  {
    title: 'Сайт',
    value: 'www.beclever.by',
    href: 'https://beclever.by/',
    icon: '/icons/website.svg',
    external: true,
  },
  {
    title: 'Instagram',
    value: 'i.kovalenko_beclever',
    href: 'https://instagram.com/i.kovalenko_beclever',
    icon: '/icons/instagram.svg',
    external: true,
  },
  {
    title: 'Instagram Be Clever',
    value: 'beclever_gomel',
    href: 'https://www.instagram.com/beclever_gomel/',
    icon: '/icons/instagram.svg',
    external: true,
  },
  {
    title: 'YouTube',
    value: 'YouTube-канал Be Clever',
    href: 'https://www.youtube.com/channel/UCdNpR5WgKAXP2cP49T73cZg?view_as=subscriber',
    icon: '/icons/website.svg',
    external: true,
  },
]
</script>

<style lang="scss" scoped>
.contacts-page {
  padding-top: 64px;
  color: var(--dark-gray);

  &__hero {
    padding: 56px 0 64px;
    background-color: var(--ercu-white);
  }

  &__title {
    margin: 18px 0 0;
    color: var(--hippi-green);
    font-size: 32px;
    font-weight: 700;
  }

  &__description {
    max-width: 920px;
    margin: 12px 0 0;
    color: var(--tundora);
    font-size: 18px;
    line-height: 28px;
  }

  &__content {
    padding: 56px 0 72px;
  }

  &__grid {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.9fr);
    gap: 28px;
  }

  &__contacts-card,
  &__info-card,
  &__map-card {
    box-sizing: border-box;
    padding: 24px;
    background-color: var(--white);
    border: 1px solid var(--satin-linen);
    border-radius: 18px;
    box-shadow: 0 1px 9px #0000000f;
  }

  &__section-title {
    margin: 0;
    color: var(--dark-gray);
    font-size: 20px;
    font-weight: 600;
  }

  &__contacts-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  &__contact {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
    padding: 16px;
    border: 1px solid var(--satin-linen);
    border-radius: 14px;
    color: var(--dark-gray);
    background-color: var(--ercu-white);

    &:hover {
      border-color: var(--ecstasy);
      transform: translateY(-2px);
    }
  }

  &__contact-icon-wrapper {
    display: flex;
    flex: 0 0 44px;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background-color: var(--kidnapper);
  }

  &__contact-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  &__contact-title {
    display: block;
    color: var(--dove-gray);
    font-size: 13px;
  }

  &__contact-value {
    display: block;
    margin-top: 4px;
    color: var(--dark-gray);
    font-size: 15px;
    font-weight: 700;
    overflow-wrap: anywhere;
  }

  &__address {
    margin-top: 20px;

    address {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--tundora);
      font-size: 15px;
      font-style: normal;
      line-height: 26px;

      &::before {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: var(--la-palma);
      }
    }
  }

  &__clover {
    width: 170px;
    height: auto;
    margin-top: 20px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  &__company {
    margin-top: 26px;
    padding-top: 22px;
    border-top: 1px solid var(--satin-linen);
    color: var(--dove-gray);
    font-size: 15px;
    line-height: 24px;
  }

  &__company-title {
    margin-bottom: 8px;
    color: var(--dark-gray);
    font-weight: 800;
  }

  &__map-card {
    margin-top: 28px;
  }

  &__map-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  &__map-link {
    color: var(--tundora);
    font-size: 15px;
    font-weight: 600;

    &:hover {
      color: var(--ecstasy);
    }
  }

  &__map {
    width: 100%;
    height: 420px;
    margin-top: 24px;
    border: 0;
    border-radius: 14px;
  }

  @media (max-width: 900px) {
    &__grid {
      grid-template-columns: 1fr;
    }

    &__contacts-list {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 660px) {
    padding-top: 56px;

    &__hero {
      padding: 36px 0 44px;
    }

    &__title {
      font-size: 28px;
    }

    &__description {
      font-size: 15px;
      line-height: 23px;
    }

    &__content {
      padding: 36px 0 50px;
    }

    &__contacts-card,
    &__info-card,
    &__map-card {
      padding: 22px 18px;
      border-radius: 14px;
    }

    &__section-title {
      font-size: 20px;
    }

    &__map-header {
      align-items: flex-start;
      flex-direction: column;
      gap: 10px;
    }

    &__map {
      height: 320px;
    }
  }
}
</style>
