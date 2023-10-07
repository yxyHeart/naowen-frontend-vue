import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
// tailwindcss 要放在 elementui 和 antd前面 不然会样式冲突
import "./style.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

createApp(App).use(store).use(router).use(ElementPlus).use(Antd).mount("#app");
