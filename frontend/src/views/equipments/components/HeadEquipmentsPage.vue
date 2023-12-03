<template>
  <HeadPage title="Список оборудования">
    <button class="button button--gray" @click="importElements">
      <svg class="button__icon">
        <use xlink:href="@/assets/icons/sprites/buttons.svg#upload"></use>
      </svg>
      Импортировать
    </button>

    <input
      id="fileUpload"
      type="file"
      class="hidden"
    >

    <button class="button" @click="$emit('addEquipment')">
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
  (e: 'addEquipment'): void,
}

const emit = defineEmits<IEmits>();

function importElements() {
  const fileInput = document.getElementById('fileUpload');

  if (fileInput) {
    fileInput.click();
  }
}
</script>

<style scoped>

</style>
