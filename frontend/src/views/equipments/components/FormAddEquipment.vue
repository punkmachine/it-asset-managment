<template>
  <div class="flex space-between gap-6 w-full">
    <div class="flex flex-col gap-3  w-full">
      <UIInput
        label="Название"
        v-model="equipment.name"
        required
      />

      <UIInput
        label="Материально-ответственное лицо"
        v-model="equipment.financiallyResponsiblePerson"
        required
      />

      <UIInput
        label="Получатель"
        v-model="equipment.recipient"
        required
      />

      <UITextArea
        label="Описание"
        v-model="equipment.description"
        required
      />
    </div>

    <div class="flex flex-col gap-3 w-full">
      <UIInput
        label="Ассет номер"
        v-model="equipment.assetNumber"
        required
      />

      <UIInput
        label="Инвентарный номер"
        v-model="equipment.inventoryNumber"
        required
      />

      <UIInput
        label="Серийный номер"
        v-model="equipment.serialNumber"
        required
      />

      <UIInput
        label="Номер накладной"
        v-model="equipment.invoiceNumber"
        required
      />

      <UISelect
        label="Филиал"
        v-model="equipment.branchId"
        :options="options"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue';
import type { Ref } from 'vue';
import type { IBranch } from '@/entities/types/backend/branches';
import type { INewEquipment } from '@/views/equipments/types';
import type { IOptions } from '@/entities/types/UI/select';
import UITextArea from '@/components/ui/UITextArea.vue';
import UIInput from '@/components/ui/UIInput.vue';
import UISelect from '@/components/ui/UISelect.vue';

interface IProps {
  addedEquipment: INewEquipment,
  branches: IBranch[],
};

interface IEmits {
  (e: 'updateAddedEquipment', equipment: INewEquipment): void,
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const equipment: Ref<INewEquipment> = ref(props.addedEquipment);
const options: Ref<IOptions[]> = ref([]);

watch(equipment.value, (newEquipment) => {
  emit('updateAddedEquipment', newEquipment);
});

onMounted(() => {
  options.value = props.branches.map(branch => {
    return {
      key: branch.id.toString(),
      title: branch.title,
    };
  });
});
</script>

<style scoped></style>
