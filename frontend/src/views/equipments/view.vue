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
          :loading="loading"
          delete-button-visible
          @delete="handleDelete"
        />

        <div class="mx-5 mt-5 flex justify-between">
          <p>
            Всего: {{ totalCount }}
          </p>

          <UIPagination
            v-model:current-page="currentPage"
            v-model:visible-items="visibleTableItems"
            :total-pages="totalPages"
            :count="totalCount"
          />
        </div>
      </div>

      <UIModal ref="deleteModal">
        <template #body>Вы точно хотите списать "{{ currentEquipment?.inventoryNumber }}"?</template>

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
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter } from 'vue-router';

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
import { useSearch } from '@/vue-features/composables/useSearch';

import { columnsSettings } from '@/views/equipments/settings';
import { api } from '@/api';

const router = useRouter();

const { searchText, setSearchText: searchEquipment } = useSearch(requestSearch, clearSearch);
const { addEventEscape, removeEventEscape } = useEscapeClick(keyDownEscape);

const deleteModal = ref<InstanceType<typeof UIModal> | null>(null);

const currentEquipment = ref<IEquipment | null>(null);
const equipments = ref<IEquipment[]>([]);
const loading = ref<boolean>(false);
const filteredEquipments = ref<IEquipment[]>([]);
const branches = ref<IBranch[]>([]);

const currentPage = ref<number>(1);
const visibleTableItems = ref<number>(10);
const totalPages = ref<number>(0);
const totalCount = ref<number>(0);

const rows = ref<TRows[]>([]);
const columns = ref<IColumn[]>(columnsSettings);

watch(() => visibleTableItems.value, () => {
  getEquipmentsRowsTable();
});

watch(() => currentPage.value, () => {
  getEquipmentsRowsTable();
});

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

function setInitialData(data: IEquipment[], rewriteBaseList: boolean = true) {
  if (rewriteBaseList) {
    equipments.value = [...data];
  }

  filteredEquipments.value = [...data];
  rows.value = getTableRows(filteredEquipments.value);
}

function getEquipmentsRowsTable() {
  const query = {
    page: currentPage.value,
    limit: visibleTableItems.value,
  };

  loading.value = true;
  api.equipments
    .fetchEquipments(query)
    .then(data => {
      setInitialData(data.data);
      totalPages.value = data.totalPages;
      totalCount.value = data.totalCount;
    })
    .finally(() => {
      loading.value = false;
    });
}

function updateTargetEquipment(data: IEquipment) {
  equipments.value = equipments.value.map(equipment => {
    if (equipment._id === data._id) {
      return {
        ...data,
      };
    }

    return equipment;
  });
}

function deleteEquipmentClick() {
  if (currentEquipment.value) {
    api.equipments
      .deleteEquipment(currentEquipment.value._id)
      .then(data => {
        updateTargetEquipment(data);
        setInitialData(equipments.value, false);
        currentEquipment.value = null;

        deleteModal.value?.hide();
      })
  }
}

function keyDownEscape() {
  deleteModal.value?.hide();
}

function goDetailEquipment(id: string) {
  router.push(`/equipment/${id}`);
}

function handleXLSXAdd(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  api.equipments
    .createEquipments(formData)
    .then(data => {
      equipments.value.push(...data);
      filteredEquipments.value = [...equipments.value];
      rows.value = getTableRows(filteredEquipments.value);
    })
}

function requestSearch() {
  const query = {
    searchText: searchText.value,
    page: currentPage.value,
    limit: visibleTableItems.value,
  };

  loading.value = true;
  api.equipments
    .searchEquipment(query)
    .then(data => {
      setInitialData(data.data);
      totalPages.value = data.totalPages;
      totalCount.value = data.totalCount;
    })
    .finally(() => {
      loading.value = false;
    });
}

function clearSearch() {
  getEquipmentsRowsTable();
}

onMounted(() => {
  getEquipmentsRowsTable();

  api.branches.fetchBranches().then(data => {
    branches.value = [...data.data];
  });
});

onBeforeUnmount(() => {
  removeEventEscape();
});
</script>

<style scoped>
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
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: 16px;
}
</style>
