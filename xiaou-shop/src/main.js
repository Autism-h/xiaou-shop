// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入全局css
import './assets/css/reset.css'
//引入全局js
import './assets/js/remScale'

//引入全局vant UI框架
import vantUI from 'vant'
//引入全局vant css
import 'vant/lib/index.css'
Vue.use(vantUI)

//设置图片服务器
Vue.prototype.$imgUrl = 'http://localhost:3000'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
