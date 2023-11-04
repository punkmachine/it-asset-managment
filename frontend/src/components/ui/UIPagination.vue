<template>
  <div class="pagination">
    <div class="pagination__arrow">
      <button>
        <svg>
          <use xlink:href="@/assets/icons/sprites/buttons.svg#arrow-left"></use>
        </svg>
      </button>
    </div>
    <div class="pagination__counter">
      <span
        v-for="number in pagesCount"
        :key="`pagination-${number}`"
        class="pagination__counter-item"
        :class="{
          'pagination__counter-item--active': true
        }"
      >
        {{ number }}
      </span>
    </div>
    <div class="pagination__arrow">
      <button>
        <svg>
          <use xlink:href="@/assets/icons/sprites/buttons.svg#arrow-right"></use>
        </svg>
      </button>
    </div>
    <div>
      <select
        v-if="visibleSelect"
        v-model="visibleItems"
        class="select"
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
import { defineProps, computed, ref } from 'vue';
import type { Ref } from 'vue';

interface IProps {
  count: number,
};

const props = defineProps<IProps>();

const visibleItems: Ref<number> = ref(10);

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
}

.pagination__arrow svg {
  width: 24px;
  height: 24px;
  fill: var(--text-main);
}

.pagination__arrow:hover button {
  border-radius: 6px;
  background-color: var(--bg-secondary);
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
