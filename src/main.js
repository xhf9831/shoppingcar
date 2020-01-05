import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import service from "./http"
import Vant from 'vant';
import 'vant/lib/index.css'
import FastClick from 'fastclick'
import Api from './http/Api'
import './global'
import { PullRefresh } from 'vant';

Vue.use(PullRefresh);
Vue.prototype.$api = Api
FastClick.attach(document.body);
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')