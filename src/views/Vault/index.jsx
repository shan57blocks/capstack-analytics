import './index.less'

import { Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import * as appAction from 'src/actions/app'
import useParamsSearch from 'src/hooks/useParamsSearch'

import { VAULT, VAULT_STATUS } from './const'
import Deposit from './Deposit'
import Profit from './Profit'
import Strategy from './Strategy'
import Suggest from './Suggest'
import Summary from './Summary'
import Withdraw from './Withdraw'

const { TabPane } = Tabs

const vaultStatusTab = {
  [VAULT_STATUS.DepositSettling]: '0',
  [VAULT_STATUS.PositionOpening]: '1',
  [VAULT_STATUS.Operating]: '2',
  [VAULT_STATUS.ProfitDistributing]: '3',
  [VAULT_STATUS.WithdrawalSettling]: '4',
}

const Vaults = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { vaults } = useSelector((state) => state.app)
  const { vaultName = VAULT.ETH } = useParamsSearch()
  const [activeKey, setActiveKey] = useState()
  const vault = vaults?.find((vault) => vault.name === vaultName) || {}

  useEffect(() => {
    dispatch(appAction.getVaults(dispatch, true))
    dispatch(appAction.getConfigs())
    dispatch(appAction.getInvestors())
    dispatch(appAction.getInvestorTxs())
  }, [dispatch])

  useEffect(() => {
    setActiveKey(vaultStatusTab[vault.status])
  }, [vault.status])

  const changeActiveKey = (newActiveKey) => {
    setActiveKey(newActiveKey)
  }

  const selectVaultName = (vaultName) => {
    history.push(`/vaults?vaultName=${vaultName}`)
  }

  if (!vaults) {
    return null
  }

  return (
    <div className="page vault">
      <Summary
        vaults={vaults}
        selectedVaultName={vaultName}
        selectVaultName={selectVaultName}
      ></Summary>
      <Tabs
        className={`vault-detail ${vault?.status}`}
        activeKey={activeKey}
        onChange={changeActiveKey}
        type="card"
      >
        <TabPane tab="Deposit Settlement" key="0">
          <Deposit vault={vault} />
        </TabPane>
        <TabPane tab="Investment Suggestion" key="1">
          <Suggest vault={vault} />
        </TabPane>
        <TabPane tab="Strategies" key="2">
          <Strategy vault={vault} />
        </TabPane>
        <TabPane tab="Profit Distribution" key="3">
          <Profit vault={vault} />
        </TabPane>
        <TabPane tab="Withdrawal Settlement" key="4">
          <Withdraw vault={vault} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Vaults
