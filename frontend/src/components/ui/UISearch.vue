<template>
  <div class="relative w-60">
    <input
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
</script>

<style scoped>
@import url('@/assets/styles/blocks/input.css');
</style>
