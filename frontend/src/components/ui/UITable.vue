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
          class="flex justify-end"
        >
          Действие
        </th>
      </tr>
    </thead>
    <tbody v-if="rows.length && !loading">
      <tr
        v-for="(row, rowIndex) in filteredRows"
        :key="rowIndex"
        :class="{
          'cursor-pointer hover:bg-slate-100': goDetailItem,
        }"
        @click="rowClick(row)"
      >
        <td
          v-for="item in row"
          :key="`${rowIndex}-${item.key}`"
        >
          {{ item.title }}
        </td>
        <td class="flex justify-end gap-3">
          <button
            v-if="editButtonVisible && getRowState(rows[rowIndex]) !== 'Заблокирован'"
            class="button button--text"
            @click="$emit('edit', rows[rowIndex][0].title)"
          >
            <svg class="button__icon">
              <use xlink:href="@/assets/icons/sprites/buttons.svg#edit"></use>
            </svg>
            Редактировать
          </button>
          <button
            v-if="deleteButtonVisible && getRowState(rows[rowIndex]) !== 'Заблокирован'"
            class="button button--text"
            @click="$emit('delete', rows[rowIndex][0].title)"
          >
            <svg class="button__icon">
              <use xlink:href="@/assets/icons/sprites/buttons.svg#delete"></use>
            </svg>
            Заблокировать
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <UILoader v-if="loading" />
  <div v-if="!rows.length && !loading">
    <div class="flex flex-col items-center justify-center">
      <div class="mb-2">
        <img
          class="w-16 h-16"
          src="@/assets/icons/db-empty.svg"
          alt=""
        />
      </div>
      <p>
        База данных {{ readableLocation }} пуста
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';
import { useRoute } from 'vue-router';
import type { IColumn, TRows } from '@/entities/types/UI/table';
import UILoader from '@/components/ui/UILoader.vue';

interface IProps {
  columns: IColumn[];
  rows: TRows[];
  deleteButtonVisible?: boolean;
  editButtonVisible?: boolean;
  loading: boolean,
  goDetailItem?: (id: string) => void;
}

interface IEmits {
  (e: 'edit', id: string): void;
  (e: 'delete', id: string): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();
const route = useRoute();

const filteredRows = computed(() => {
  return props.rows.map(row => {
    return row.filter(cell => !cell.key.includes('_'));
  });
});

const readableLocation = computed(() => {
  const dict = {
    '/admins': 'администраторов',
    '/branches': 'филиалов',
    '/': 'оборудования',
    default: '',
  };

  return dict[route.path] ? dict[route.path] : dict.default;
});

function rowClick(row: TRows) {
  if (typeof props.goDetailItem === 'function') {
    const numberRow = row.find(cell => cell.key === 'number')?.title;

    if (numberRow && !Number.isNaN(numberRow)) {
      const idCell = props.rows[Number(numberRow) - 1].find(cell => cell.key === '_id')?.title;

      if (idCell) {
        props.goDetailItem(idCell);
      }
    }
  }
}

function getRowState(row: TRows) {
  return row.find(cell => cell.key === 'state')?.title;
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

tbody td,
tbody th {
  padding: 16px 24px;
  white-space: break-spaces;
}

tbody th {
  font-weight: 500;
  color: var(--text-main);
}
</style>
