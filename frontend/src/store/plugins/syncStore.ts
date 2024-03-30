import type { PiniaPluginContext } from 'pinia';

const syncedStoresId = [
  'users',
];

export function syncStorePlugin(context: PiniaPluginContext) {
  context.store.$subscribe((mutation, state) => {
    if (syncedStoresId.includes(mutation.storeId)) {
      let store = JSON.parse(localStorage.getItem('itam-store') || "{}");
      store[mutation.storeId] = {
        ...store[mutation.storeId],
        ...state,
      };

      localStorage.setItem('itam-store', JSON.stringify(store));
    }
  });
}
