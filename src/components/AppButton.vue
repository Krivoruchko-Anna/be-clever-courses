<template>
  <component
    :is="link ? 'a' : 'button'"
    class="app-button"
    :class="{
      '--green': type === 'green',
      '--orange': type === 'orange',
      '--orange-outline': type === 'orange-outline',
      '--green-outline': type === 'green-outline',
    }"
    :href="link || undefined"
    :target="link ? '_blank' : undefined"
    :rel="link ? 'noopener noreferrer' : undefined"
    :type="link ? undefined : 'button'"
  >
    <span class="app-button__wrapper">
      <span>{{ text }}</span>
    </span>

    <img v-if="icon" :src="`/icons/${icon}`" alt="Icon" class="app-button__icon" />
  </component>
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
  box-sizing: border-box;
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
    color: inherit;
  }

  &__icon {
    position: relative;
    right: -18px;
    margin-left: 8px;
    transition: all 0.2s;
  }

  &.--green {
    background-color: var(--la-palma);
  }

  &.--green-outline {
    padding: 12px 30px;
    background-color: transparent;
    border: 2px solid var(--la-palma);
    color: var(--la-palma);

    @media (max-width: 1200px) {
      padding: 8px 24px;
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

    @media (max-width: 1200px) {
      padding: 8px 24px;
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

  @media (max-width: 600px) {
    font-size: 15px;
  }
}
</style>
