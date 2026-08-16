<template>
  <button
    class="app-button"
    :class="{
      '--green': type === 'green',
      '--orange': type === 'orange',
      '--orange-outline': type === 'orange-outline',
      '--green-outline': type === 'green-outline',
    }"
  >
    <span class="app-button__wrapper">
      <span v-if="!link">{{ text }}</span>
      <a v-else :href="link">
        <span>{{ text }}</span>
      </a>
    </span>

    <img v-if="icon" :src="`/icons/${icon}`" alt="Icon" class="app-button__icon" />
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
  },
  type: {
    type: String,
    default: 'green',
  },
  height: {
    type: String,
    default: '52px',
  },
  link: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.app-button {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 304px;
  height: v-bind(height);
  padding: 8px 30px;
  border-radius: 12px;
  border: none;
  color: var(--white);
  cursor: pointer;
  transition: all 0.2s;

  font-family: 'Mulish', sans-serif;
  font-size: 16px;
  font-weight: bold;

  a {
    color: var(--white);
  }

  &__icon {
    position: relative;
    right: -18px;
    margin-left: 8px;
    transition: all 0.2s;
  }

  &.--green {
    background-color: var(--apple);
  }

  &.--green-outline {
    padding: 12px 30px;
    background-color: transparent;
    border: 2px solid var(--japanese-laurel);
    color: var(--japanese-laurel);

    @media (max-width: 1200px) {
      padding: 8px 24px;
      font-size: 14px;
    }
  }

  &.--orange {
    background-color: var(--ecstasy);
  }

  &.--orange-outline {
    padding: 12px 30px;
    background-color: transparent;
    border: 2px solid var(--ecstasy);
    color: var(--ecstasy);
    font-size: 18px;

    @media (max-width: 1200px) {
      padding: 8px 24px;
      font-size: 14px;
    }
  }

  &:hover {
    border-radius: 18px;
    filter: saturate(120%);

    img {
      transform: scale(0.9);
    }
  }

  @media (max-width: 1200px) {
    padding: 12px 24px;
    max-width: 100%;
  }

  @media (max-width: 900px) {
    font-size: 14px;
  }
}
</style>
