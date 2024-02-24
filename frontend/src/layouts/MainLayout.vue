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
import LayoutHeader from '@/components/layout/LayoutHeader.vue';
import MainMenu from '@/components/layout/MainMenu.vue';
</script>

<style scoped>
main {
  background-color: var(--bg-secondary);
  width: 100%;
  min-height: calc(100vh - var(--header-height));
  margin: var(--header-height) 0 0 0;

  display: grid;
  grid-template-columns: var(--menu-width) calc(100% - var(--menu-width));
}
</style>
