<template>
  <div class="equipment__history">
    <div
      v-for="historyItem in history"
      :key="`h${historyItem}`"
      class="equipment__history-item"
    >
      <span>{{ getFormatDate(historyItem.date, TimeFormatDict.FullDateLongMonth) }}</span>
      <span>{{ historyItem.accepted }}</span>
      <span>{{ `${historyItem.passedOn.firstName} ${historyItem.passedOn.lastName}` }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import type { IHistoryItem } from '@/entities/types/backend/response/equipment';
import { getFormatDate, TimeFormatDict } from '@/utils/helpers/date';

interface IProps {
  history: IHistoryItem[],
}

defineProps<IProps>();
</script>

<style scoped>
.equipment__history {
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.equipment__history-item {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid var(--border-secondary);
  padding: 0 16px 4px 16px;
}

.equipment__history-item:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}
</style>
