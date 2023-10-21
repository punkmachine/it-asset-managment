<template>
  <div class="layout">
    <LayoutHeader />

    <main>
      <MainMenu />

      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import LayoutHeader from '@/components/layout/LayoutHeader.vue';
import MainMenu from '@/components/layout/MainMenu.vue';
</script>

<style scoped>
.layout {
  --header-height: 64px;
  --menu-width: 128px;
}

main {
  background-color: var(--bg-secondary);
  display: flex;
  width: 100%;
  min-height: calc(100vh - var(--header-height));
  margin: var(--header-height) 0 0 0;

  display: grid;
  grid-template-columns: var(--menu-width) calc(100% - var(--menu-width));
}

.main-menu__wrapper {
  background-color: #202333;
}

.main-menu {
  display: flex;
  flex-direction: column;
}

.main-menu__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px 0;
  border-bottom: 2px solid var(--border-secondary);
}

.main-menu__item-icon {
  width: 24px;
  height: 24px;
  fill: var(--text-secondary);
}

.main-menu__item-text {
  color: var(--text-secondary);
  font-size: 16px;
}
</style>
