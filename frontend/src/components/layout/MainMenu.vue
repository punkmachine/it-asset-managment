<template>
  <aside class="main-menu__wrapper">
    <nav class="main-menu">
      <RouterLink
        to="/"
        class="main-menu__item"
      >
        <svg class="main-menu__item-icon">
          <use xlink:href="@/assets/icons/sprites/main-menu.svg#equipments"></use>
        </svg>
        <span class="main-menu__item-text">Оборудование</span>
      </RouterLink>
      <RouterLink
        to="/branches"
        class="main-menu__item"
      >
        <svg class="main-menu__item-icon">
          <use xlink:href="@/assets/icons/sprites/main-menu.svg#branches"></use>
        </svg>
        <span class="main-menu__item-text">Филиалы</span>
      </RouterLink>
      <RouterLink
        to="/admins"
        class="main-menu__item"
      >
        <svg class="main-menu__item-icon">
          <use xlink:href="@/assets/icons/sprites/main-menu.svg#users"></use>
        </svg>
        <span class="main-menu__item-text">Админы</span>
      </RouterLink>
      <!-- <RouterLink
        to="/equipment-settings"
        class="main-menu__item"
      >
        <svg class="main-menu__item-icon">
          <use xlink:href="@/assets/icons/sprites/main-menu.svg#settings"></use>
        </svg>
        <span class="main-menu__item-text">
          Настройки
        </span>
      </RouterLink> -->
    </nav>
  </aside>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.main-menu__wrapper {
  background-color: #202333;
}

.main-menu {
  display: flex;
  flex-direction: column;
}

.main-menu__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px 0;
  border-bottom: 2px solid var(--border-secondary);
}

.main-menu__item:hover {
  background-color: rgba(242, 242, 242, 0.3);
}

.main-menu__item:hover .main-menu__item-icon {
  fill: var(--text-white);
}

.main-menu__item:hover .main-menu__item-text {
  color: var(--text-white);
}

.main-menu__item-icon {
  width: 24px;
  height: 24px;
  fill: var(--text-secondary);
}

.main-menu__item-text {
  color: var(--text-secondary);
  font-size: 16px;
}
</style>
