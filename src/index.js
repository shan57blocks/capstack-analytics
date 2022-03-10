import 'antd/dist/antd.css'

import { ConfigProvider } from 'antd'
import enUS from 'antd/es/locale/en_US'
import { ConnectedRouter } from 'connected-react-router'
import { createHashHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import configStore from './store'
import App from './views/App'

const history = createHashHistory()
const store = configStore(history)

ReactDOM.render(
  <ConfigProvider locale={enUS}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
)
