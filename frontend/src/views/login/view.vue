<template>
  <div class="auth">
    <form class="auth__form">
      <h1 class="auth__title">Авторизация</h1>

      <div class="flex flex-col gap-3 w-full">
        <UIInput
          v-model="login"
          label="Логин"
          required
          autocomplete="username"
          autofocus
        />

        <UIInput
          v-model="password"
          label="Пароль"
          required
          autocomplete="current-password"
        />
      </div>

      <button
        class="button mt-5"
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

import { api } from '@/api';
import { useUsersStore } from '@/store';

import UIInput from '@/components/ui/UIInput.vue';

const router = useRouter();

const usersStore = useUsersStore();

const login: Ref<string> = ref('');
const password: Ref<string> = ref('');

function authorization() {
  const payload = {
    login: login.value,
    password: password.value,
  };

  api.auth.login(payload)
    .then(data => {
      Cookies.set('token', data.token);
      usersStore.setCurrentUserId(data.userId);
      usersStore.fetchCurrentUser();
      router.push('/');
    })
    .catch(error => {
      console.log('error >>>', error);
    });
}
</script>

<style scoped>
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
