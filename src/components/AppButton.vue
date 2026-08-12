<template>
  <button
    class="app-button"
    :class="{
      '--green': type === 'green',
      '--orange': type === 'orange',
      '--orange-outline': type === 'orange-outline',
    }"
  >
    <span>{{ text }}</span>
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
})
</script>

<style lang="scss" scoped>
.app-button {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 304px;
  padding: 8px 30px;
  border-radius: 12px;
  border: none;
  color: var(--white);
  cursor: pointer;
  transition: all 0.2s;

  font-family: 'Mulish', sans-serif;
  font-size: 16px;
  font-weight: bold;

  &.--green {
    background-color: var(--apple);
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
    opacity: 0.8;
    filter: saturate(150%);
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
