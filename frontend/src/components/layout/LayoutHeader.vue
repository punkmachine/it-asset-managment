<template>
  <header>
    <RouterLink to="/" class="logo">
      <img src="@/assets/icons/logo.svg" alt="">
      <span class="logo__text">Учёт оборудования</span>
    </RouterLink>
    <div class="account" v-click-outside="hideMenuProfile">
      <div class="account__btn" @click="toggleVisibleMenuProfile">
        <svg>
          <use xlink:href="@/assets/icons/sprites/profile.svg#profile"></use>
        </svg>
        <span class="account__text">
          {{ currentUser?.firstName }} {{ currentUser?.lastName }}
        </span>
      </div>
      <transition name="fade">
        <nav
          v-if="showProfileMenu"
          class="account__menu"
        >
          <RouterLink to="/profile" class="account__menu-item">
            Профиль
          </RouterLink>
          <div class="account__menu-item">
            <button>Выйти</button>
          </div>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia'

import { clickOutside } from '@/vue-features/directives/clickOutside';
import { useUsersStore } from '@/store';

const vClickOutside = clickOutside;

const usersStore = useUsersStore();
const { currentUser } = storeToRefs(usersStore);

const showProfileMenu = ref(false);

function hideMenuProfile() {
  showProfileMenu.value = false;
}

function toggleVisibleMenuProfile() {
  showProfileMenu.value = !showProfileMenu.value;
}
</script>

<style scoped>
@import url('@/assets/styles/animations.css');

header {
  height: var(--header-height);
  width: 100%;
  padding: 16px;
  background-color: var(--bg-main);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: 10;
  justify-content: space-between;
  box-shadow: 0 0 1px #0003, 0 4px 10px #2134520a;
}

.logo, .account__btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.logo__text {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 18px;
  color: var(--text-main);
}

.logo img, .account svg {
  width: 36px;
  height: 36px;
  margin-right: 12px;
}

.account {
  position: relative;
  user-select: none;
}

.account__text {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-main);
}

.account__menu {
  position: absolute;
  right: 0;
  width: calc(100% + 24px);
  top: calc(100% + 20px);
  border-radius: 8px;
  background-color: var(--bg-main);
  box-shadow: var(--shadow-standard);
}

.account__menu-item {
  display: block;
  padding: 12px;
  border-bottom: 1px solid var(--border-standard);
  cursor: pointer;
}

.account__menu-item:first-child {
  border-start-end-radius: 8px;
  border-start-start-radius: 8px;
}

.account__menu-item:hover {
  background-color: var(--bg-hover-main);
}

.account__menu-item:last-child {
  border-bottom: none;
  border-end-start-radius: 8px;
  border-end-end-radius: 8px;
}
</style>
