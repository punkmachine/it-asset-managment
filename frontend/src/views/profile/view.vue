<template>
  <div class="profile">
    <HeadPage title="Профиль" />

    <div class="profile__content">
      <div class="profile__img">
        <svg>
          <use xlink:href="@/assets/icons/sprites/profile.svg#profile"></use>
        </svg>
      </div>

      <div class="profile__data">
        <div
          v-if="localAdminData"
          class="flex flex-col gap-2"
        >
          <UIInput
            v-model="localAdminData.firstName"
            label="Имя:"
            required
            autocomplete="name"
          />

          <UIInput
            v-model="localAdminData.lastName"
            label="Фамилия:"
            required
            autocomplete="family-name"
          />
        </div>
      </div>

      <div class="profile__controls">
        <button
          class="button button--gray"
          @click="goBackupData"
        >
          Сбросить
        </button>
        <button
          class="button"
          @click="saveNewUserData"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import type { Ref } from 'vue';
import type { IAdmin } from '@/entities/types/backend/response/admin';

import HeadPage from '@/components/HeadPage.vue';
import UIInput from '@/components/ui/UIInput.vue';

import { api } from '@/api';
import { useAdminsStore } from '@/store';

const adminStore = useAdminsStore();

const localAdminData: Ref<IAdmin | null> = ref(JSON.parse(JSON.stringify(adminStore.currentAdmin)));
let backupUserData: IAdmin | null = null;

function goBackupData() {
  localAdminData.value = backupUserData;
}

function getNewUserPayload() {
  if (!localAdminData.value) return;

  return {
    firstName: localAdminData.value.firstName,
    lastName: localAdminData.value.lastName,
    login: localAdminData.value.login,
    password: localAdminData.value.password,
    state: localAdminData.value.state,
    role: localAdminData.value.role,
  };
}

function saveNewUserData() {
  if (localAdminData.value) {
    const payload = getNewUserPayload();

    api.admins
      // @ts-ignore-next-line
      .updateAdmin(localAdminData.value._id, payload)
      .then(() => {
        adminStore.fetchCurrentAdmin();
      })
  }
}

onMounted(() => {
  backupUserData = JSON.parse(JSON.stringify(localAdminData.value));
});
</script>

<style scoped>
.profile__content {
  position: relative;
  background-color: var(--bg-main);
  padding: 12px;
  margin: 12px;
  display: flex;
  gap: 20px;
  border-radius: 12px;
  align-items: flex-start;
}

.profile__img {
  width: 360px;
  height: 460px;
  border-radius: 16px;
  border: 2px solid var(--border-standard);
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile__img > svg {
  width: 140px;
  height: 140px;
}

.profile__data {
  position: relative;
}

.profile__controls {
  display: flex;
  gap: 8px;
  position: absolute;
  right: 16px;
  bottom: 16px;
}
</style>
@/entities/types/backend/response/admins
