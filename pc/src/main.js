import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'; // 默认主题
// import '../static/css/theme-green/index.css'; // 浅绿色主题
import "babel-polyfill";
//引入axios
import Axios from 'axios'
Axios.defaults.baseURL = 'http://dealer.870yx.com/api/'
Axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = Axios

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');