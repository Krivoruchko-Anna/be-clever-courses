<template>
  <div class="question-item">
    <div class="question-item__header">
      <img class="question-item__icon" src="/icons/question.svg" alt="" />
      <div class="question-item__question">{{ question.question }}</div>
    </div>

    <div class="question-item__answer">{{ question.answer }}</div>
  </div>
</template>

<script setup>
defineProps({
  question: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.question-item {
  max-width: 500px;

  &__header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  &__icon {
    width: 24px;

    @media (max-width: 900px) {
      width: 20px;
    }
  }

  &__question {
    font-size: 20px;
    font-weight: 600;
    color: var(--ecstasy);

    @media (max-width: 900px) {
      font-size: 18px;
    }

    @media (max-width: 660px) {
      font-size: 16px;
    }
  }

  &__answer {
    margin-top: 16px;
    margin-left: 36px;
    line-height: 24px;
    font-size: 16px;
    color: var(--tundora);

    @media (max-width: 1200px) {
      margin-top: 10px;
    }
  }
}
</style>
