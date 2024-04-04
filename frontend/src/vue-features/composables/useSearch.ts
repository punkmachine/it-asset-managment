import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import debounce from 'debounce';

export const useSearch = (requestSearch: () => void, clearSearch: () => void) => {
  const searchText: Ref<string> = ref('');

  function setSearchText(text: string) {
    searchText.value = text;
  }

  const searchTextWatcher = debounce((newValue: string) => {
    if (newValue.length >= 1) {
      requestSearch();
    } else {
      clearSearch();
    }
  }, 500);

  watch(searchText, searchTextWatcher);

  return {
    searchText,
    setSearchText,
  };
}
