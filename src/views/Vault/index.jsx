import './index.less'

import { Tabs } from 'antd'
import React, { useState } from 'react'

import { VAULT } from './const'
import Deposit from './Deposit'
import { useStatus } from './hooks/useStatus'
import { useVault } from './hooks/useVault'
import Profit from './Profit'
import Strategy from './Strategy'
import Suggest from './Suggest'
import Summary from './Summary'
import Withdraw from './Withdraw'

const { TabPane } = Tabs

const Vaults = () => {
  const { vaults } = useVault()
  const status = useStatus()
  const [selectedVaultName, setSelectedVaultName] = useState(VAULT.ETH)
  const vault = vaults?.find((vault) => vault.name === selectedVaultName)

  return (
    <div className="page vault">
      <Summary
        vaults={vaults}
        selectedVaultName={selectedVaultName}
        selectVaultName={setSelectedVaultName}
      ></Summary>
      <Tabs className="vault-detail" defaultActiveKey="0" type="card">
        <TabPane tab="Deposit Settlement" key="0">
          <Deposit vault={vault} />
        </TabPane>
        <TabPane tab="Investment Suggestion" key="1">
          <Suggest vault={vault} status={status} />
        </TabPane>
        <TabPane tab="Strategies" key="2">
          <Strategy vault={vault} />
        </TabPane>
        <TabPane tab="Profit Distribution" key="3">
          <Profit vault={vault} status={status} />
        </TabPane>
        <TabPane tab="Withdrawl Settlement" key="4">
          <Withdraw vault={vault} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Vaults
