import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './w3.css'
import './custom.css'

Vue.config.productionTip = false

new Vue({
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
