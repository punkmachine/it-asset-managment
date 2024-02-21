<template>
  <div class="px-5 py-4">
    <UISearch @searchInput="handlerSearch" />
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';
import UISearch from '@/components/ui/UISearch.vue';

interface IEmits {
  (e: 'searchInput', searchText: string): void;
}

const emits = defineEmits<IEmits>();

function handlerSearch(text: string) {
  emits('searchInput', text);
}
</script>
