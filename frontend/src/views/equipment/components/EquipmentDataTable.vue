<template>
  <div class="equipment__data">
    <div
      v-for="(item, index) in dataItems"
      :key="index"
      class="equipment__data-item"
    >
      <span>{{ item.title }}</span>
      <span>{{ item.value }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import type { IDataItem } from '@/views/equipment/types';

interface IProps {
  dataItems: IDataItem[],
}

defineProps<IProps>();
</script>

<style scoped>
.equipment__data {
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.equipment__data-item {
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid var(--border-secondary);
  padding: 0 16px 4px 16px;
  text-wrap: balance;
}

.equipment__data-item:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}
</style>
