import Vue from 'vue';
import Vuex from 'vuex';
import VueSocketio from 'vue-socket.io';
import App from './App.vue';
import store from './store';

Vue.config.performance = true
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(new VueSocketio({
  debug: true,
  connection: 'https://fathomless-retreat-94763.herokuapp.com/',
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  },
  options: { autoConnect: false }
}));


new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
