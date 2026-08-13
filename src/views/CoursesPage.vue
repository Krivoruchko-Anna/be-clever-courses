<template>
  <div>
    <AppHeader />
    <div class="courses">Courses</div>
    <AppFooter class="main__footer" />
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<style scoped lang="scss">
.courses {
  min-height: 60vh;
}
</style>
