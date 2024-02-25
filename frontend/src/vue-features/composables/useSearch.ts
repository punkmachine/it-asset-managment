import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import debounce from 'debounce';

export const useSearch = (requestSearch: () => void, clearSearch: () => void) => {
  const searchText: Ref<string> = ref('');

  function setSearchText(text: string) {
    searchText.value = text;
  }

  const searchTextWatcher = debounce((newValue: string, oldValue: string) => {
    if (newValue.length > 3) {
      requestSearch();
    } else if (newValue.length <= 3 && oldValue.length > 3) {
      clearSearch();
    }
  }, 500);

  watch(searchText, searchTextWatcher);

  return {
    searchText,
    setSearchText,
  };
}
