import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch } from '~/utils/hooks'
import action from '~/store/actions'
import Library from '~/pages/Library'
import Feed from '~/pages/Feed'
import Discover from '~/pages/Discover'
import Profile from '~/pages/Profile'
import Settings from '~/pages/Settings'
import Lab from '~/pages/Lab'
import ShadowLab from '~/pages/labs/Shadow'
import ComponentLab from '~/pages/labs/Components'
import NotFound from '~/pages/NotFound'
import Podcast from '~/pages/Podcast'

export default function Routes() {
  const dispatch = useDispatch()

  function preRoute(component: React.ComponentClass | React.FunctionComponent) {
    const config = (component as any).pageConf || {}
    dispatch(action('RESET_APPBAR_ACTIONS'))
    dispatch(action('RESET_TOOLBAR_ACTIONS'))
    dispatch(action('TOGGLE_APPBAR', config.showAppbar ?? false))
    dispatch(action('SET_APPBAR_TITLE', config.appbarTitle ?? ''))
    config.appbarActions?.forEach(({ name, align }) =>
      dispatch(action('ADD_APPBAR_ACTION', { name, align }))
    )
    dispatch(
      action('TOGGLE_HIDE_APPBAR_ON_SCROLL', config.hideAppbarOnScroll ?? false)
    )
    dispatch(action('TOGGLE_TOOLBAR', config.showToolbar ?? false))
    dispatch(action('SET_TOOLBAR_TITLE', config.toolbarTitle ?? ''))
    config.toolbarActions?.forEach(name =>
      dispatch(action('ADD_TOOLBAR_ACTION', name))
    )
    return React.createElement(component, {}, null)
  }

  return (
    <Switch>
      <Route path="/" exact render={() => preRoute(Library)} />
      <Route path="/feed/" exact render={() => preRoute(Feed)} />
      <Route path="/discover/" exact render={() => preRoute(Discover)} />
      <Route path="/profile/" exact render={() => preRoute(Profile)} />
      <Route path="/settings/" exact render={() => preRoute(Settings)} />
      <Route path="/lab/" exact render={() => preRoute(Lab)} />
      <Route path="/lab/shadow" exact render={() => preRoute(ShadowLab)} />
      <Route
        path="/lab/components"
        exact
        render={() => preRoute(ComponentLab)}
      />
      <Route path="/podcast/:id" exact render={() => preRoute(Podcast)} />
      <Route render={() => preRoute(NotFound)} />
    </Switch>
  )
}
