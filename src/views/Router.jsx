import React from 'react'
import { Redirect, Switch } from 'react-router'
import { Route } from 'react-router-dom'

import Vaults from './Vault'

export const routes = [
  {
    path: '/vaults',
    comp: Vaults,
  },
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
