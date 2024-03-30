import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { syncStorePlugin } from '@/store/plugins/syncStore';
import { handleStoreErrors } from '@/store/plugins/handleStoreErrors';

import App from './App.vue';
import router from '@/router';

import middleware from './router/middleware';

import './assets/styles/main.css';

const app = createApp(App);
const pinia = createPinia();

pinia.use(syncStorePlugin);
pinia.use(handleStoreErrors);

router.beforeEach(middleware);

app.use(router).use(pinia);

app.mount('#app');
