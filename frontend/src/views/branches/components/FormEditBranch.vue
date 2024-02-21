<template>
  <div class="flex w-full flex-col gap-3">
    <UIInput
      label="Название"
      v-model="branch.title"
      required
    />

    <UITextArea
      label="Описание"
      v-model="branch.description"
      required
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import type { IBranch } from '@/entities/types/backend/response/branches';
import type { Ref } from 'vue';
import UIInput from '@/components/ui/UIInput.vue';
import UITextArea from '@/components/ui/UITextArea.vue';

interface IProps {
  editedBranch: IBranch;
}

interface IEmits {
  (e: 'editBranch', user: IBranch): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const branch: Ref<IBranch> = ref(props.editedBranch);

watch(branch.value, newBranch => {
  emit('editBranch', newBranch);
});
</script>

<style scoped></style>
@/entities/types/backend/response/branches
