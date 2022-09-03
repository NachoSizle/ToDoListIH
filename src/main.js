import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

createApp(App)
  .use(router)
  .use(createPinia())
  .use(BootstrapVue)
  .use(IconsPlugin)
  .mount('#app');
