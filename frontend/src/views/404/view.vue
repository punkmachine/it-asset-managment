<template>
  <div class="not-found">
    <span class="not-found__title">404</span>
    <span class="not-found__text">Страница не найдена</span>
    <div class="not-found__buttons">
      <button
        @click="$router.back"
        class="not-found__button"
      >
        Вернуться назад
      </button>
      <RouterLink
        to="/"
        class="not-found__button"
        >На главную</RouterLink
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.not-found__title {
  font-size: 46px;
  font-weight: 700;
}

.not-found__text {
  font-size: 18px;
}

.not-found__buttons {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 16px;
}

.not-found__button {
  display: block;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  color: var(--link-color);
}

.not-found__button:hover {
  color: var(--link-hover-color);
}

.not-found__button::before {
  content: '';
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--link-hover-color);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.not-found__button:hover::before {
  transform: scaleX(1);
}
</style>
