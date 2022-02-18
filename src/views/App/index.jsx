import './index.less'

import { Spin } from 'antd'
import classnames from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'
import ErrorBoundary from 'src/components/ErrorBoundary'
import Header from 'src/views/App/Header'

import Router from '../Router'

const App = () => {
  const { loading } = useSelector((state) => state.app)

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
