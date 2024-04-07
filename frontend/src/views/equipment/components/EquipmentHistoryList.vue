<template>
  <div class="equipment__history">
    <div class="equipment__history-item">
      <span>Дата</span>
      <span>МОЛ</span>
      <span>Админ</span>
      <span>Филиал</span>
      <span>Статус</span>
      <span>Номер накладной</span>
    </div>
    <div
      v-for="historyItem in history"
      :key="`h${historyItem}`"
      class="equipment__history-item"
    >
      <span>{{ getFormatDate(historyItem.date, TimeFormatDict.FullDateLongMonth) }}</span>
      <span>{{ historyItem.accepted }}</span>
      <span>{{ `${historyItem.passedOn.firstName} ${historyItem.passedOn.lastName}` }}</span>
      <span>{{ `${historyItem.branch.title}` }}</span>
      <span>{{ `${getReadableState(historyItem.equipmentState)}` }}</span>
      <span>{{ `${historyItem.invoiceNumber}` }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import type { IHistoryItem } from '@/entities/types/backend/response/equipment';
import { getFormatDate, TimeFormatDict } from '@/utils/helpers/date';
import { getReadableState } from '../utils/getDataItems';

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
  grid-template-columns: repeat(6, 1fr);
  border-bottom: 1px solid var(--border-secondary);
  padding: 0 16px 4px 16px;
}

.equipment__history-item:first-child span {
  font-weight: 600;
}

.equipment__history-item:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}
</style>
