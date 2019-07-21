import './compatibility'
import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

Sentry.init({
  dsn: 'https://f253732d670843f0b08015c64bb7587f@sentry.io/1500732',
  integrations: [new Integrations.Vue({ Vue, attachProps: true })],
})

import VueRouter from 'vue-router'
import App from '~/App'
import VueApollo from 'vue-apollo'
import router from '~/router'
import defaultClient from '~/api'
import store from '~/store'
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
  store,
  render: h => h(App),
})
