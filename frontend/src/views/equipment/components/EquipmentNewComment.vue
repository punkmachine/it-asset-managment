<template>
  <div class="equipment__new-comment">
    <UITextArea
      v-model="newComment"
      placeholder="Ваш комментарий"
      height-mini
    />
    <button
      class="button"
      @click="addComment"
    >
      <svg class="button__icon">
        <use xlink:href="@/assets/icons/sprites/buttons.svg#add"></use>
      </svg>
      Добавить
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { useRoute } from 'vue-router';

import type { Ref } from 'vue';

import { api } from '@/api';
import UITextArea from '@/components/ui/UITextArea.vue';

interface IEmits {
  (e: 'fetchEquipment', id: string): void;
}

const emits = defineEmits<IEmits>();

const route = useRoute();

const newComment: Ref<string> = ref('');
const equipmentId: Ref<string> = ref(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id);

function addComment() {
  if (newComment.value) {
    api.equipments.commentEquipment(equipmentId.value, { text: newComment.value })
      .then(() => {
        emits('fetchEquipment', equipmentId.value);
        newComment.value = '';
      });
  }
}
</script>

<style scoped>
.equipment__new-comment {
  padding: 16px 16px 0 16px;
  display: flex;
  gap: 8px;
}

.equipment__new-comment > label {
  width: 100%;
}

.equipment__new-comment > button {
  width: auto;
}
</style>
