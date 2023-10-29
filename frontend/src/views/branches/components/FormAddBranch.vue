<template>
  <div class="flex flex-col gap-3 w-full">
    <UIInput
      label="Название"
      v-model="addedBranch.title"
      required
    />

    <!-- @todo: textarea -->
    <UIInput
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
import UIInput from '@/components/ui/UIInput.vue';

interface IProps {
  addedBranch: INewBranch,
};

interface IEmits {
  (e: 'updateAddedBranch', user: INewBranch): void,
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const user: Ref<INewBranch> = ref(props.addedBranch);

watch(user.value, (newUser) => {
  emit('updateAddedBranch', newUser);
});
</script>

<style scoped></style>
