import './index.less'

import React from 'react'
import VaultSummary from './VaultSummary'
import { Tabs } from 'antd'
import Strategy from './Strategy'
import Investor from './Investor'

const { TabPane } = Tabs

const Vaults = () => {
  return (
    <div className="page">
      <VaultSummary></VaultSummary>
      <Tabs className="vault-detail" defaultActiveKey="2" type="card">
        <TabPane tab="Strategies" key="1">
          <Strategy />
        </TabPane>
        <TabPane tab="Investors" key="2">
          <Investor />
        </TabPane>
        <TabPane tab="Transfers In/Out" key="3">
          Content of card tab 3
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Vaults
