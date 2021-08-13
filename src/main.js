import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || process.env.VUE_APP_WEB3_FALLBACK_PROVIDER);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  provide: {
    web3,
  },
  render: h => h(App)
}).$mount("#app");
