<template>
  <div class="auth">
    <form class="auth__form">
      <h1 class="auth__title">Авторизация</h1>

      <div class="flex flex-col gap-3 w-full">
        <label class="input__label">
          <span class="text-sm">Логин</span>
          <input
            type="text"
            class="input"
            required
            autocomplete="username"
            autofocus
          />
        </label>

        <label class="input__label">
          <span class="text-sm">Пароль</span>
          <input
            type="password"
            class="input"
            required
            autocomplete="current-password"
          />
        </label>
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
import { useRouter } from 'vue-router';

const router = useRouter();

function authorization() {
  router.push('/')
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
