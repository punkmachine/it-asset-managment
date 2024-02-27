import { ref, computed } from 'vue';

import type { Ref } from 'vue';
import type { IEquipment, IHistoryItem } from '@/entities/types/backend/response/equipment';

import { defineStore } from 'pinia';

import { api } from '@/api';

export const useEquipmentStore = defineStore('equipment', () => {
  const equipment: Ref<IEquipment | null> = ref(null);
  const history: Ref<IHistoryItem[]> = ref([]);

  function fetchEquipment(id: string): Promise<IEquipment> {
    return api.equipments.getEquipmentById(id)
      .then(data => {
        equipment.value = data;

        return data;
      });
  }

  function fetchHistory(id: string) {
    api.equipments.getEquipmentsHistory(id)
      .then(data => {
        history.value = data;
      });
  }

  const commentsEquipment = computed(() => equipment.value?.comments || []);

  return {
    equipment, history,
    fetchEquipment, fetchHistory,
    commentsEquipment,
  };
});
