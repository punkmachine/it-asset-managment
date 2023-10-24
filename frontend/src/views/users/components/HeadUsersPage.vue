<template>
  <div class="users__head">
    <h1 class="users__title">Админы</h1>
    <div class="flex gap-2">
      <button class="button" @click="$emit('addUser')">
        <svg class="button__icon">
          <use xlink:href="@/assets/icons/sprites/buttons.svg#add"></use>
        </svg>
        Добавить
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';

interface IEmits {
  (e: 'addUser'): void
}

const emit = defineEmits<IEmits>();
</script>

<style scoped>
.users__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
}

.users__title {
  font-size: 22px;
  font-weight: 600;
}
</style>
