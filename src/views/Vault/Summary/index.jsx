import './index.less'

import { SettingOutlined } from '@ant-design/icons'
import { Card, Modal, Tabs } from 'antd'
import classnames from 'classnames'
import React, { useState } from 'react'
import CapTooltip from 'src/components/CapTooltip'
import { toPercentage } from 'src/utils/common'

import Config from '../Config'
import Investor from '../Investor'
import Transfer from '../Transfer'

const { TabPane } = Tabs

const Summary = ({ vaults, selectedVaultName, selectVaultName }) => {
  const [showGeneralOpe, setShowGeneralOpe] = useState(false)
  const [selectedVault, setSelectedVault] = useState(false)

  const hideVaultOpe = () => {
    setSelectedVault(null)
  }

  const hideGeneralOpe = () => {
    setShowGeneralOpe(false)
  }

  if (!vaults) {
    return null
  }
  return (
    <div className="vault-summary">
      <div className="vault-summary-vault">
        {vaults.map((vault) => {
          return (
            <Card
              key={vault.id}
              size="small"
              title={`${vault.name} Vault`}
              style={{ width: 300 }}
              onClick={() => selectVaultName(vault.name)}
              className={classnames({
                'vault-summary-selected': selectedVaultName === vault.name,
              })}
              extra={
                <span
                  className="vault-summary-vault-setting"
                  onClick={() => setSelectedVault(vault)}
                >
                  <SettingOutlined key="setting" />
                </span>
              }
            >
              <div>
                <div>Vault total</div>
                <div>
                  <CapTooltip title={vault.currentBalance}>
                    {vault.currentBalance.toFixed(3)}
                  </CapTooltip>
                </div>
              </div>
              <div>
                <div>Uninvested</div>
                <div>
                  <CapTooltip title={vault.unallocated}>
                    {Number(vault.unallocated).toFixed(3)}
                  </CapTooltip>
                </div>
              </div>
              <div>
                <div>Share Price</div>
                <div>
                  <CapTooltip title={vault.sharePrice}>
                    {Number(vault.sharePrice).toFixed(3)}
                  </CapTooltip>
                </div>
              </div>
              <div>
                <div>Apy</div>
                <div>{toPercentage(vault.apy)}</div>
              </div>
            </Card>
          )
        })}
      </div>
      <div className="vault-summary-setting">
        <SettingOutlined
          key="setting"
          onClick={() => setShowGeneralOpe(true)}
        />
      </div>
      <Modal
        width={1000}
        title="Vault Operation"
        visible={!!selectedVault}
        // onOk={handleOk}
        onCancel={hideVaultOpe}
      >
        <Tabs className="vault-detail" defaultActiveKey="1" type="card">
          <TabPane tab="Transfer In/Out" key="1">
            <Transfer vault={selectedVault} />
          </TabPane>
          <TabPane tab="Configuration" key="2">
            <Config vaultName={selectedVaultName} />
          </TabPane>
        </Tabs>
      </Modal>
      <Modal
        width={1000}
        title="General Operation"
        visible={showGeneralOpe}
        // onOk={handleOk}
        onCancel={hideGeneralOpe}
      >
        <Tabs className="vault-detail" defaultActiveKey="1" type="card">
          <TabPane tab="Investors" key="1">
            <Investor />
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  )
}

export default Summary
