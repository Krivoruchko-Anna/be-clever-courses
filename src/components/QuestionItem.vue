<template>
  <div class="question-item">
    <div class="question-item__header">
      <img class="question-item__icon" src="../assets/icons/question.svg" alt="" />
      <div class="question-item__question">{{ question.question }}</div>
    </div>

    <div class="question-item__answer">{{ question.answer }}</div>
  </div>
</template>

<script setup>
defineProps({
  question: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.question-item {
  max-width: 500px;

  &__header {
    display: flex;
    align-items: flex-start;
    gap: 20px;
  }

  &__icon {
    @media (max-width: 900px) {
      width: 24px
    }
  }

  &__question {
    font-size: 20px;
    font-weight: bold;
    color: var(--ecstasy);

    @media (max-width: 660px) {
      font-size: 18px;
    }
  }

  &__answer {
    margin-top: 16px;
    margin-left: 50px;
    line-height: 24px;
    font-size: 16px;
    color: var(--tundora);

    @media (max-width: 1200px) {
      margin-top: 4px;
    }
  }
}
</style>
