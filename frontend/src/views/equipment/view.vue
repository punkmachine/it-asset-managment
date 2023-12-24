<template>
  <div class="equipment">
    <div class="equipment-col w-6/10">
      <div class="equipment__card">
        <h2 class="equipment__card-header">Данные</h2>
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
        <h2 class="equipment__card-header">История</h2>
        <div class="equipment__card-divider"></div>

        <div v-if="equipment" class="equipment__history">
          <div
            v-for="historyItem in equipment.history"
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
        <h2 class="equipment__card-header">Комментарии</h2>
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
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import type { IEquipment } from '@/entities/types/backend/equipment';
import type { IDataItem } from '@/views/equipment/types';
import { TimeFormatDict } from '@/utils/helpers/date';

import { getEquipmentById } from '@/api/equipments';

import { generateDataItems } from '@/views/equipment/utils/getDataItems';

import { getFormatDate } from '@/utils/helpers/date';

const route = useRoute();

const equipment: Ref<IEquipment | null> = ref(null);
let dataItems: Ref<IDataItem[]> = ref([]);

onMounted(() => {
  // @ts-ignore-next-line
  getEquipmentById(route.params.id)
    .then(data => {
      equipment.value = data;
    })
    .then(() => {
      if (equipment.value) {
        dataItems.value = generateDataItems(equipment.value);
      }
    });
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
  padding: 0 16px 8px 16px;
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
</style>
