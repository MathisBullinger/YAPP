import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import '~/styles/master.scss'

Vue.use(VueRouter)

const atomic = require('./components/atomic/*.vue')
Object.keys(atomic).forEach(name =>
  Vue.component(name, atomic[name].default || atomic[name])
)

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
