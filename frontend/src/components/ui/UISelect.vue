<template>
  <label class="input__label">
    <span class="text-sm">{{ props.label }}</span>
    <select
      class="input"
      v-bind="$attrs"
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
      <option
        v-for="option in options"
        :key="option.key"
      >
        {{ option.title }}
      </option>
    </select>
  </label>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import type { IOptions } from '@/entities/types/UI/select';

interface IProps {
  label: string,
  modelValue: string,
  options: IOptions[]
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
