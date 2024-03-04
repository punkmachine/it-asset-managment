<template>
  <div class="pt-2">
    <div
      v-for="(comment, index) in comments"
      :key="`comment-${index}`"
      class="equipment__comment"
    >
      <img
        src="@/assets/icons/comment.svg"
        alt=""
        aria-hidden
        class="pt-1 w-5 h-5"
      />
      <span>{{ comment }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

interface IProps {
  comments: string[],
}

defineProps<IProps>();
</script>

<style scoped>
.equipment__comment {
  padding: 4px 16px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.equipment__comment:last-child {
  padding-bottom: 0;
}
</style>
