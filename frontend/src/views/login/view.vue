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
          :type="passwordVisible ? 'text' : 'password'"
          before-icon="password"
          autocomplete="current-password"
          data-testid="password"
        >
          <template #after-inner-btn>
            <div class="flex items-center justify-center w-6 h-6">
              <svg
                v-if="passwordVisible"
                class="w-5 h-5"
                @click="toggleVisiblePassword"
              >
                <use xlink:href="@/assets/icons/sprites/inputs.svg#eye-open"></use>
              </svg>

              <svg
                v-else
                class="w-5 h-5"
                @click="toggleVisiblePassword"
              >
                <use xlink:href="@/assets/icons/sprites/inputs.svg#eye-close"></use>
              </svg>
            </div>
          </template>
        </UIInput>
      </div>

      <button
        class="button mt-5 select-none"
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
const passwordVisible: Ref<boolean> = ref(false);

const toggleVisiblePassword = () => passwordVisible.value = !passwordVisible.value;

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
