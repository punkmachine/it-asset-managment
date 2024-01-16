<template>
  <table class="table">
    <thead>
      <tr>
        <th
          v-for="col in columns"
          :key="col.key"
          :width="`${col.width ? col.width : 'auto'}`"
          scope="col"
        >
          {{ col.title }}
        </th>
        <th
          v-if="deleteButtonVisible || editButtonVisible"
          scope="col"
          width="316px"
        >
          Действие
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in filteredRows"
        :key="rowIndex"
        :class="{
          'cursor-pointer hover:bg-slate-100': goDetailItem
        }"
        @click="rowClick(row)"
      >
        <td
          v-for="item in row"
          :key="`${rowIndex}-${item.key}`"
        >
          {{ item.title }}
        </td>
        <td class="flex gap-3">
          <button
            v-if="editButtonVisible"
            class="button button--text"
            @click="$emit('edit', rows[rowIndex][0].title)"
          >
            <svg class="button__icon">
              <use xlink:href="@/assets/icons/sprites/buttons.svg#edit"></use>
            </svg>
            Редактировать
          </button>
          <button
            v-if="deleteButtonVisible"
            class="button button--text"
            @click="$emit('delete', rows[rowIndex][0].title)"
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
import { defineProps, defineEmits, computed } from 'vue';
import type { IColumn, TRows } from '@/entities/types/UI/table';

interface IProps {
  columns: IColumn[],
  rows: TRows[],
  deleteButtonVisible?: boolean,
  editButtonVisible?: boolean,
  goDetailItem?: (id: string | number) => void,
};

interface IEmits {
  (e: 'edit', id: string): void
  (e: 'delete', id: string): void
};

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const filteredRows = computed(() => {
  return props.rows.map(row => {
    return row.filter(cell => !cell.key.includes('_'));
  });
});

function rowClick(row: TRows) {
  if (typeof props.goDetailItem === 'function') {
    const idCell = row.find(cell => cell.key === 'id');

    if (idCell) {
      props.goDetailItem(idCell.title);
    }
  }
}
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
  white-space: break-spaces;
}

tbody th {
  font-weight: 500;
  color: var(--text-main);
}
</style>
