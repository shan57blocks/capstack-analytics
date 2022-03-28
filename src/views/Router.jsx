import React from 'react'
import { Redirect, Switch } from 'react-router'
import { Route } from 'react-router-dom'

import Login from './Login'
import Vaults from './vault'

export const routes = [
  {
    path: '/vaults',
    comp: Vaults,
  },
  { path: '/login', comp: Login },
]

const Router = () => (
  <Switch>
    {routes.map((route) => {
      const { path, comp } = route
      return <Route key={path} path={path} exact component={comp} />
    })}
    <Redirect
      to={{
        pathname: '/vaults',
      }}
    />
  </Switch>
)

export default Router
