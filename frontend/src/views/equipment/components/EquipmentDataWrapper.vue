<template>
  <div class="equipment__card">
    <div class="flex items-center justify-between px-4 pb-2">
      <h2 class="equipment__card-header">Данные</h2>

      <button
        class="button !w-auto"
        @click="$emit('updateRecipientClick')"
      >
        {{ equipment?.recipient ? 'Переназначить' : 'Назначить' }}
      </button>
    </div>
    <div class="equipment__card-divider"></div>

    <EquipmentDataTable
      v-if="equipment"
      :data-items="dataItems"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

import type { IDataItem } from '@/views/equipment/types';
import type { IEquipment } from '@/entities/types/backend/response/equipment';

import EquipmentDataTable from './EquipmentDataTable.vue';

interface IProps {
  dataItems: IDataItem[],
  equipment: IEquipment | null,
}

interface IEmits {
  (e: 'updateRecipientClick'): void;
}

defineProps<IProps>();
defineEmits<IEmits>();
</script>
