import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  toggleAppbar,
  setAppbarTitle,
  addAppbarAction,
  resetAppbarActions,
  toggleToolbar,
  setToolbarTitle,
  addToolbarAction,
  resetToolbarActions,
} from '~/store/actions'
import Library from '~/pages/Library'
import Feed from '~/pages/Feed'
import Discover from '~/pages/Discover'
import Profile from '~/pages/Profile'
import Settings from '~/pages/Settings'
import Lab from '~/pages/Lab'
// @ts-ignore
import labs from './pages/labs/**.*sx'
import NotFound from '~/pages/NotFound'

interface Props {
  toggleAppbar(v?: boolean): void
  setAppbarTitle(v: string): void
  addAppbarAction(name: string, align: 'left' | 'right'): void
  resetAppbarActions(): void
  toggleToolbar: typeof toggleToolbar
  setToolbarTitle: typeof setToolbarTitle
  addToolbarAction: typeof addToolbarAction
  resetToolbarActions: typeof resetToolbarActions
}

class Routes extends React.Component<Props> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact render={() => this.preRoute(Library)} />
        <Route path="/feed/" exact render={() => this.preRoute(Feed)} />
        <Route path="/discover/" exact render={() => this.preRoute(Discover)} />
        <Route path="/profile/" exact render={() => this.preRoute(Profile)} />
        <Route path="/settings/" exact render={() => this.preRoute(Settings)} />
        <Route path="/lab/" exact render={() => this.preRoute(Lab)} />
        {Object.values(labs)
          .map(m => Object.values(m)[0].default)
          .map(lab => (
            <Route
              key={lab.name}
              path={`/lab/${lab.name.toLowerCase()}`}
              exact
              render={() => this.preRoute(lab)}
            />
          ))}
        <Route render={() => this.preRoute(NotFound)} />
      </Switch>
    )
  }

  preRoute(component: React.ComponentClass | React.FunctionComponent) {
    const config = (component as any).pageConf || {}
    this.props.resetAppbarActions()
    this.props.resetToolbarActions()
    this.props.toggleAppbar(config.showAppbar || false)
    this.props.setAppbarTitle(config.appbarTitle || '')
    ;(config.appbarActions || []).forEach(action =>
      this.props.addAppbarAction(action.name, action.align)
    )
    this.props.toggleToolbar(config.showToolbar || false)
    this.props.setToolbarTitle(config.toolbarTitle || '')
    ;(config.toolbarActions || []).forEach(action =>
      this.props.addToolbarAction(action)
    )
    return React.createElement(component, {}, null)
  }
}
export default connect(
  null,
  {
    toggleAppbar,
    setAppbarTitle,
    addAppbarAction,
    resetAppbarActions,
    toggleToolbar,
    setToolbarTitle,
    addToolbarAction,
    resetToolbarActions,
  }
)(Routes)
