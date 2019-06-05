import Router from 'vue-router'
import Home from './pages/Home'

export default new Router({
  mode: 'history',
  routes: [{ path: '/', component: Home }],
})
