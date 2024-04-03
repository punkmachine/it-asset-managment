<template>
  <div class="px-5 py-4">
    <UIInput
      v-model="search"
      label=""
      beforeInnerIcon="search"
      type="search"
      class="w-64"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { defineEmits, ref, watch } from 'vue';
import UIInput from '@/components/ui/UIInput.vue';

interface IEmits {
  (e: 'searchInput', searchText: string): void;
}

const emits = defineEmits<IEmits>();

const search: Ref<string> = ref('');

watch(() => search.value, () => {
  emits('searchInput', search.value);
});
</script>
