import './index.less'

import { Spin } from 'antd'
import classnames from 'classnames'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as appAction from 'src/actions/app'
import ErrorBoundary from 'src/components/ErrorBoundary'
import Header from 'src/views/App/Header'

import Router from '../Router'

const App = () => {
  const dispatch = useDispatch()
  const { loading, selectedAccount } = useSelector((state) => state.app)

  useEffect(() => {
    dispatch(appAction.getProtocols())
    dispatch(appAction.getPools())
  }, [dispatch])

  useEffect(() => {
    dispatch(appAction.getPositions(selectedAccount))
  }, [dispatch, selectedAccount])

  return (
    <div className={classnames('app')}>
      <Header />
      <main>
        <ErrorBoundary>
          <Router />
        </ErrorBoundary>
      </main>
      {loading && <Spin />}
    </div>
  )
}

export default App
