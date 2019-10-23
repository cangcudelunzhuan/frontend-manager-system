// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import moment from 'moment'
import 'moment/locale/zh-cn'
import '!style-loader!css-loader!less-loader!@/assets/styles/main'
import App from './App'
import router from './router'
import './filters'
moment.locale('zh-cn')
Vue.use(Antd)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
