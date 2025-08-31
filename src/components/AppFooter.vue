<template>
  <footer class="app-footer">
    <div class="app-footer__wrapper">
      <div class="app-footer__contacts">
        <div class="app-footer__contacts-title">Контакты</div>
        <div class="app-footer__contacts-links">
          <a href="tel:+375259964261" class="app-footer__contact">+375 25 966-42-61</a>
          <a href="https://instagram.com/i.kovalenko_beclever" target="_blank" class="app-footer__contact">i.kovalenko_beclever</a>
          <a href="https://beclever.by/" target="_blank" class="app-footer__contact">www.beclever.by</a>
        </div>
      </div>
      <div class="app-footer__info">
        <a href="" class="app-footer__info-link">
          Положение о политике в отношении обработки персональных данных
        </a>
        <a href="" class="app-footer__info-link">
          Публичный договор возмездного оказания консультационно-информационных услуг
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.app-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--tundora);
  color: var(--white);
  height: 300px;
  padding: 40px 24px;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 600px;
    padding: 0 20px;

    @media (max-width: 660px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__contacts {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }

  &__contact {
    text-decoration: none;

    &:hover {
      color: var(--hint-of-green-dark);
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
    margin-top: 45px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 660px) {
      margin-top: 30px;
      gap: 14px;
    }
  }

  &__info-link {
    width: 300px;
    display: block;
    text-decoration: underline;

    @media (max-width: 660px) {
      width: 100%;
    }
  }

  @media (max-width: 660px) {
    align-items: flex-start;
  }
}
</style>
