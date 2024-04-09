<template>
  <HeadPage title="Список оборудования">
    <button
      class="button"
      @click="exportElements"
    >
      <svg class="button__icon">
        <use xlink:href="@/assets/icons/sprites/buttons.svg#export"></use>
      </svg>
      Экспорт
    </button>
    <button
      class="button button--gray"
      @click="importElements"
    >
      <svg class="button__icon">
        <use xlink:href="@/assets/icons/sprites/buttons.svg#upload"></use>
      </svg>
      Импортировать
    </button>

    <input
      id="fileUpload"
      type="file"
      class="hidden"
      accept=".xlsx,.xls,.csv"
      @change="handleFileChanged"
    />

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
import { api } from '@/api';

interface IEmits {
  (e: 'addEquipment'): void;
  (e: 'addEquipmentsXLSX', file: File): void;
}

const emit = defineEmits<IEmits>();

const file: Ref<File | null> = ref(null);

function handleFileChanged(event: Event) {
  const target = event.target as HTMLInputElement;
  const selectedFile = target.files ? target.files[0] : null;
  file.value = selectedFile;

  if (file.value) {
    emit('addEquipmentsXLSX', file.value);
    target.value = '';
  }
}

function importElements() {
  const fileInput = document.getElementById('fileUpload');

  if (fileInput) {
    fileInput.click();
  }
}

async function exportElements() {
  const response = await api.equipments.downloadEquipmentsExcel();

  const url = window.URL.createObjectURL(new Blob([response]));
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', 'equipments.xlsx');
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);
}
</script>
