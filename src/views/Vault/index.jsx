import './index.less'

import { Tabs } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Config from './Config'
import { VAULT } from './const'
import Investor from './Investor'
import Profit from './Profit'
import Strategy from './Strategy'
import Suggest from './Suggest'
import Summary from './Summary'
import Transfer from './Transfer'
import { useVault } from './hooks/useVault'

const { TabPane } = Tabs

const Vaults = () => {
  const { vaults } = useVault()
  const [selectedVaultName, setSelectedVaultName] = useState(VAULT.ETH)
  const vault = vaults?.find((vault) => vault.name === selectedVaultName)

  return (
    <div className="page vault">
      <Summary
        selectedVaultName={selectedVaultName}
        selectVaultName={setSelectedVaultName}
      ></Summary>
      <Tabs className="vault-detail" defaultActiveKey="1" type="card">
        <TabPane tab="Strategies" key="1">
          <Strategy vault={vault} />
        </TabPane>
        <TabPane tab="Profit Distribution" key="2">
          <Profit vault={vault} />
        </TabPane>
        <TabPane tab="Investment Suggestion" key="3">
          <Suggest vault={vault} />
        </TabPane>
        <TabPane tab="Investors" key="4">
          <Investor />
        </TabPane>
        <TabPane tab="Transfers In/Out" key="5">
          <Transfer vault={vault} />
        </TabPane>
        <TabPane tab="Configuration" key="6">
          <Config vaultName={selectedVaultName} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Vaults
