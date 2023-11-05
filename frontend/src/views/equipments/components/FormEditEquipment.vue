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
      <UISelect
        label="Филиал"
        v-model="branchId"
        :options="options"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue';
import type { IEquipment } from '@/entities/types/backend/equipment';
import type { IBranch } from '@/entities/types/backend/branches';
import type { Ref } from 'vue';
import type { IOptions } from '@/entities/types/UI/select';
import UIInput from '@/components/ui/UIInput.vue';
import UISelect from '@/components/ui/UISelect.vue';
import UITextArea from '@/components/ui/UITextArea.vue';

interface IProps {
  editedEquipment: IEquipment,
  branches: IBranch[],
};

interface IEmits {
  (e: 'editEquipment', user: IEquipment): void,
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const equipment: Ref<IEquipment> = ref(props.editedEquipment);
const branchId: Ref<string> = ref('');
const options: Ref<IOptions[]> = ref([]);

watch(equipment.value, (newEquipment) => {
  emit('editEquipment', newEquipment);
});

watch(branchId, (newBranchId) => {
  const newBranch = props.branches.find(item => item.id.toString() === newBranchId);

  if (newBranch) {
    equipment.value.branch = newBranch;
  }
});

onMounted(() => {
  options.value = props.branches.map(branch => {
    return {
      key: branch.id.toString(),
      title: branch.title,
    };
  });

  branchId.value = equipment.value.branch.id.toString();
});
</script>

<style scoped></style>
