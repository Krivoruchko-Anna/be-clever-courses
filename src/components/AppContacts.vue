<template>
  <div class="app-contacts">
    <div class="app-contacts__info">
      <div class="app-contacts__wrapper">
        <h2 class="app-contacts__title">Наши контакты</h2>
        <div class="app-contacts__contact">
          <div class="icon-wrapper">
            <img src="/icons/website.svg" alt="website" class="icon" />
          </div>
          <a href="https://beclever.by/" target="_blank" class="text">www.beclever.by</a>
        </div>
        <div class="app-contacts__contact">
          <div class="icon-wrapper">
            <img src="/icons/instagram.svg" alt="website" class="icon" />
          </div>
          <a href="https://instagram.com/i.kovalenko_beclever" target="_blank" class="text"
            >i.kovalenko_beclever</a
          >
        </div>
        <div class="app-contacts__contact">
          <div class="icon-wrapper">
            <img src="/icons/phone.svg" alt="website" class="icon" />
          </div>
          <a href="tel:+375259964261" class="text">+375 25 966-42-61</a>
        </div>
      </div>
      <img src="/images/clover.webp" class="app-contacts__clover" alt="clover" />
    </div>
    <div class="app-contacts__photos">
      <div class="app-contacts__photos-top">
        <img
          src="/images/contacts/contacts_1.webp"
          alt="group-photo"
          class="app-contacts__photo-top"
        />
        <img
          src="/images/contacts/contacts_2.webp"
          alt="group-photo"
          class="app-contacts__photo-top"
        />
      </div>
      <img
        src="/images/contacts/contacts_3.webp"
        alt="group-photo"
        class="app-contacts__photo-bottom"
      />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.app-contacts {
  display: flex;
  justify-content: space-between;
  gap: 40px;

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 660px) {
      justify-content: flex-start;
      gap: 24px;
    }

    @media (max-width: 400px) {
      gap: 10px;
    }
  }

  &__title {
    font-size: 38px;
    font-weight: 600;
    color: var(--hippi-green);

    @media (max-width: 1200px) {
      font-size: 34px;
    }

    @media (max-width: 660px) {
      font-size: 24px;
      margin: 0;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 14px;

    @media (max-width: 660px) {
      gap: 10px;
    }
  }

  &__contact {
    display: flex;
    align-items: center;
    gap: 16px;

    .icon-wrapper {
      display: flex;
      flex: 0 0 44px;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background-color: var(--kidnapper);
    }

    .icon {
      width: 24px;
      height: 24px;
      object-fit: contain;

      @media (max-width: 660px) {
        width: 20px;
      }
    }

    a {
      font-size: 18px;
      color: var(--tundora);
      text-decoration: none;

      @media (max-width: 400px) {
        font-size: 15px;
      }

      &:hover {
        color: var(--ecstasy);
      }
    }

    @media (max-width: 660px) {
      gap: 12px;
    }
  }

  &__photos {
    display: flex;
    flex-direction: column;
    gap: 14px;

    max-width: 590px;

    img {
      border-radius: 12px;
    }

    @media (max-width: 1200px) {
      max-width: 400px;
    }

    @media (max-width: 900px) {
      max-width: 330px;
    }

    @media (max-width: 660px) {
      max-width: 38%;
    }
  }

  &__photos-top {
    display: flex;
    justify-content: space-between;

    @media (max-width: 660px) {
      flex-direction: column;
      gap: 14px;
    }
  }

  &__photo-top {
    width: calc(50% - 8px);

    @media (max-width: 660px) {
      width: 100%;
    }
  }
  &__photo-bottom {
    @media (max-width: 660px) {
      display: none;
    }
  }

  &__clover {
    width: 320px;
    margin-left: -32px;

    @media (max-width: 1200px) {
      width: 200px;
      margin-left: 0;
    }

    @media (max-width: 900px) {
      width: 50%;
    }

    @media (max-width: 400px) {
      align-self: center;
    }
  }

  @media (max-width: 900px) {
    justify-content: center;
  }

  @media (max-width: 660px) {
    gap: 24px;
  }

  @media (max-width: 400px) {
    gap: 12px;
  }
}
</style>
