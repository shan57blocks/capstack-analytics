import './index.less'

import React, { useState } from 'react'
import Summary from './Summary'
import { Tabs } from 'antd'
import Strategy from './Strategy'
import Investor from './Investor'
import Transfer from './Transfer'
import Config from './Config'
import Suggest from './Suggest'
import Profit from './Profit'
import { VAULT } from './const'
import { useSelector } from 'react-redux'

const { TabPane } = Tabs

const Vaults = () => {
  const { vaults } = useSelector((state) => state.app)
  const [selectedVaultName, setSelectedVaultName] = useState(VAULT.ETH)
  const vault = vaults?.find((vault) => vault.name === selectedVaultName)

  return (
    <div className="page">
      <Summary
        selectedVaultName={selectedVaultName}
        selectVaultName={setSelectedVaultName}
      ></Summary>
      <Tabs className="vault-detail" defaultActiveKey="2" type="card">
        <TabPane tab="Strategies" key="1">
          <Strategy />
        </TabPane>
        <TabPane tab="Profit Distribution" key="2">
          <Profit />
        </TabPane>
        <TabPane tab="Investment Suggestion" key="3">
          <Suggest vault={vault} />
        </TabPane>
        <TabPane tab="Investors" key="4">
          <Investor />
        </TabPane>
        <TabPane tab="Transfers In/Out" key="5">
          <Transfer />
        </TabPane>
        <TabPane tab="Configuration" key="6">
          <Config vaultName={selectedVaultName} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Vaults
