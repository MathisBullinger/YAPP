import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Library from '~/pages/Library'
import Feed from '~/pages/Feed'
import Discover from '~/pages/Discover'
import Profile from '~/pages/Profile'
import Settings from '~/pages/Settings'
import Lab from '~/pages/Lab'
// @ts-ignore
import labs from './pages/labs/**.*sx'
import NotFound from '~/pages/NotFound'

const Routes: React.FunctionComponent = () => (
  <Switch>
    <Route path="/" exact component={Library} />
    <Route path="/feed/" exact component={Feed} />
    <Route path="/discover/" exact component={Discover} />
    <Route path="/profile/" exact component={Profile} />
    <Route path="/settings/" exact component={Settings} />
    <Route path="/lab/" exact component={Lab} />
    {Object.values(labs)
      .map(m => Object.values(m)[0].default)
      .map(lab => (
        <Route
          key={lab.name}
          path={`/lab/${lab.name.toLowerCase()}`}
          exact
          component={lab}
        />
      ))}
    <Route component={NotFound} />
  </Switch>
)
export default Routes
