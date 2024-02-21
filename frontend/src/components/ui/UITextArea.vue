<template>
  <label class="input__label">
    <span class="text-sm">{{ props.label }}</span>
    <textarea
      class="input textarea"
      v-bind="$attrs"
      :value="modelValue"
      :class="{
        'textarea--mini': heightMini,
      }"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </label>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

interface IProps {
  modelValue: string;
  label?: string;
  heightMini?: boolean;
}

interface IEmits {
  (e: 'update:modelValue', newValue: string): void;
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();
</script>

<style scoped>
@import url('@/assets/styles/blocks/input.css');
</style>
