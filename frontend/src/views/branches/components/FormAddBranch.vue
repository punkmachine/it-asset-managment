<template>
  <div class="flex w-full flex-col gap-3">
    <UIInput
      label="Название"
      v-model="addedBranch.title"
      required
    />

    <UITextArea
      label="Описание"
      v-model="addedBranch.description"
      required
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import type { Ref } from 'vue';
import type { INewBranch } from '@/views/branches/types';
import UITextArea from '@/components/ui/UITextArea.vue';
import UIInput from '@/components/ui/UIInput.vue';

interface IProps {
  addedBranch: INewBranch;
}

interface IEmits {
  (e: 'updateAddedBranch', branch: INewBranch): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const branch: Ref<INewBranch> = ref(props.addedBranch);

watch(branch.value, newBranch => {
  emit('updateAddedBranch', newBranch);
});
</script>

<style scoped></style>
