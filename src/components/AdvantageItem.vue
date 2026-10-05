<template>
  <div class="advantage-item" :class="positionClasses">
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

const TOP_IDS = new Set(['1', '2'])
const LEFT_IDS = new Set(['1', '3'])
const RIGHT_IDS = new Set(['2', '4'])
const BOTTOM_IDS = new Set(['3', '4'])

const positionClasses = computed(() => {
  const { id } = props.advantage

  return {
    '--top': TOP_IDS.has(id),
    '--left': LEFT_IDS.has(id),
    '--right': RIGHT_IDS.has(id),
    '--bottom': BOTTOM_IDS.has(id),
  }
})
</script>

<style lang="scss" scoped>
.advantage-item {
  max-width: 426px;

  &__header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  &__icon {
    width: 24px;
    height: auto;

    @media (max-width: 900px) {
      width: 20px;
    }
  }

  &__title {
    color: var(--japanese-laurel);
    font-size: 20px;
    font-weight: 600;

    @media (max-width: 900px) {
      font-size: 18px;
    }

    @media (max-width: 660px) {
      font-size: 16px;
    }
  }

  &__body {
    margin-top: 14px;
    margin-left: 36px;
    line-height: 24px;
    font-size: 16px;
    color: var(--tundora);

    @media (max-width: 1200px) {
      margin-top: 10px;
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
    padding-bottom: 36px;
    border-bottom: 1px dashed var(--la-palma);
  }

  &.--left {
    padding-right: 36px;
    border-right: 1px dashed var(--la-palma);
  }

  &.--right {
    padding-left: 36px;
  }

  &.--bottom {
    padding-top: 36px;
    padding-bottom: 36px;
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
