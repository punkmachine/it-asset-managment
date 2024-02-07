<template>
  <label class="input__label">
    <span class="text-sm">{{ props.label }}</span>
    <div class="relative">
      <input
        class="input"
        type="text"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />

      <svg
        v-if="preIcon"
        class="input__pre-icon"
      >
        <use :xlink:href="`${inputs}#${preIcon}`"></use>
      </svg>

      <svg
        v-if="postIcon"
        class="input__post-icon"
      >
        <use :xlink:href="`${inputs}#${postIcon}`"></use>
      </svg>
    </div>
  </label>
</template>

<script lang="ts" setup>
import inputs from '@/assets/icons/sprites/inputs.svg';
import { defineProps, defineEmits } from 'vue';

interface IProps {
  label: string,
  modelValue: string,
  preIcon?: string,
  postIcon?: string,
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
