import Vue from 'vue'
Vue.filter('date', require('./dateFormat').default)
Vue.filter('money', require('./moneyFormat').default)
Vue.filter('count', require('./countFormat').default)
