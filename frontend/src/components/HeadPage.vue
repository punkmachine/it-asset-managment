<template>
  <div class="head-page">
    <h1 class="head-page__title">{{ props.title }}</h1>
    <div class="flex gap-2">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

interface IProps {
  title: string;
}

const props = defineProps<IProps>();
</script>

<style scoped>
.head-page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
}

.head-page__title {
  font-size: 22px;
  font-weight: 600;
}
</style>
