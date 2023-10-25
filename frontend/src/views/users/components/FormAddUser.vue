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
import type { INewUser } from '@/views/users/types';
import UIInput from '@/components/ui/UIInput.vue';

interface IProps {
  addedUser: INewUser,
};

interface IEmits {
  (e: 'updateAddedUser', user: INewUser): void,
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const user = ref<INewUser>(props.addedUser);

watch(user.value, (newUser) => {
  emit('updateAddedUser', newUser);
});
</script>

<style scoped></style>
