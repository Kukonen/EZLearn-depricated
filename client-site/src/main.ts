import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from "./router/router.ts";
import store from "./store";


const app = createApp(App);

app.use(store);

app.use(router);

app.mount('#app');
