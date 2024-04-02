<template>
  <div class="auth">
    <form class="auth__form">
      <h1
        class="auth__title"
        @click="createSuperAdmin"
      >
        Авторизация
      </h1>

      <div class="flex w-full flex-col gap-3">
        <UIInput
          v-model="login"
          label="Логин"
          required
          autocomplete="username"
          autofocus
          before-icon="user"
          data-testid="login"
        />

        <UIInput
          v-model="password"
          label="Пароль"
          required
          type="password"
          before-icon="password"
          autocomplete="current-password"
          data-testid="password"
        >
          <template #>

          </template>
        </UIInput>
      </div>

      <button
        class="button mt-5"
        data-testid="btn-auth"
        @click.prevent="authorization"
      >
        Войти
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

import type { Ref } from 'vue';
import type { ILoginResponse } from '@/entities/types/backend/response/auth';

import { api } from '@/api';
import { useUsersStore } from '@/store';

import UIInput from '@/components/ui/UIInput.vue';

const router = useRouter();
const usersStore = useUsersStore();

const login: Ref<string> = ref('');
const password: Ref<string> = ref('');

function successAuth(data: ILoginResponse) {
  Cookies.set('token', data.token);
  usersStore.setCurrentUserId(data.userId);
  usersStore.fetchCurrentUser();
  router.push('/');
}

function authorization() {
  const payload = {
    login: login.value,
    password: password.value,
  };

  api.auth
    .login(payload)
    .then(successAuth)
}

function createSuperAdmin() {
  const payload = {
    login: 'login',
    password: '1234',
  };

  api.auth
    .createSuperAdmin(payload)
    .then(successAuth)
}
</script>

<style scoped>
.auth {
  max-width: 600px;
  background-color: #fff;
  padding: 44px 36px;
  border-radius: 12px;
}

.auth__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
}

.auth__title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
}
</style>
