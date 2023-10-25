<template>
  <div class="flex flex-col gap-3 w-full">
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

    <UIInput
      label="Логин"
      v-model="user.login"
      required
      autocomplete="username"
    />

    <UIInput
      label="Пароль"
      v-model="user.password"
      required
      autocomplete="current-password"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import type { IUser } from '@/entities/types/backend/user';
import UIInput from '@/components/ui/UIInput.vue';

interface IProps {
  editedUser: IUser,
};

interface IEmits {
  (e: 'editUser', user: IUser): void,
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const user = ref<IUser>(props.editedUser);

watch(user.value, (newUser) => {
  emit('editUser', newUser);
});
</script>

<style scoped></style>
