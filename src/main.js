import Vue from "vue";
import App from "./app";
// import VConsole from "vconsole";

// if (process.env.NODE_ENV === "development") {
//   const VConsole = require("vconsole");
//   new VConsole();
// }

new Vue({
  render: h => h(App)
}).$mount("#root");
