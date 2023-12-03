<template>
  <div class="equipments">
    <HeadEquipmentsPage @addEquipment="handleAdd" />

    <div class="equipments__content">
      <SearchEquipments @searchInput="SearchEquipment" />

      <div class="divider"></div>

      <div class="equipments__table-wrapper">
        <UITable
          :columns="columns"
          :rows="rows"
          delete-button-visible
          @delete="handleDelete"
        />

        <div class="flex justify-end mt-5 mr-5">
          <UIPagination
            v-model:current-page="currentPage"
            v-model:visible-items="visibleTableItems"
            :count="rows.length"
          />
        </div>
      </div>

      <UIModal ref="deleteModal">
        <template #body>
          Вы точно хотите списать "{{ currentEquipment?.inventoryNumber }}"?
        </template>

        <template #footer>
          <DeleteModalFooter
            @cancel="deleteModal?.hide()"
            @delete="deleteEquipmentClick"
          />
        </template>
      </UIModal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { debounce } from "debounce";

import type { Ref } from 'vue';
import type { IEquipment } from '@/entities/types/backend/equipment';
import type { IColumn, TRows } from '@/entities/types/UI/table';
import type { IBranch } from '@/entities/types/backend/branches';

import UIPagination from '@/components/ui/UIPagination.vue';
import UITable from '@/components/ui/UITable.vue';
import UIModal from '@/components/ui/UIModal.vue';
import HeadEquipmentsPage from '@/views/equipments/components/HeadEquipmentsPage.vue';
import SearchEquipments from '@/views/equipments/components/SearchEquipments.vue';
import DeleteModalFooter from '@/views/equipments/components/DeleteModalFooter.vue';

import { fetchEquipments, deleteEquipment } from '@/api/equipments';
import { fetchBranches } from '@/api/branches';
import { getTableRows } from '@/utils/adapters/equipmentsAdapterFromTable';

import { useEscapeClick } from '@/vue-features/composables/useEscapeClick';

import { columnsSettings } from '@/views/equipments/settings';

const router = useRouter();

const deleteModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);

const currentEquipment: Ref<IEquipment | null> = ref(null);
const equipments: Ref<IEquipment[]> = ref([]);
const filteredEquipments: Ref<IEquipment[]> = ref([]);
const searchText: Ref<string> = ref('');
const branches: Ref<IBranch[]> = ref([]);
const currentPage: Ref<number> = ref(1);
const visibleTableItems: Ref<number> = ref(10);

const rows: Ref<TRows[]> = ref([]);
const columns: Ref<IColumn[]> = ref(columnsSettings);

function getCurrentEquipmentById(id: string): IEquipment | null {
  return equipments.value.find(equipment => equipment.id.toString() === id) ?? null;
}

function handleModalWrapper(modal: Ref<InstanceType<typeof UIModal> | null>, id: string | null): void {
  if (id) {
    currentEquipment.value = getCurrentEquipmentById(id);
  }

  if (modal.value) {
    addEventEscape();
    modal.value.show();
  }
}

function handleDelete(id: string) {
  handleModalWrapper(deleteModal, id);
}

function handleAdd() {
  router.push('/new-equipment');
}

function getEquipmentsAndRowsTable() {
  fetchEquipments()
    .then(data => {
      equipments.value = [...data];
      filteredEquipments.value = [...data];
      rows.value = getTableRows(filteredEquipments.value);
    });
}

function deleteEquipmentClick() {
  deleteEquipment()
    .then(() => {
      getEquipmentsAndRowsTable();
      currentEquipment.value = null;

      deleteModal.value?.hide();
    });
}

function keyDownEscape() {
  deleteModal.value?.hide();
}

function SearchEquipment(text: string) {
  searchText.value = text;
}

const { addEventEscape, removeEventEscape } = useEscapeClick(keyDownEscape);

const searchTextWatcher = debounce(() => {
  // @todo: запрос на бэкенд для поиска
}, 300);

watch(searchText, searchTextWatcher);

onMounted(() => {
  getEquipmentsAndRowsTable();

  fetchBranches()
    .then(data => {
      branches.value = [...data];
    });
});

onBeforeUnmount(() => {
  removeEventEscape();
});
</script>

<style scoped>
.equipments {
  /* 100vh - header height - search section - .equipments__head */
  --height-table-wrapper: calc(100vh - var(--header-height) - 74px - 72px);
}

.equipments__content {
  background-color: var(--bg-main);
}

.equipments__table-wrapper {
  position: relative;
  overflow-x: auto;
  padding-top: 12px;
  min-height: var(--height-table-wrapper);
  max-height: var(--height-table-wrapper);
  max-width: calc(100vw - var(--menu-width));
}
</style>
