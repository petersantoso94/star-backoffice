import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import i18n from "./plugins/i18n.js";

Vue.config.productionTip = false;

new Vue({
  i18n,
  render: h => h(App)
}).$mount("#app");
