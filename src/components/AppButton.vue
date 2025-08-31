<template>
  <button class="app-button" :class="{
   '--green': type === 'green',
   '--orange': type === 'orange',
   '--orange-outline': type === 'orange-outline'
  }">
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
  height: 56px;
  max-width: 304px;
  padding: 0 36px;
  border-radius: 50px;
  border: none;
  color: var(--white);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &.--green {
    background-color: var(--japanese-laurel);
  }

  &.--orange {
    background-color: var(--ecstasy);
  }

  &.--orange-outline {
    height: 62px;
    background-color: transparent;
    border: 2px solid var(--ecstasy);
    color: var(--ecstasy);
    font-size: 18px;

    @media (max-width: 1200px) {
      height: 52px;
      font-size: 16px;
    }
  }

  &:hover {
    opacity: 0.8;
    filter: saturate(200%);
  }

  @media (max-width: 1200px) {
    padding: 0 22px;
  }

  @media (max-width: 900px) {
    font-size: 15px;
  }
}
</style>
