import './index.less'

import classnames from 'classnames'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as appAction from 'src/actions/app'
import ErrorBoundary from 'src/components/ErrorBoundary'
import Header from 'src/views/App/Header'

import Router from '../Router'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(appAction.getVaults(dispatch, true))
    dispatch(appAction.getConfigs())
    dispatch(appAction.getInvestors())
    dispatch(appAction.getInvestorTxs())
  }, [dispatch])

  return (
    <div className={classnames('app')}>
      <Header />
      <main>
        <ErrorBoundary>
          <Router />
        </ErrorBoundary>
      </main>
    </div>
  )
}

export default App
