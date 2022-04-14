import './index.less'

import React from 'react'
import VaultSummary from './VaultSummary'
import { Tabs } from 'antd'
import Strategy from './Strategy'
import Investor from './Investor'
import Transfer from './Transfer'
import Config from './Config'
import CalcDifference from './CalcDifference'
import Profit from './Profit'

const { TabPane } = Tabs

const Vaults = () => {
  return (
    <div className="page">
      <VaultSummary></VaultSummary>
      <Tabs className="vault-detail" defaultActiveKey="1" type="card">
        <TabPane tab="Strategies" key="1">
          <Strategy />
        </TabPane>
        <TabPane tab="Profit Distribution" key="2">
          <Profit />
        </TabPane>
        <TabPane tab="Calc Difference" key="3">
          <CalcDifference />
        </TabPane>
        <TabPane tab="Investors" key="4">
          <Investor />
        </TabPane>
        <TabPane tab="Transfers In/Out" key="5">
          <Transfer />
        </TabPane>
        <TabPane tab="Configuration" key="6">
          <Config />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Vaults
