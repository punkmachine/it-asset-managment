<template>
  <Transition name="modal">
    <div
      v-if="visible"
      class="modal__mask"
      @click="visible = false"
    >
      <div
        class="modal__container"
        :class="{
          'modal__container--with-columns': doubleColumns,
        }"
        @click.stop
      >
        <div class="modal__body">
          <slot name="body"></slot>
        </div>

        <div class="modal__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { ref, defineExpose, defineProps } from 'vue';
import type { Ref } from 'vue';

interface IProps {
  doubleColumns?: boolean;
}

const props = defineProps<IProps>();

const visible: Ref<boolean> = ref(false);

function show(): void {
  visible.value = true;
}

function hide(): void {
  visible.value = false;
}

defineExpose({
  show,
  hide,
});
</script>

<style>
.modal__mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal__container {
  z-index: 9999;
  width: 360px;
  margin: auto;
  background-color: var(--bg-main);
  border-radius: 8px;
  box-shadow: var(--shadow-standard);
  padding: 20px 12px 16px 12px;
  transition: all 0.3s ease;
}

.modal__container--with-columns {
  width: 620px;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 16px;
}

.modal__title {
  margin-bottom: 12px;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
