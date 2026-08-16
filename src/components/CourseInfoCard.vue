<template>
  <div class="course-info-card">
    <div class="course-info-card__icon-wrapper">
      <img :src="icon" :alt="title" class="course-info-card__icon" />
    </div>
    <h3 class="course-info-card__title">{{ title }}</h3>
    <p class="course-info-card__text">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'var(--white)',
  },
})
</script>

<style lang="scss" scoped>
.course-info-card {
  box-sizing: border-box;
  padding: 34px;
  min-height: 220px;
  text-align: center;
  background-color: v-bind(color);
  border: 1px solid var(--satin-linen);
  border-radius: 16px;

  &__icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 14px;
    width: 60px;
    height: 60px;
    border-radius: 16px;
    background-color: var(--kidnapper);
  }

  &__icon {
    width: 46px;
    height: 46px;
    object-fit: contain;
  }

  &__title {
    margin: 0;
    color: var(--dark-gray);
    font-size: 18px;
    font-weight: 800;
  }

  &__text {
    margin: 10px 0 0;
    color: var(--dove-gray);
    font-size: 15px;
    line-height: 22px;
  }

  @media (max-width: 660px) {
    min-height: auto;
    padding: 22px 18px;

    &__title {
      font-size: 16px;
    }

    &__text {
      font-size: 14px;
      line-height: 20px;
    }
  }
}
</style>
