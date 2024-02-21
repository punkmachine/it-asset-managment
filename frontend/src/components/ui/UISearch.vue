<template>
  <div class="relative w-60">
    <input
      v-model="search"
      type="text"
      class="input input--with-icon"
      placeholder="Поиск..."
    />
    <svg class="input__icon">
      <use xlink:href="@/assets/icons/sprites/inputs.svg#search"></use>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineEmits } from 'vue';
import type { Ref } from 'vue';

interface IEmits {
  (e: 'searchInput', searchText: string): void;
}

const search: Ref<string> = ref('');

const emits = defineEmits<IEmits>();

watch(search, () => {
  emits('searchInput', search.value);
});
</script>

<style scoped>
@import url('@/assets/styles/blocks/input.css');
</style>
