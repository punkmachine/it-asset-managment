<template>
  <HeadPage title="Админы">
    <button class="button" @click="$emit('addUser')">
      <svg class="button__icon">
        <use xlink:href="@/assets/icons/sprites/buttons.svg#add"></use>
      </svg>
      Добавить
    </button>
  </HeadPage>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';
import HeadPage from '@/components/HeadPage.vue';

interface IEmits {
  (e: 'addUser'): void
}

const emit = defineEmits<IEmits>();
</script>
