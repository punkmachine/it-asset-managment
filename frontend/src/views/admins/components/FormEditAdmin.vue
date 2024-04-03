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
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import type { IAdmin } from '@/entities/types/backend/response/admin';
import type { Ref } from 'vue';
import UIInput from '@/components/ui/UIInput.vue';

interface IProps {
  editedAdmin: IAdmin;
}

interface IEmits {
  (e: 'editAdmin', admin: IAdmin): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const admin: Ref<IAdmin> = ref(props.editedAdmin);

watch(admin.value, newAdmin => {
  emit('editAdmin', newAdmin);
});
</script>

<style scoped></style>
@/entities/types/backend/response/admins
