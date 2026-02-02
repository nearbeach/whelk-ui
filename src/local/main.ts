import { createApp } from "vue";
import LocalApp from "./LocalApp.vue";
import "./local.css";

const app = createApp(LocalApp);

app.mount("#app");
