import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { syncStorePlugin } from '@/store/plugins/syncStore';

import App from './App.vue';
import router from '@/router';

import middleware from './router/middleware';

import './assets/styles/main.css';

const app = createApp(App);
const pinia = createPinia();

pinia.use(syncStorePlugin);

router.beforeEach(middleware);

app.use(router).use(pinia);

app.mount('#app');
