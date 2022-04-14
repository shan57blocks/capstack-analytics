import './index.less'

import React from 'react'
import VaultSummary from './VaultSummary'
import { Tabs } from 'antd'
import Strategy from './Strategy'
import Investor from './Investor'
import Transfer from './Transfer'
import Config from './Config'
import CalcDifference from './CalcDifference'

const { TabPane } = Tabs

const Vaults = () => {
  return (
    <div className="page">
      <VaultSummary></VaultSummary>
      <Tabs className="vault-detail" defaultActiveKey="2" type="card">
        <TabPane tab="Strategies" key="1">
          <Strategy />
        </TabPane>
        <TabPane tab="Calc Difference" key="2">
          <CalcDifference />
        </TabPane>
        <TabPane tab="Investors" key="3">
          <Investor />
        </TabPane>
        <TabPane tab="Transfers In/Out" key="4">
          <Transfer />
        </TabPane>
        <TabPane tab="Configuration" key="5">
          <Config />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Vaults
