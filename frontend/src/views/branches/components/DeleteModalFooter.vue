<template>
  <div class="max-w-min flex justify-between gap-2 items-center">
    <button class="button button--gray" @click="$emit('cancel')">
      Отмена
    </button>
    <button class="button button--red" @click="$emit('delete')">
      Заблокировать
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';

interface IEmits {
  (e: 'cancel'): void,
  (e: 'delete'): void
};

const emits = defineEmits<IEmits>();
</script>
