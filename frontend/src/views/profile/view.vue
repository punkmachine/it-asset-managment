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
          v-if="localUserData"
          class="flex flex-col gap-2"
        >
          <UIInput
            v-model="localUserData.firstName"
            label="Имя:"
            required
            autocomplete="name"
          />

          <UIInput
            v-model="localUserData.lastName"
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
import type { IUser } from '@/entities/types/backend/response/user';

import HeadPage from '@/components/HeadPage.vue';
import UIInput from '@/components/ui/UIInput.vue';

import { api } from '@/api';
import { useUsersStore } from '@/store';

const userStore = useUsersStore();

const localUserData: Ref<IUser | null> = ref(JSON.parse(JSON.stringify(userStore.currentUser)));
let backupUserData: IUser | null = null;

function goBackupData() {
  localUserData.value = backupUserData;
}

function saveNewUserData() {
  if (localUserData.value) {
    const payload = {
      firstName: localUserData.value.firstName,
      lastName: localUserData.value.lastName,
      login: localUserData.value.login,
      password: localUserData.value.password,
      state: localUserData.value.state,
      role: localUserData.value.role,
    };

    api.users
      .updateUser(localUserData.value._id, payload)
      .then(() => {
        userStore.fetchCurrentUser();
      })
      .catch(error => {
        console.log('error >>>', error);
      });
  }
}

onMounted(() => {
  backupUserData = JSON.parse(JSON.stringify(localUserData.value));
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
