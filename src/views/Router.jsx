import React from 'react'
import { Redirect, Switch } from 'react-router'
import { Route } from 'react-router-dom'

import Position from './position'
import PositionHistory from './positionHistory'

export const routes = [
  {
    path: '/defi',
    comp: Position,
  },
  {
    path: '/defi/pool/:id',
    comp: PositionHistory,
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
