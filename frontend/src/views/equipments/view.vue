<template>
  <div class="equipments">
    <HeadEquipmentsPage
      @addEquipment="handleAdd"
      @addEquipmentsXLSX="handleXLSXAdd"
    />

    <div class="equipments__content">
      <SearchEquipments @searchInput="searchEquipment" />

      <div class="divider"></div>

      <div class="equipments__table-wrapper">
        <UITable
          :columns="columns"
          :rows="rows"
          :go-detail-item="goDetailEquipment"
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
import * as xlsx from 'xlsx';

import type { Ref } from 'vue';
import type { IEquipment } from '@/entities/types/backend/response/equipment';
import type { IColumn, TRows } from '@/entities/types/UI/table';
import type { IBranch } from '@/entities/types/backend/response/branches';

import UIPagination from '@/components/ui/UIPagination.vue';
import UITable from '@/components/ui/UITable.vue';
import UIModal from '@/components/ui/UIModal.vue';
import HeadEquipmentsPage from '@/views/equipments/components/HeadEquipmentsPage.vue';
import SearchEquipments from '@/views/equipments/components/SearchEquipments.vue';
import DeleteModalFooter from '@/views/equipments/components/DeleteModalFooter.vue';

import { getTableRows } from '@/utils/adapters/equipmentsAdapterFromTable';

import { useEscapeClick } from '@/vue-features/composables/useEscapeClick';

import { columnsSettings } from '@/views/equipments/settings';
import { api } from '@/api';

const router = useRouter();

const deleteModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);

const currentEquipment: Ref<IEquipment | null> = ref(null);
const equipments: Ref<IEquipment[]> = ref([]);
const equipmentsBackup: Ref<IEquipment[]> = ref([]);
const filteredEquipments: Ref<IEquipment[]> = ref([]);
const searchText: Ref<string> = ref('');
const branches: Ref<IBranch[]> = ref([]);
const currentPage: Ref<number> = ref(1);
const visibleTableItems: Ref<number> = ref(10);

const rows: Ref<TRows[]> = ref([]);
const columns: Ref<IColumn[]> = ref(columnsSettings);

function getCurrentEquipmentById(id: string): IEquipment | null {
  return equipments.value.find(equipment => equipment._id === id) ?? null;
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
  api.equipments.fetchEquipments()
    .then(data => {
      equipments.value = [...data];
      filteredEquipments.value = [...data];
      rows.value = getTableRows(filteredEquipments.value);
    })
    .catch(error => {
      console.log('error >>>', error);
    });
}

function deleteEquipmentClick() {
  if (currentEquipment.value) {
    api.equipments.deleteEquipment(currentEquipment.value._id)
      .then(data => {
        equipments.value = equipments.value.map(equipment => {
          if (equipment._id === data._id) {
            return {
              ...data,
            };
          }

          return equipment;
        });
        filteredEquipments.value = [...equipments.value];
        rows.value = getTableRows(filteredEquipments.value);

        currentEquipment.value = null;
        deleteModal.value?.hide();
      })
      .catch(error => {
        console.log('error >>>', error);
      });
  }
}

function keyDownEscape() {
  deleteModal.value?.hide();
}

function searchEquipment(text: string) {
  searchText.value = text;
}

function goDetailEquipment(id: string) {
  router.push(`/equipment/${id}`);
}

function handleXLSXAdd(file: File) {
  const reader = new FileReader();

  reader.onload = (event: ProgressEvent<FileReader>) => {
    const data = new Uint8Array((event.target as FileReader).result as ArrayBuffer);
    const xlsxData = xlsx.read(data, { type: 'array' });
    const firstSheetName = xlsxData.SheetNames[0];
    const sheet = xlsxData.Sheets[firstSheetName];
    const result = xlsx.utils.sheet_to_json(sheet);

     // @ts-ignore-next-line
     api.equipments.createEquipments(result)
      .then(data => {
        equipments.value.push(...data);
        filteredEquipments.value = [...equipments.value];
        rows.value = getTableRows(filteredEquipments.value);
      })
      .catch(error => {
        console.log('error >>>', error);
      });
  }

  reader.readAsArrayBuffer(file);
}

const { addEventEscape, removeEventEscape } = useEscapeClick(keyDownEscape);

const searchTextWatcher = debounce(() => {
  if (searchText.value.length > 3) {
    equipmentsBackup.value = [...equipments.value];

    api.equipments.searchEquipment({ searchText: searchText.value })
      .then(data => {
        equipments.value = [...data];
        filteredEquipments.value = [...data];
        rows.value = getTableRows(filteredEquipments.value);
      })
      .catch(error => {
        console.log('error >>>', error);
      });
  } else {
    equipments.value = [...equipmentsBackup.value];
    filteredEquipments.value = [...equipmentsBackup.value];
    rows.value = getTableRows(filteredEquipments.value);
  }
}, 1000);

watch(searchText, searchTextWatcher);

onMounted(() => {
  getEquipmentsAndRowsTable();

  api.branches.fetchBranches()
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
