<template>
  <div class="pagination">
    <div
      class="pagination__arrow"
      :class="{
        'pagination__arrow--disable': currentPage === 1,
      }"
      @click="prevPage"
    >
      <button :disabled="currentPage === 1">
        <svg>
          <use xlink:href="@/assets/icons/sprites/buttons.svg#arrow-left"></use>
        </svg>
      </button>
    </div>
    <div class="pagination__counter">
      <span
        v-for="number in pagesCount"
        class="pagination__counter-item"
        :key="`pagination-${number}`"
        :class="{
          'pagination__counter-item--active': currentPage === number
        }"
        @click="setPage(number)"
      >
        {{ number }}
      </span>
    </div>
    <div
      class="pagination__arrow"
      :class="{
        'pagination__arrow--disable': currentPage === pagesCount,
      }"
      @click="nextPage"
    >
      <button :disabled="currentPage === pagesCount">
        <svg>
          <use xlink:href="@/assets/icons/sprites/buttons.svg#arrow-right"></use>
        </svg>
      </button>
    </div>
    <div>
      <select
        v-if="visibleSelect"
        class="select"
        :value="visibleItems"
        @change="emits('update:visibleItems', +($event.target as HTMLInputElement).value)"
      >
        <option
          v-for="option in optionsSelect"
          :value="option"
          :key="option"
        >
          {{ option }} / страница
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, defineEmits } from 'vue';

interface IProps {
  count: number,
  currentPage: number,
  visibleItems: number,
};

interface IEmits {
  (e: 'update:currentPage', newCurrentPage: number): void,
  (e: 'update:visibleItems', newVisibleItems: number): void,
};

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();

const visibleSelect = computed(() => {
  return props.count > 10;
});

const pagesCount = computed(() => {
  return Math.ceil(props.count / 10);
});

const optionsSelect = computed(() => {
  const list = [10, 25, 50, 100];
  let result: number[] = [];

  list.forEach(item => {
    if (props.count >= item) {
      result.push(item);
    }
  });

  return result;
});

function prevPage() {
  emits('update:currentPage', props.currentPage - 1);
}

function nextPage() {
  emits('update:currentPage', props.currentPage + 1);
}

function setPage(number: number) {
  emits('update:currentPage', number);
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pagination__arrow button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 6px;
}

.pagination__arrow svg {
  width: 24px;
  height: 24px;
  fill: var(--text-main);
}

.pagination__arrow:hover button {
  background-color: var(--bg-secondary);
}

.pagination__arrow--disable button {
  opacity: 0.4;
  cursor: auto;
}

.pagination__arrow--disable:hover button {
  background-color: var(--bg-white);
}

.pagination__counter {
  display: flex;
  align-items: center;
}

.pagination__counter-item {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  cursor: pointer;
}

.pagination__counter-item--active {
  border-radius: 6px;
  background-color: var(--bg-secondary);
  cursor: auto;
}

.pagination__counter-item--more {
  cursor: auto;
}
</style>
