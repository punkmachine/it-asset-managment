<template>
  <div class="equipment">
    <div class="flex flex-col w-1/2">
      <EquipmentDataWrapper
        :data-items="dataItems"
        :equipment="equipment"
        @update-equipment-click="updateEquipmentClick"
      />
    </div>

    <div class="flex flex-col w-1/2">
      <div class="equipment__card">
        <div class="flex justify-between items-center px-4 pb-2">
          <h2 class="equipment__card-header">История</h2>

          <button
            class="button max-w-min"
            @click="exportHistory"
          >
            <svg class="button__icon">
              <use xlink:href="@/assets/icons/sprites/buttons.svg#export"></use>
            </svg>
            Экспорт
          </button>
        </div>
        <div class="equipment__card-divider"></div>

        <EquipmentHistoryList
          v-if="equipment"
          :history="history"
        />
      </div>

      <div class="equipment__card mt-6">
        <h2 class="equipment__card-header px-4 pb-2">Комментарии</h2>
        <div class="equipment__card-divider"></div>
        <EquipmentCommentList
          v-if="equipment"
          :comments="equipment.comments"
        />

        <EquipmentNewComment @fetch-equipment="getDataEquipment" />
      </div>
    </div>

    <UIModal ref="updateRecipientModal">
      <template #body>
        <div class="pb-3">
          <p class="text-center text-lg font-bold">Редактирование оборудования</p>
        </div>

        <div class="flex flex-col gap-2">
          <UIInput
            v-model="newData.recipient"
            label="Введите ФИО"
          />

          <UIInput
            v-model="newData.invoiceNumber"
            label="Номер накладной"
          />

          <UISelect
            v-model="newData.branch"
            label="Филиал"
            :options="branchesOptions"
          />

          <UISelect
            v-model="newData.state"
            label="Выберите статус"
            :options="statusOptions"
          />
        </div>
      </template>

      <template #footer>
        <div class="flex gap-2">
          <button
            class="button button--gray"
            @click="updateRecipientModal?.hide"
          >
            Отмена
          </button>
          <button
            class="button"
            @click="postNewHistory"
          >
            Сохранить
          </button>
        </div>
      </template>
    </UIModal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

import type { IDataItem } from '@/views/equipment/types';
import type { IOptions } from '@/entities/types/UI/select';

import { EquipmentState } from '@/entities/types/backend/response/equipment';

import { api } from '@/api';
import { useAdminsStore, useEquipmentStore } from '@/store';

import { generateDataItems } from '@/views/equipment/utils/getDataItems';

import UIInput from '@/components/ui/UIInput.vue';
import UIModal from '@/components/ui/UIModal.vue';
import UISelect from '@/components/ui/UISelect.vue';
import EquipmentNewComment from './components/EquipmentNewComment.vue'
import EquipmentCommentList from './components/EquipmentCommentList.vue';
import EquipmentDataWrapper from './components/EquipmentDataWrapper.vue';
import EquipmentHistoryList from './components/EquipmentHistoryList.vue';

interface INewData {
  recipient: string;
  branch: string;
  invoiceNumber: string;
  state: EquipmentState;
};

const route = useRoute();
const adminsStore = useAdminsStore();
const equipmentStore = useEquipmentStore();

const { equipment, history } = storeToRefs(equipmentStore)

const updateRecipientModal = ref<InstanceType<typeof UIModal> | null>(null);
const equipmentId = ref<string>(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id);

const newData = reactive<INewData>({
  recipient: '',
  branch: '',
  invoiceNumber: '',
  state: EquipmentState.active,
});

const statusOptions = ref<IOptions[]>([
  {
    key: EquipmentState.repaired,
    title: 'Ремонтируется',
  },
  {
    key: EquipmentState.exploited,
    title: 'Эксплуатируется',
  },
  {
    key: EquipmentState.deleted,
    title: 'Заблокированное'
  }
]);
const branchesOptions = ref<IOptions[]>([]);

let dataItems = ref<IDataItem[]>([]);

function getDataEquipment() {
  equipmentStore.fetchEquipment(equipmentId.value)
    .then(data => {
      dataItems.value = generateDataItems(data);
      newData.recipient = data.recipient;
      newData.state = data.state;
      newData.branch = data.branch._id;
      newData.invoiceNumber = data.invoiceNumber;
    });
}

function getDataBranches() {
  api.branches.fetchBranchesOptions()
    .then(data => {
      branchesOptions.value = data;
    });
}

function updateEquipmentClick() {
  updateRecipientModal.value?.show();
}

function getPayloadHistItem() {
  if (!equipment.value) return;

  return {
    assetNumber: equipment.value.assetNumber,
    inventoryNumber: equipment.value.inventoryNumber,
    name: equipment.value.name,
    description: equipment.value.description,
    serialNumber: equipment.value.serialNumber,
    financiallyResponsiblePerson: equipment.value.financiallyResponsiblePerson._id,
    invoiceNumber: newData.invoiceNumber,
    branch: newData.branch,
    state: newData.state,
    recipient: newData.recipient,
  };
}

function dataIsChanged() {
  if (!equipment.value) return false;

  const oldData = JSON.stringify({
    invoiceNumber: equipment.value.invoiceNumber,
    branch: equipment.value.branch._id,
    state: equipment.value.state,
    recipient: equipment.value.recipient,
  });

  const dataCandidate = JSON.stringify({
    invoiceNumber: newData.invoiceNumber,
    branch: newData.branch,
    state: newData.state,
    recipient: newData.recipient,
  });

  return oldData !== dataCandidate;
}

function postNewItemHistory() {
  if (!equipment.value) return;

  api.equipments
    .postEquipmentsHistory(equipment.value._id, {
      passedOn: adminsStore.currentAdminId,
      accepted: newData.recipient,
      branch: newData.branch,
      invoiceNumber: newData.invoiceNumber,
      equipmentState: newData.state,
    })
    .then(() => {
      equipmentStore.fetchHistory(equipmentId.value);
    });
}

function postNewHistory() {
  const payload = getPayloadHistItem();

  if (dataIsChanged() && payload) {
    api.equipments.updateEquipment(equipmentId.value, payload)
      .then(data => {
        equipment.value = data;
        dataItems.value = generateDataItems(equipment.value);

        postNewItemHistory();

        newData.recipient = '';
        newData.branch = '';
        newData.invoiceNumber = '';
        newData.state = EquipmentState.active;
        updateRecipientModal.value?.hide();
      });
  }
}

async function exportHistory() {
  if (!equipment.value?._id) return;

  const response = await api.equipments.downloadEquipmentHistoryExcel(equipment.value._id);

  const url = window.URL.createObjectURL(new Blob([response]));
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', `hist-${equipment.value._id}.xlsx`);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);
}

onMounted(() => {
  getDataEquipment();
  getDataBranches();
  equipmentStore.fetchHistory(equipmentId.value);
});
</script>

<style>
.equipment {
  display: flex;
  gap: 32px;
  width: calc(100vw - 128px);
  padding: 12px;
}

.equipment__card {
  position: relative;
  background-color: var(--bg-main);
  border-radius: 8px;
  padding: 12px 0;
}

.equipment__card-header {
  font-size: 18px;
  font-weight: 500;
}

.equipment__card-divider {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--border-standard);
}
</style>
