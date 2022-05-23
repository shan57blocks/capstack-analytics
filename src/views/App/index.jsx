import './index.less'

import classnames from 'classnames'
import React from 'react'
import ErrorBoundary from 'src/components/ErrorBoundary'
import Header from 'src/views/App/Header'

import Router from '../Router'

const App = () => {
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
