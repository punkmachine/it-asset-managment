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
        v-for="(row, rowIndex) in rows"
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
            @click="$emit('edit', row[0].title)"
          >
            <svg class="button__icon">
              <use xlink:href="@/assets/icons/sprites/buttons.svg#edit"></use>
            </svg>
            Редактировать
          </button>
          <button
            v-if="deleteButtonVisible"
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
import type { IColumn, TRows, ICell } from '@/entities/types/UI/table';

interface IProps {
  columns: IColumn[],
  rows: TRows[],
  deleteButtonVisible?: boolean,
  editButtonVisible?: boolean,
  goDetailItem?: () => void,
};

interface IEmits {
  (e: 'edit', id: string): void
  (e: 'delete', id: string): void
};

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

function rowClick(row: TRows) {
  console.log(JSON.parse(JSON.stringify(row)));

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
  white-space: nowrap;
}

tbody th {
  font-weight: 500;
  color: var(--text-main);
}
</style>
