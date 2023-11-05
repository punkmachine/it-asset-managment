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
          actions-col-visible
          @edit="handleEdit"
          @delete="handleDelete"
        />

        <div class="flex justify-end mt-5 mr-5">
          <UIPagination :count="rows.length" />
        </div>
      </div>

      <UIModal ref="deleteModal">
        <template #body>
          Вы точно хотите удалить сотрудника "{{ currentEquipment?.inventoryNumber }}"?
        </template>

        <template #footer>
          <DeleteModalFooter
            @cancel="deleteModal?.hide()"
            @delete="deleteEquipmentClick"
          />
        </template>
      </UIModal>

      <UIModal
        ref="editModal"
        double-columns
      >
        <template #body>
          <h2 class="equipments__modal-title">
            Редактирование филиала "{{ currentEquipment?.inventoryNumber }}"
          </h2>
          <!--
            @todo: костыль с currentEquipment, потому что он технически может быть null,
            но физически в этой форме ну реально никак, а TS ругается
          -->
          <form v-if="currentEquipment">
            <FormEditEquipment
              :edited-equipment="currentEquipment"
              :branches="branches"
              @edit-equipment="(newEquipment) => currentEquipment = newEquipment"
            />
          </form>
        </template>

        <template #footer>
          <EditModalFooter
            @cancel="editModal?.hide()"
            @save="saveEditEquipmentClick"
          />
        </template>
      </UIModal>

      <UIModal
        ref="addModal"
        double-columns
      >
        <template #body>
          <h2 class="equipments__modal-title">
            Создание филиала
          </h2>
          <form>
            <FormAddEquipment
              :added-equipment="newEquipment"
              :branches="branches"
              @updateAddedEquipment="(equipment) => newEquipment = equipment"
            />
          </form>
        </template>

        <template #footer>
          <AddModalFooter
            @cancel="addModal?.hide()"
            @add="saveAddEquipmentClick"
          />
        </template>
      </UIModal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { debounce } from "debounce";

import type { Ref } from 'vue';
import type { IEquipment } from '@/entities/types/backend/equipment';
import type { IColumn, TRows } from '@/entities/types/UI/table';
import type { INewEquipment } from './types';
import type { IBranch } from '@/entities/types/backend/branches';

import UIPagination from '@/components/ui/UIPagination.vue';
import UITable from '@/components/ui/UITable.vue';
import UIModal from '@/components/ui/UIModal.vue';
import HeadEquipmentsPage from '@/views/equipments/components/HeadEquipmentsPage.vue';
import SearchEquipments from '@/views/equipments/components/SearchEquipments.vue';
import DeleteModalFooter from '@/views/equipments/components/DeleteModalFooter.vue';
import FormEditEquipment from '@/views/equipments/components/FormEditEquipment.vue';
import EditModalFooter from '@/views/equipments/components/EditModalFooter.vue';
import AddModalFooter from '@/views/equipments/components/AddModalFooter.vue';
import FormAddEquipment from '@/views/equipments/components/FormAddEquipment.vue';

import {
  fetchEquipments,
  deleteEquipment,
  editEquipment,
  postEquipment
} from '@/api/equipments';
import { fetchBranches } from '@/api/branches';
import { getTableRows } from '@/utils/adapters/equipmentsAdapterFromTable';
import { includesText } from '@/utils/helpers/search';

import { useEscapeClick } from '@/vue-features/composables/useEscapeClick';

import { columnsSettings, initialEquipment } from '@/views/equipments/settings';

const deleteModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);
const editModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);
const addModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);

const currentEquipment: Ref<IEquipment | null> = ref(null);
const equipments: Ref<IEquipment[]> = ref([]);
const filteredEquipments: Ref<IEquipment[]> = ref([]);
const newEquipment: Ref<INewEquipment> = ref({ ...initialEquipment });
const searchText: Ref<string> = ref('');
const branches: Ref<IBranch[]> = ref([]);

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

function handleEdit(id: string) {
  handleModalWrapper(editModal, id);
}

function handleAdd() {
  handleModalWrapper(addModal, null);
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

function saveEditEquipmentClick() {
  if (currentEquipment.value) {
    editEquipment(currentEquipment.value)
      .then(data => {
        equipments.value = equipments.value.map(equipment => {
          if (equipment.id === data.id) {
            return {
              ...data,
            };
          }

          return equipment;
        });

        editModal.value?.hide();
      });
  }
}

function saveAddEquipmentClick() {
  postEquipment(newEquipment.value)
    .then(data => {
      equipments.value = [
        ...equipments.value,
        data
      ];

      rows.value = getTableRows(equipments.value);
      newEquipment.value = { ...initialEquipment };

      addModal.value?.hide();
    });
}

function keyDownEscape() {
  deleteModal.value?.hide();
  editModal.value?.hide();
  addModal.value?.hide();
}

function SearchEquipment(text: string) {
  searchText.value = text;
}

const { addEventEscape, removeEventEscape } = useEscapeClick(keyDownEscape);

function searchTextInEquipment(equipment: IEquipment): boolean {
  const text = searchText.value.toLowerCase();
  const items = [
    equipment.name, equipment.description, equipment.assetNumber, equipment.serialNumber,
    equipment.financiallyResponsiblePerson, equipment.id.toString(),
    equipment.inventoryNumber, equipment.invoiceNumber, equipment.recipient,
  ];

  return !!items.find(item => includesText(item, text));
}

const searchTextWatcher = debounce(() => {
  if (searchText.value) {
    filteredEquipments.value = equipments.value.filter(searchTextInEquipment);
  } else {
    filteredEquipments.value = [...equipments.value];
  }

  rows.value = getTableRows(filteredEquipments.value);
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

.equipments__modal-title {
  margin-bottom: 12px;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
}
</style>
