<template>
  <div class="equipment">
    <div class="flex flex-col w-6/10">
      <EquipmentDataWrapper
        :data-items="dataItems"
        :equipment="equipment"
        @update-recipient-click="updateRecipientClick"
      />
    </div>

    <div class="flex flex-col w-4/10">
      <div class="equipment__card">
        <h2 class="equipment__card-header px-4 pb-2">История</h2>
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
          <p class="text-center text-lg font-bold">Назначение получателя</p>
        </div>

        <UIInput
          v-model="newRecipient"
          label="Введите ФИО"
        />
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
            @click="postNewRecipient"
          >
            Добавить
          </button>
        </div>
      </template>
    </UIModal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

import type { Ref } from 'vue';
import type { IDataItem } from '@/views/equipment/types';

import { api } from '@/api';
import { useAdminsStore, useEquipmentStore } from '@/store';

import { generateDataItems } from '@/views/equipment/utils/getDataItems';

import UIInput from '@/components/ui/UIInput.vue';
import UIModal from '@/components/ui/UIModal.vue';
import EquipmentNewComment from './components/EquipmentNewComment.vue'
import EquipmentCommentList from './components/EquipmentCommentList.vue';
import EquipmentDataWrapper from './components/EquipmentDataWrapper.vue';
import EquipmentHistoryList from './components/EquipmentHistoryList.vue';

const route = useRoute();
const adminsStore = useAdminsStore();
const equipmentStore = useEquipmentStore();

const { equipment, history } = storeToRefs(equipmentStore)

const updateRecipientModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);
const newRecipient: Ref<string> = ref('');
const equipmentId: Ref<string> = ref(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id);
let dataItems: Ref<IDataItem[]> = ref([]);

function getDataEquipment() {
  equipmentStore.fetchEquipment(equipmentId.value)
    .then(data => {
      dataItems.value = generateDataItems(data);
    });
}

function updateRecipientClick() {
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
    invoiceNumber: equipment.value.invoiceNumber,
    branch: equipment.value.branch._id,
    state: equipment.value.state,
    recipient: newRecipient.value,
  };
}

function postNewItemHistory() {
  if (!equipment.value) return;

  api.equipments
    .postEquipmentsHistory(equipment.value._id, {
      passedOn: adminsStore.currentAdminId,
      accepted: newRecipient.value,
    })
    .then(() => {
      equipmentStore.fetchHistory(equipmentId.value);
    });
}

function postNewRecipient() {
  const payload = getPayloadHistItem();

  if (newRecipient.value && payload) {
    api.equipments.updateEquipment(equipmentId.value, payload)
      .then(data => {
        equipment.value = data;
        dataItems.value = generateDataItems(equipment.value);

        postNewItemHistory();

        newRecipient.value = '';
        updateRecipientModal.value?.hide();
      });
  }
}

onMounted(() => {
  getDataEquipment();
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
