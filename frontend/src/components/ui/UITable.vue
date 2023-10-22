<template>
  <table class="table">
    <thead>
      <tr>
        <th
          v-for="col in props.columns"
          :key="col.key"
          :width="`${col.width ? col.width : 'auto'}`"
          scope="col"
        >
          {{ col.title }}
        </th>
        <th
          v-if="props.actionsColVisible"
          scope="col"
          width="316px"
        >
          Действие
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in props.rows"
        :key="rowIndex"
      >
        <td
          v-for="item in row"
          :key="`${rowIndex}-${item.key}`"
        >
          {{ item.title }}
        </td>
        <td class="flex gap-3">
          <button
            class="button button--text"
            @click="$emit('edit', row[0].title)"
          >
            <svg class="button__icon">
              <use xlink:href="@/assets/icons/sprites/buttons.svg#edit"></use>
            </svg>
            Редактировать
          </button>
          <button
            class="button button--text"
            @click="$emit('delete', row[0].title)"
          >
            <svg class="button__icon">
              <use xlink:href="@/assets/icons/sprites/buttons.svg#delete"></use>
            </svg>
            Удалить
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import type { IColumn, TRows } from '@/entities/types/UI/table';

interface IProps {
  columns: IColumn[],
  rows: TRows[],
  actionsColVisible?: boolean,
};

interface IEmits {
  (e: 'edit', id: string): void
  (e: 'delete', id: string): void
};

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();
</script>

<style scoped>
.table {
  width: 100%;
  font-size: 14px;
  text-align: left;
  color: var(--text-main);
  overflow-x: auto;
}

thead {
  text-transform: uppercase;
  color: var(--text-main);
  font-size: 14px;
  border-bottom: 1px solid var(--border-secondary);
}

thead th {
  padding: 12px 24px;
}

tbody tr {
  border-bottom: 1px solid #e5e7eb;
}

tbody td, tbody th {
  padding: 16px 24px;
  white-space: nowrap;
}

tbody th {
  font-weight: 500;
  color: var(--text-main);
}
</style>
