<template>
  <div class="max-w-min flex justify-between gap-2 items-center">
    <button class="button button--gray" @click="$emit('cancel')">
      Отмена
    </button>
    <button class="button" @click="$emit('add')">
      Добавить
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';

interface IEmits {
  (e: 'cancel'): void,
  (e: 'add'): void
};

const emits = defineEmits<IEmits>();
</script>
