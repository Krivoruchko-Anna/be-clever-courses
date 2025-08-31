<template>
  <div class="product-card">
    <img :src="`/photo/products/${product.image}`"
         :alt="product.title" class="product-card__image" />
    <div class="product-card__content">
      <div class="product-card__info">
        <div class="product-card__header">
          <img class="product-card__icon"
               :src="`/icons/${product.icon}.svg`"
               alt="approach-icon"
          >
          <h3 class="product-card__title">{{ product.title }}</h3>
        </div>
        <p class="product-card__description">{{ product.description }}</p>
      </div>

      <AppButton class="product-card__button" text="Подробнее" type="orange-outline"/>
    </div>
  </div>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'

defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss">
.product-card {
  display: flex;
  flex-direction: column;
  width: 460px;
  height: auto;
  border-radius: 24px;
  transition: all 0.3s;
  cursor: pointer;
  box-shadow: 0 0 0 transparent, 0 0 0 transparent, 0 0 0 transparent, 0 0 0 transparent,
  0 5px 15px #0000001a;

  &:hover {
    box-shadow: 0 0 0 transparent, 0 0 0 transparent, 0 0 0 transparent, 0 0 0 transparent,
    0 10px 15px #0000001a, 0 4px 6px #0000001a;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-top: 18px;
  }

  &__image {
    border-radius: 24px 24px 0 0;
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

  &__icon {
    width: 36px;
  }

  .app-button.--orange-outline {
    width: 160px;
    height: 48px;
  }

  @media (max-width: 1200px) {
    width: 360px;
  }

  @media (max-width: 400px) {
    width: 300px;
  }
}
</style>
