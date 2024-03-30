import type { PiniaPluginContext } from 'pinia';

export function handleStoreErrors({ store }: PiniaPluginContext) {
  store.$onAction(({ name, store, args, onError }) => {
    onError(error => {
      console.log('Pinia Error >>>', error);

      console.log(name, store, args);
    });
  })
}
