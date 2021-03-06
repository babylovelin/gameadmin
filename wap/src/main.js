// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import './fontawesome/css/font-awesome.min.css'
import md5 from 'js-md5';
Axios.defaults.baseURL = 'http://dealer.870yx.com/api/'
Axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = Axios
Vue.config.productionTip = false

import GLOBAL from './common/js/global'
Vue.prototype.global = GLOBAL

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})