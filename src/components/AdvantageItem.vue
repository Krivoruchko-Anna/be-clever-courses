<template>
  <div
    class="advantage-item"
    :class="{ '--top': isTop, '--left': isLeft, '--right': isRight, '--bottom': isBottom }"
  >
    <div class="advantage-item__header">
      <img class="advantage-item__icon" src="/icons/done.svg" alt="" />
      <div class="advantage-item__title">{{ advantage.title }}</div>
    </div>

    <div class="advantage-item__body">
      <div class="advantage-item__text" v-if="advantage.text">{{ advantage.text }}</div>
      <div v-else class="advantage-item__paragraphs">
        <div v-for="(p, i) in advantage.paragraphs" :key="i" class="advantage-item__paragraph">
          <img v-if="advantage.bullets" src="/icons/target.svg" alt="" />
          {{ p }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  advantage: {
    type: Object,
    required: true,
  },
})

const isTop = computed(() => props.advantage.id === '1' || props.advantage.id === '2')
const isLeft = computed(() => props.advantage.id === '1' || props.advantage.id === '3')
const isRight = computed(() => props.advantage.id === '2' || props.advantage.id === '4')
const isBottom = computed(() => props.advantage.id === '3' || props.advantage.id === '4')
</script>

<style lang="scss" scoped>
.advantage-item {
  max-width: 440px;

  &__header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  &__icon {
    width: 30px;
    height: auto;

    @media (max-width: 900px) {
      width: 24px;
    }
  }

  &__title {
    color: var(--japanese-laurel);
    font-size: 20px;
    font-weight: bold;

    @media (max-width: 660px) {
      font-size: 16px;
    }
  }

  &__body {
    margin-top: 14px;
    margin-left: 42px;
    line-height: 24px;
    font-size: 16px;
    color: var(--tundora);

    @media (max-width: 1200px) {
      margin-top: 4px;
    }
  }

  &__paragraph {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 8px;

    img {
      width: 16px;
    }

    @media (max-width: 1200px) {
      margin-top: 8px;
    }
  }

  &.--top {
    padding-bottom: 42px;
    border-bottom: 1px dashed var(--la-palma);
  }

  &.--left {
    padding-right: 42px;
    border-right: 1px dashed var(--la-palma);
  }

  &.--right {
    padding-left: 42px;
  }

  &.--bottom {
    padding-top: 42px;
    padding-bottom: 42px;
  }

  @media (max-width: 1200px) {
    &.--top,
    &.--left,
    &.--right,
    &.--bottom {
      padding: 0;
      border: none;
    }
  }

  @media (max-width: 900px) {
    max-width: 360px;
  }
}
</style>
