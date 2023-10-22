<template>
  <div class="users">
    <div class="users__head">
      <h1 class="users__title">
        Пользователи
      </h1>
      <div class="flex gap-2">
        <button class="button">
          <svg class="button__icon">
            <use xlink:href="@/assets/icons/sprites/buttons.svg#add"></use>
          </svg>
          <span>
            Добавить
          </span>
        </button>
      </div>
    </div>

    <div class="users__content">
      <div class="px-5 py-4">
        <div class="relative w-60">
          <input
            type="text"
            class="input input--with-icon"
            placeholder="Поиск..."
          />
          <svg class="input__icon">
            <use xlink:href="@/assets/icons/sprites/inputs.svg#search"></use>
          </svg>
        </div>
      </div>

      <div class="divider"></div>

      <div class="users__table-wrapper">
        <UITable
          :columns="columns"
          :rows="rows"
          actions-col-visible
          @edit="handleEdit"
          @delete="handleDelete"
        />

        <div class="flex justify-end mt-5 mr-5">
          <UIPagination
            :count="rows.length"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue'

import type { IColumn, TRows } from '@/entities/types/UI/table';

import UIPagination from '@/components/ui/UIPagination.vue';
import UITable from '@/components/ui/UITable.vue';

const columns: Ref<IColumn[]> = ref([
  { key: 'id', title: 'id', width: '120px' },
  { key: 'FIO', title: 'ФИО' },
]);

const rows: Ref<TRows[]> = ref([
  [
    { key: 'id', title: '1', },
    { key: 'FIO', title: 'Бурленхан Алмас' }
  ],
  [
    { key: 'id', title: '2' },
    { key: 'FIO', title: 'Рассудихин Александр' }
  ],
]);

function handleEdit(id: string): void {
  console.log('id >>>', id);
}

function handleDelete(id: string): void {
  console.log('id >>>', id);
}
</script>

<style scoped>
.users {
  /* 100vh - header height - search section - .users__head */
  --height-table-wrapper: calc(100vh - var(--header-height) - 74px - 72px);
}

.users__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
}

.users__title {
  font-size: 22px;
  font-weight: 600;
}

.users__content {
  background-color: var(--bg-main);
}

.users__table-wrapper {
  position: relative;
  overflow-x: auto;
  padding-top: 12px;
  min-height: var(--height-table-wrapper);
  max-height: var(--height-table-wrapper);
  max-width: calc(100vw - var(--menu-width));
}
</style>
