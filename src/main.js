import { createApp } from "vue";
import mitt from "mitt";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Notifications from "@kyvg/vue3-notification";

const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(store).use(Notifications).use(router).mount("#app");
