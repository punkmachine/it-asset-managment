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
      @change="handleFileChanged"
    >

    <!-- @todo -->
    <!-- <button class="button" @click="$emit('addEquipment')">
      <svg class="button__icon">
        <use xlink:href="@/assets/icons/sprites/buttons.svg#add"></use>
      </svg>
      Добавить
    </button> -->
  </HeadPage>
</template>

<script lang="ts" setup>
import { defineEmits, ref } from 'vue';

import type { Ref } from 'vue';

import HeadPage from '@/components/HeadPage.vue';

interface IEmits {
  (e: 'addEquipment'): void,
  (e: 'addEquipmentsXLSX', file: File): void,
}

const emit = defineEmits<IEmits>();

const file: Ref<File | null> = ref(null);

function handleFileChanged(event: Event) {
  const target = event.target as HTMLInputElement;
  const selectedFile = target.files ? target.files[0] : null;
  file.value = selectedFile;

  if (file.value) {
    emit('addEquipmentsXLSX', file.value);
  }
}

function importElements() {
  const fileInput = document.getElementById('fileUpload');

  if (fileInput) {
    fileInput.click();
  }
}
</script>
