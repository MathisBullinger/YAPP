import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import VueApollo from 'vue-apollo'
import router from './router'
import defaultClient from './api'
import '~/styles/master.scss'

Vue.use(VueRouter)
Vue.use(VueApollo)

const atomic = require('./components/atomic/*.vue')
Object.keys(atomic).forEach(name =>
  Vue.component(name, atomic[name].default || atomic[name])
)

const apolloProvider = new VueApollo({ defaultClient })

new Vue({
  el: '#app',
  router,
  apolloProvider,
  render: h => h(App),
})
