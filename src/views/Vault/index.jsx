import './index.less'

import { Tabs } from 'antd'
import React, { useState } from 'react'

import Config from './Config'
import { VAULT } from './const'
import { useVault } from './hooks/useVault'
import Investor from './Investor'
import Profit from './Profit'
import Strategy from './Strategy'
import Suggest from './Suggest'
import Summary from './Summary'
import TransferIn from './TransferIn'
import { useStatus } from './hooks/useStatus'
import TransferOut from './TransferOut'

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
        <TabPane tab="Transfers In" key="0">
          <TransferIn vault={vault} />
        </TabPane>
        <TabPane tab="Investment Suggestion" key="3">
          <Suggest vault={vault} status={status} />
        </TabPane>
        <TabPane tab="Strategies" key="1">
          <Strategy vault={vault} />
        </TabPane>
        <TabPane tab="Profit Distribution" key="2">
          <Profit vault={vault} status={status} />
        </TabPane>
        <TabPane tab="Transfers Out" key="5">
          <TransferOut vault={vault} />
        </TabPane>
        <TabPane tab="Investors" key="4">
          <Investor />
        </TabPane>
        <TabPane tab="Configuration" key="6">
          <Config vaultName={selectedVaultName} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Vaults
