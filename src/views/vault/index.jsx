import './index.less'

import React from 'react'
import VaultSummary from './VaultSummary'
import { Tabs } from 'antd'

const { TabPane } = Tabs

const Vaults = () => {
  return (
    <div className="page">
      <VaultSummary></VaultSummary>
      <Tabs className="vault-detail" defaultActiveKey="1" type="card">
        <TabPane tab="Strategies" key="1">
          Content of card tab 1
        </TabPane>
        <TabPane tab="Card Tab 2" key="2">
          Content of card tab 2
        </TabPane>
        <TabPane tab="Card Tab 3" key="3">
          Content of card tab 3
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Vaults
