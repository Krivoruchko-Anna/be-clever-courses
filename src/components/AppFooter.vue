<template>
  <footer class="app-footer">
    <div class="app-footer__wrapper">
      <div class="app-footer__address">
        <div class="app-footer__address-title">Наш адрес</div>
        <div class="app-footer__address-text">
          <span>ООО "СМАРТ КЛЕВЕР"</span>
          <span>УНП 491387142</span>
          <span>246022 Республика Беларусь, Гомель, ул. Кирова, д. 59Б, офис 15</span>
          <span>
            Свидетельство о государственной регистрации от 21.03.2024 выдано Гомельским
            горисполкомом
          </span>
          <span>Режим работы 10:00 – 20:00</span>
        </div>
      </div>
      <div class="app-footer__contacts">
        <div class="app-footer__contacts-title">Контакты</div>
        <div class="app-footer__contacts-links">
          <a href="tel:+375259964261" class="app-footer__contact">+375 (25) 996-42-61</a>
          <a
            href="https://instagram.com/i.kovalenko_beclever"
            target="_blank"
            class="app-footer__contact"
            >i.kovalenko_beclever</a
          >
          <a href="https://beclever.by/" target="_blank" class="app-footer__contact"
            >www.beclever.by</a
          >
          <a href="mailto:kovalenko.irene@yandex.ru" class="app-footer__contact"
            >Kovalenko.irene@yandex.ru</a
          >
        </div>
      </div>
      <div class="app-footer__info">
        <a href="" class="app-footer__info-link">
          Положение о политике в отношении обработки персональных данных
        </a>
        <RouterLink to="/public-offer" class="app-footer__info-link">
          Публичный договор возмездного оказания консультационно-информационных услуг
        </RouterLink>
      </div>
      <div class="app-footer__payment" role="group" aria-label="Поддерживаемые способы оплаты">
        <img
          v-for="icon in paymentIcons"
          :key="icon.src"
          :src="icon.src"
          :alt="icon.alt"
          class="app-footer__payment-icon"
          loading="lazy"
        />
      </div>
    </div>

    <div class="app-footer__copyright">© {{ currentYear }} Be Clever. Все права защищены.</div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()

const paymentIcons = [
  { src: '/icons/payment/white-01.png', alt: 'Альфа-Банк' },
  { src: '/icons/payment/white-02.png', alt: 'Visa' },
  { src: '/icons/payment/white-03.png', alt: 'Visa Secure' },
  { src: '/icons/payment/white-04.png', alt: 'Mastercard ID Check' },
  { src: '/icons/payment/white-05.png', alt: 'Mastercard' },
  { src: '/icons/payment/white-06.png', alt: 'Белкарт Интернет Пароль' },
  { src: '/icons/payment/white-08.png', alt: 'Белкарт' },
  { src: '/icons/payment/white-09.png', alt: 'Samsung Pay' },
  { src: '/icons/payment/white-10.png', alt: 'Apple Pay' },
]
</script>

<style lang="scss" scoped>
.app-footer {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--tundora);
  color: var(--white);
  min-height: 300px;
  padding: 50px 24px 64px;
  font-size: 14px;

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;
    width: 940px;
    padding: 0 20px;

    @media (max-width: 1014px) {
      justify-content: flex-start;
      gap: 10px;
    }

    @media (max-width: 660px) {
      flex-direction: column;
      align-items: flex-start;
    }

    @media (max-width: 500px) {
      padding: 0;
    }
  }

  &__address {
    width: 284px;

    @media (max-width: 660px) {
      width: 100%;
    }
  }

  &__address-title {
    font-weight: bold;
  }

  &__address-text {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    color: var(--white);

    @media (max-width: 660px) {
      max-width: 420px;
    }

    span {
      margin-top: 8px;
    }
  }

  &__contacts {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;

    @media (max-width: 660px) {
      margin-top: 24px;
    }
  }

  &__contact {
    color: var(--white);
    text-decoration: none;

    &:hover {
      color: var(--spring-rain);
    }
  }

  &__contacts-title {
    font-weight: bold;
  }

  &__contacts-links {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;

    @media (max-width: 660px) {
      gap: 12px;
    }
  }

  &__info {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 660px) {
      margin-top: 30px;
      gap: 14px;
    }
  }

  &__info-link {
    width: 380px;
    display: block;
    color: var(--white);

    &:hover {
      color: var(--hint-of-green-bright);
    }

    @media (max-width: 660px) {
      width: 100%;
    }
  }

  &__payment {
    width: 100%;
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px 18px;

    @media (max-width: 660px) {
      gap: 16px 12px;
    }
  }

  &__payment-icon {
    display: block;
    height: 26px;
    width: auto;

    @media (max-width: 660px) {
      height: 22px;
    }
  }

  @media (max-width: 660px) {
    align-items: flex-start;
  }

  &__copyright {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: var(--gray);
    font-size: 14px;
  }

  @media (max-width: 660px) {
    align-items: flex-start;
    padding: 40px 24px 80px;

    &__copyright {
      bottom: 12px;
      font-size: 12px;
    }
  }
}
</style>
