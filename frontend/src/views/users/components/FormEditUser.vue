<template>
  <div class="flex w-full flex-col gap-3">
    <UIInput
      label="Имя"
      v-model="user.firstName"
      required
      autocomplete="name"
    />

    <UIInput
      label="Фамилия"
      v-model="user.lastName"
      required
      autocomplete="family-name"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import type { IUser } from '@/entities/types/backend/response/user';
import type { Ref } from 'vue';
import UIInput from '@/components/ui/UIInput.vue';

interface IProps {
  editedUser: IUser;
}

interface IEmits {
  (e: 'editUser', user: IUser): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const user: Ref<IUser> = ref(props.editedUser);

watch(user.value, newUser => {
  emit('editUser', newUser);
});
</script>

<style scoped></style>
