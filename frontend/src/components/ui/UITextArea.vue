<template>
  <label class="input__label">
    <span class="text-sm">{{ props.label }}</span>
    <textarea
      class="input textarea"
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </label>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

interface IProps {
  label: string,
  modelValue: string,
};

interface IEmits {
  (e: 'update:modelValue', newValue: string): void,
};

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();
</script>

<style scoped>
@import url('@/assets/styles/blocks/input.css');
</style>
