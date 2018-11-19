// has been set in webpack.config.base.js with an alias
import Vue from "vue";
import App from "./app";
import VConsole from "vconsole";
import VueDrag from "./";
// import VueDrag from "../dist";

// if (process.env.NODE_ENV === "development") {
//   const VConsole = require("vconsole");
//   new VConsole();
// }
Vue.use(VueDrag);

new Vue({
  render: h => h(App)
}).$mount("#root");
