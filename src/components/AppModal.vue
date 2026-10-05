<template>
  <Teleport to="body">
    <div class="app-modal" role="dialog" aria-modal="true">
      <div class="app-modal__content" @click.stop>
        <button class="app-modal__close" type="button" aria-label="Закрыть" @click="emit('close')">
          ✕
        </button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const emit = defineEmits(['close'])
</script>

<style lang="scss" scoped>
.app-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(5px);

  &__content {
    position: relative;
    width: min(980px, 100%);
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    border-radius: 18px;
  }

  &__close {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 2;
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border: none;
    border-radius: 50%;
    background: var(--white);
    color: var(--dark-gray);
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
}
</style>
