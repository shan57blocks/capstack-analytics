import React from 'react'
import { Redirect, Switch } from 'react-router'
import { Route } from 'react-router-dom'

import Defi from './defi'
import Pool from './pool'

export const routes = [
  {
    path: '/defi',
    comp: Defi,
  },
  {
    path: '/defi/pool',
    comp: Pool,
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
        pathname: '/defi',
      }}
    />
  </Switch>
)

export default Router
