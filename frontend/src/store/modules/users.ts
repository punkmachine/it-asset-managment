import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', () => {
  // state
  const count: Ref<number> = ref(0);
  const name: Ref<string> = ref('Eduardo');

  // getters
  const doubleCount = computed(() => count.value * 2);

  // actions
  function increment() {
    count.value++
  }

  return {
    count, name,
    doubleCount,
    increment
  };
});

// example in component:
// <script setup>
// import { storeToRefs } from 'pinia'

// const store = useCounterStore()
// // `name` and `doubleCount` are reactive refs
// // This will also extract refs for properties added by plugins
// // but skip any action or non reactive (non ref/reactive) property
// const { name, doubleCount } = storeToRefs(store)
// // the increment action can just be destructured
// const { increment } = store
// </script>
