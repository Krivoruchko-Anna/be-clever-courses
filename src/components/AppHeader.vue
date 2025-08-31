<template>
  <header class="header">
    <nav class="header__navbar">
      <a
        v-for="(item, index) in menuItems"
        :key="index"
        href="#"
        :class="['header__nav-link', { 'header__nav-link--active': item.active }]"
      >
        {{ item.label }}
      </a>
    </nav>
  </header>
</template>

<script setup>

const menuItems = [
  { label: "Главная", active: true },
  { label: "Курсы" },
  { label: "Материалы" },
  { label: "Консультация" },
  { label: "Документы" },
];
</script>

<style lang="scss" scoped>
.header {
  height: 65px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  backdrop-filter: blur(4px) brightness(100%);
  border-bottom: 1px solid rgba(45, 90, 45, 0.25);
  background-color: transparent;
  z-index: 10;

  &__logo {
    height: 40px;
    width: 40px;
    object-fit: cover;
    margin-right: 40px;
  }

  &__navbar {
    display: flex;
    gap: 30px;
    padding-left: 20px;

    @media (max-width: 660px) {
      flex-wrap: wrap;
      gap: 14px;
    }
  }

  &__nav-link {
    color: var(--killarney);
    font-family: "Mulish", Helvetica, sans-serif;
    font-size: 18px;
    font-weight: 500;
    text-decoration: none;
    white-space: nowrap;

    &--active {
      text-decoration: underline;
    }

    &:hover {
      color: var(--la-palma);
    }

    @media (max-width: 660px) {
      font-size: 16px;
    }
  }

  @media (max-width: 660px) {
    padding: 16px;
    height: auto;
  }
}
</style>
