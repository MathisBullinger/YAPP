import Router from 'vue-router'
import Home from '~/pages/Home'
import Profile from '~/pages/Profile'
import SignIn from '~/pages/SignIn'
import Demo from '~/pages/Demo'
import ComponentDemo from '~/pages/demo/Components'
import Debug from '~/pages/Debug'
import NotFound from '~/pages/NotFound'
import Podcast from '~/pages/Podcast'
import Library from '~/pages/Library'
import store from '~/store'

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/podcast/:id', component: Podcast, props: true },
    { path: '/profile', component: Profile },
    { path: '/signin', component: SignIn },
    { path: '/login', redirect: 'signin' },
    { path: '/demo', component: Demo },
    { path: '/demo/components', component: ComponentDemo },
    { path: '/debug', component: Debug },
    { path: '/podcasts', component: Library },
    { path: '*', component: NotFound },
  ],
})

router.beforeEach((to, from, next) => {
  store.dispatch('app/setPageLoading', false)
  store.dispatch('app/hideAppBar')
  store.dispatch('app/hideAppBarOnScroll', false)
  store.dispatch('app/mergeAppBarAtTop', false)
  store.dispatch('app/setPage', '')
  next()
})

export default router
