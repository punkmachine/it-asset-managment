<template>
  <div class="flex flex-col gap-3 w-full">
    <label class="input__label">
      <span class="text-sm">Имя</span>
      <input
        v-model="user.firstName"
        type="text"
        class="input"
        required
        autocomplete="name"
      />
    </label>

    <label class="input__label">
      <span class="text-sm">Фамилия</span>
      <input
        v-model="user.lastName"
        type="text"
        class="input"
        required
        autocomplete="family-name"
      />
    </label>

    <label class="input__label">
      <span class="text-sm">Логин</span>
      <input
        v-model="user.login"
        type="text"
        class="input"
        required
        autocomplete="username"
      />
    </label>

    <label class="input__label">
      <span class="text-sm">Пароль</span>
      <input
        v-model="user.password"
        type="password"
        class="input"
        required
        autocomplete="current-password"
      />
    </label>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import type { IUser } from '@/entities/types/backend/user';

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
