<template>
  <header class="header">
    <button class="burger" @click="toggleMenu" aria-label="Открыть меню">
      <span :class="{ open: menuOpen }"></span>
      <span :class="{ open: menuOpen }"></span>
      <span :class="{ open: menuOpen }"></span>
    </button>

    <nav class="header__navbar" :class="{ open: menuOpen }">
      <img src="/icons/logo.png" alt="clover logo" class="header__logo" />
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

import { ref } from 'vue'

const menuOpen = ref(false)
function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
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

    @media (max-width: 660px) {
      display: none;
    }
  }

  &__navbar {
    display: flex;
    align-items: center;
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

  .burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 20;

    span {
      display: block;
      height: 1px;
      width: 100%;
      background: var(--killarney);
      margin: 3px 0;
      border-radius: 2px;
      transition: 0.3s;
    }
    span.open:nth-child(1) {
      transform: translateY(6px) rotate(45deg);
    }
    span.open:nth-child(2) {
      opacity: 0;
    }
    span.open:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }

  @media (max-width: 660px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 12px;
    height: auto;
    background-color: var(--white);

    .burger {
      display: flex;
    }

    &__navbar {
      position: absolute;
      top: 56px;
      left: 0;
      right: 0;
      background: #fff;
      flex-direction: column;
      gap: 0;
      padding: 0;
      display: none;
      z-index: 15;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

      &.open {
        display: flex;
      }

      a {
        width: 100%;
        padding: 16px 20px;
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>
