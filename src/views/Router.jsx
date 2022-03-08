import React from 'react'
import { Redirect, Switch } from 'react-router'
import { Route } from 'react-router-dom'

import Position from './position'
import PositionHistory from './positionHistory'

export const routes = [
  {
    path: '/positions/:id',
    comp: PositionHistory,
  },
  {
    path: '/positions',
    comp: Position,
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
        pathname: '/positions',
      }}
    />
  </Switch>
)

export default Router
