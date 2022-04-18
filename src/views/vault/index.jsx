import './index.less'

import React, { useState } from 'react'
import VaultSummary from './VaultSummary'
import { Tabs } from 'antd'
import Strategy from './Strategy'
import Investor from './Investor'
import Transfer from './Transfer'
import Config from './Config'
import CalcDifference from './CalcDifference'
import Profit from './Profit'
import { VAULT } from './const'

const { TabPane } = Tabs

const Vaults = () => {
  const [selectedVault, setSelectedVault] = useState(VAULT.ETH)

  return (
    <div className="page">
      <VaultSummary
        vault={selectedVault}
        selectVault={setSelectedVault}
      ></VaultSummary>
      <Tabs className="vault-detail" defaultActiveKey="6" type="card">
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
          <Config vault={selectedVault} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Vaults
