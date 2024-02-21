<template>
  <MainLayout v-if="$route.meta.layout === 'main'">
    <RouterView />
  </MainLayout>
  <EmptyLayout v-else-if="$route.meta.layout === 'empty'">
    <RouterView />
  </EmptyLayout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import EmptyLayout from '@/layouts/EmptyLayout.vue';
</script>

<style scoped></style>
