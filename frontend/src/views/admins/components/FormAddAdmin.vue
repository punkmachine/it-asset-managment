<template>
  <div class="flex w-full flex-col gap-3">
    <UIInput
      label="Имя"
      v-model="admin.firstName"
      required
      autocomplete="name"
    />

    <UIInput
      label="Фамилия"
      v-model="admin.lastName"
      required
      autocomplete="family-name"
    />

    <UIInput
      label="Логин"
      v-model="admin.login"
      required
      autocomplete="username"
    />

    <UIInput
      label="Пароль"
      v-model="admin.password"
      required
      autocomplete="current-password"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import type { Ref } from 'vue';
import type { INewAdmin } from '@/views/admins/types';
import UIInput from '@/components/ui/UIInput.vue';

interface IProps {
  addedAdmin: INewAdmin;
}

interface IEmits {
  (e: 'updateAddedAdmin', admin: INewAdmin): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const admin: Ref<INewAdmin> = ref(props.addedAdmin);

watch(admin.value, newAdmin => {
  emit('updateAddedAdmin', newAdmin);
});
</script>

<style scoped></style>
