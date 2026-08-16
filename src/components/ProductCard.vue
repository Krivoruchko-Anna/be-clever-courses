<template>
  <div class="product-card">
    <img
      :src="`/images/products/${product.image}`"
      :alt="product.title"
      class="product-card__image"
    />
    <div class="product-card__content">
      <div class="product-card__info">
        <div class="product-card__header">
          <img class="product-card__icon" :src="`/icons/${product.icon}.svg`" alt="approach-icon" />
          <h3 class="product-card__title">{{ product.title }}</h3>
        </div>
        <p class="product-card__description">{{ product.description }}</p>
      </div>

      <RouterLink v-if="product.link" :to="product.link" class="product-card__button-link">
        <AppButton
          class="product-card__button"
          text="Подробнее"
          type="orange-outline"
          height="34px"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'

defineProps({
  product: {
    title: String,
    icon: String,
    description: String,
    image: String,
    link: String,
  },
})
</script>

<style lang="scss">
.product-card {
  display: flex;
  flex-direction: column;
  width: 460px;
  height: auto;
  border-radius: 16px;
  transition: all 0.3s;
  cursor: pointer;
  box-shadow: 0 4px 9px #0000001a;

  &:hover {
    box-shadow:
      0 4px 9px #0000001a,
      0 1px 3px #0000001a;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-top: 18px;
  }

  &__image {
    border-radius: 16px 16px 0 0;
  }

  &__title {
    margin: 0;
    color: var(--killarney);
    font-size: 18px;
    font-weight: bold;
  }

  &__description {
    color: var(--dove-gray);
    font-size: 16px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    padding: 0 24px 28px 24px;
  }

  &__button {
    align-self: center;
    margin-top: 10px;
  }

  &__button-link {
    align-self: center;
    margin-top: 10px;
    text-decoration: none;
  }

  &__icon {
    width: 36px;
  }

  .app-button.--orange-outline {
    padding: 8px 20px;
    font-size: 14px;
    border-width: 1px;
  }

  @media (max-width: 1200px) {
    width: 360px;

    &__title {
      font-size: 16px;
    }
  }

  @media (max-width: 400px) {
    width: 100%;
  }
}
</style>
