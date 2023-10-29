<template>
  <HeadPage title="Филиалы">
    <button class="button" @click="$emit('addBranch')">
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
  (e: 'addBranch'): void
}

const emit = defineEmits<IEmits>();
</script>

<style scoped>

</style>
