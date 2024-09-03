import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { syncStorePlugin } from '@/store/plugins/syncStore';
import { handleStoreErrors } from '@/store/plugins/handleStoreErrors';

import App from './App.vue';
import router from '@/router';

import middleware from './router/middleware';

import './assets/styles/main.css';

const isProduction = () => false;

const prepare = async () => {
  if (!isProduction()) {
    const { worker } = await import('./mocks');
    return worker.start();
  }

  return;
};

const app = createApp(App);
const pinia = createPinia();

pinia.use(syncStorePlugin);
pinia.use(handleStoreErrors);

router.beforeEach(middleware);

app.use(router).use(pinia);

prepare().then(() => {
  app.mount('#app');
});
