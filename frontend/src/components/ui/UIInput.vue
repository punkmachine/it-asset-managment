<template>
  <label class="input__label">
    <span class="text-sm">{{ props.label }}</span>
    <div class="relative">
      <input
        class="input"
        :class="{
          '!pl-8': beforeInnerIcon
        }"
        type="text"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />

      <svg
        v-if="beforeIcon"
        class="input__before-icon"
      >
        <use :xlink:href="`${inputs}#${beforeIcon}`"></use>
      </svg>

      <svg
        v-if="beforeInnerIcon"
        class="input__before-inner-icon"
      >
        <use :xlink:href="`${inputs}#${beforeInnerIcon}`"></use>
      </svg>

      <svg
        v-if="afterIcon"
        class="input__after-icon"
      >
        <use :xlink:href="`${inputs}#${afterIcon}`"></use>
      </svg>

      <div class="input__after-inner-btn">
        <slot name="after-inner-btn"></slot>
      </div>
    </div>
  </label>
</template>

<script lang="ts" setup>
import inputs from '@/assets/icons/sprites/inputs.svg';
import { defineProps, defineEmits } from 'vue';

interface IProps {
  label: string;
  modelValue: string;
  beforeIcon?: string;
  afterIcon?: string;
  beforeInnerIcon?: string,
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
