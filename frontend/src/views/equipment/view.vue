<template>
  <div class="equipment">
    <div class="equipment-col w-6/10">
      <div class="equipment__card">
        <div class="flex justify-between items-center pb-2 px-4">
          <h2 class="equipment__card-header">Данные</h2>

          <button
            class="button !w-auto"
            @click="updateRecipientClick"
          >
            {{ equipment?.recipient ? 'Переназначить' : 'Назначить' }}
          </button>
        </div>
        <div class="equipment__card-divider"></div>

        <div v-if="equipment" class="equipment__data">
          <div
            v-for="(item, index) in dataItems"
            :key="index"
            class="equipment__data-item"
          >
            <span>{{ item.title }}</span>
            <span>{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="equipment-col w-4/10">
      <div class="equipment__card">
        <h2 class="equipment__card-header pb-2 px-4">История</h2>
        <div class="equipment__card-divider"></div>

        <div v-if="equipment" class="equipment__history">
          <div
            v-for="historyItem in history"
            :key="`h${historyItem}`"
            class="equipment__history-item"
          >
            <span>{{ getFormatDate(historyItem.date, TimeFormatDict.FullDateLongMonth) }}</span>
            <span>{{ historyItem.accepted }}</span>
            <span>{{ `${historyItem.passedOn.firstName} ${historyItem.passedOn.lastName}` }}</span>
          </div>
        </div>
      </div>

      <div class="equipment__card mt-6">
        <h2 class="equipment__card-header pb-2 px-4">Комментарии</h2>
        <div class="equipment__card-divider"></div>
        <div v-if="equipment" class="equipment__comments">
          <div
            v-for="(comment, index) in equipment.comments"
            :key="`comment-${index}`"
            class="equipment__comment"
          >
            <img
              src="@/assets/icons/comment.svg"
              alt=""
              aria-hidden
              class="equipment__comment-icon"
            >
            <span>{{ comment }}</span>
          </div>
        </div>

        <div class="equipment__new-comment">
          <UITextArea
            v-model="newComment"
            placeholder="Ваш комментарий"
            height-mini
          />
          <button
            class="button"
            @click="addComment"
          >
            <svg class="button__icon">
              <use xlink:href="@/assets/icons/sprites/buttons.svg#add"></use>
            </svg>
            Добавить
          </button>
        </div>
      </div>
    </div>

    <UIModal ref="updateRecipientModal">
      <template #body>
        <div class="pb-3">
          <p class="font-bold text-lg text-center">
            Назначение получателя
          </p>
        </div>

        <UIInput
          v-model="newRecipient"
          label="Введите ФИО"
        />
      </template>

      <template #footer>
        <div class="flex gap-2">
          <button class="button button--gray" @click="updateRecipientModal?.hide">
            Отмена
          </button>
          <button class="button" @click="postNewRecipient">
            Добавить
          </button>
        </div>
      </template>
    </UIModal>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import type { IEquipment, IHistoryItem } from '@/entities/types/backend/response/equipment';
import type { IDataItem } from '@/views/equipment/types';
import { TimeFormatDict } from '@/utils/helpers/date';

import { api } from '@/api';

import { useUsersStore } from '@/store';

import { generateDataItems } from '@/views/equipment/utils/getDataItems';

import UITextArea from '@/components/ui/UITextArea.vue';
import UIInput from '@/components/ui/UIInput.vue';
import UIModal from '@/components/ui/UIModal.vue';

import { getFormatDate } from '@/utils/helpers/date';

const route = useRoute();

const usersStore = useUsersStore();

const updateRecipientModal: Ref<InstanceType<typeof UIModal> | null> = ref(null);

const equipment: Ref<IEquipment | null> = ref(null);
const history: Ref<IHistoryItem[]> = ref([]);

const newComment: Ref<string> = ref('');
const newRecipient: Ref<string> = ref('');

let dataItems: Ref<IDataItem[]> = ref([]);

function fetchEquipment() {
  // @ts-ignore-next-line
  api.equipments.getEquipmentById(route.params.id)
    .then(data => {
      equipment.value = data;
      dataItems.value = generateDataItems(equipment.value);
    })
    .catch(error => {
      console.log('error >>>', error);
    });
}

function fetchHistory() {
  // @ts-ignore-next-line
  api.equipments.getEquipmentsHistory(route.params.id)
    .then(data => {
      history.value = data;
    })
    .catch(error => {
      console.log('error >>>', error);
    });
}

function addComment() {
  if (newComment.value) {
    // @ts-ignore-next-line
    api.equipments.commentEquipment(route.params.id, { text: newComment.value, })
      .then(() => {
        fetchEquipment();
        newComment.value = '';
      })
      .catch(error => {
        console.log('error >>>', error);
      });
  }
}

function updateRecipientClick() {
  updateRecipientModal.value?.show();
}

function postNewRecipient() {
  if (newRecipient.value) {
    // @ts-ignore-next-line
    api.equipments.updateEquipment(route.params.id, {
      ...equipment.value,
      recipient: newRecipient.value,
    })
      .then(data => {
        equipment.value = data;
        dataItems.value = generateDataItems(equipment.value);

        api.equipments.postEquipmentsHistory(equipment.value._id, {
          passedOn: usersStore.currentUserId,
          accepted: newRecipient.value,
        })
          .then(fetchHistory)
          .catch(error => {
            console.log('error >>>', error);
          });

        newRecipient.value = '';
        updateRecipientModal.value?.hide();
      })
      .catch(error => {
        console.log('error >>>', error);
      });
  }
}

onMounted(() => {
  fetchEquipment();
  fetchHistory();
});
</script>

<style scoped>
.equipment {
  display: flex;
  gap: 32px;
  width: calc(100vw - 128px);
  padding: 12px;
}

.equipment-col {
  display: flex;
  flex-direction: column;
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

.equipment__data {
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.equipment__data-item {
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid var(--border-secondary);
  padding: 0 16px 4px 16px;
  text-wrap: balance;
}

.equipment__data-item:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.equipment__comments {
  padding-top: 8px;
}

.equipment__comment {
  padding: 4px 16px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.equipment__comment:last-child {
  padding-bottom: 0;
}

.equipment__comment-icon {
  width: 20px;
  height: 20px;
  padding-top: 4px;
}

.equipment__history {
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.equipment__history-item {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid var(--border-secondary);
  padding: 0 16px 4px 16px;
}

.equipment__history-item:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.equipment__new-comment {
  padding: 16px 16px 0 16px;
  display: flex;
  gap: 8px;
}

.equipment__new-comment > label {
  width: 100%;
}

.equipment__new-comment > button {
  width: auto;
}
</style>
