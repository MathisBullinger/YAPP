import Router from 'vue-router'
import Home from '~/pages/Home'
import Login from '~/pages/Login'
import Demo from '~/pages/Demo'
import ComponentDemo from '~/pages/demo/Components'
import Debug from '~/pages/Debug'
import NotFound from '~/pages/NotFound'

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/demo', component: Demo },
    { path: '/demo/components', component: ComponentDemo },
    { path: '/debug', component: Debug },
    { path: '*', component: NotFound },
  ],
})
