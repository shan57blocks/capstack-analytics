import './index.less'

import { Button, message, Modal, Spin, Table } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as appAction from 'src/actions/app'
import vaultService from 'src/service/vault'
import { BN } from 'src/utils/common'

import { VAULT_STATUS } from '../const'

const { confirm } = Modal

const Profit = ({ vault }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const enterWithdrawalSettling = async () => {
    try {
      setLoading(true)
      await vaultService.enterWithdrawalSettling(vault.id)
      dispatch(appAction.getVaults())
      message.success(`Entering investment suggestion successfully.`)
    } finally {
      setLoading(false)
    }
  }

  const confirmEnterWithdrawalSettling = () => {
    confirm({
      title: 'Are you sure to enter withdrawal settling?',
      content:
        'After enter withdrawal settling, the profit will be distributed and the share price will be recalculated.',
      onOk() {
        enterWithdrawalSettling()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  if (!vault) {
    return null
  }

  if (vault.status !== VAULT_STATUS.ProfitDistributing) {
    return <div>Please first confirm the close of all the postions.</div>
  }

  return (
    <div className="vault-profit">
      <div className="vault-profit-action">
        <Button type="primary" onClick={confirmEnterWithdrawalSettling}>
          Next Step: Withdrawal Settling
        </Button>
      </div>
      <div className="vault-profit-title">Summary</div>
      <Table
        className="vault-profit-summary"
        columns={summaryColumns}
        dataSource={[vault]}
        bordered
        rowKey="id"
        pagination={false}
      />

      <div className="vault-profit-title">Detail</div>
      <Table
        columns={strategyColumns}
        dataSource={vault?.strategies}
        bordered
        rowKey="id"
        pagination={false}
      />
      {loading && <Spin />}
    </div>
  )
}

export default Profit

const summaryColumns = [
  {
    title: 'Principals',
    dataIndex: 'principals',
    key: 'principals',
  },
  {
    title: 'Total Profit',
    render: (_, record) => {
      let profit = BN(0)
      record.strategies.forEach((strategy) => {
        profit = profit.plus(BN(strategy.profit))
      })
      return <div>{profit.toString()}</div>
    },
  },
  {
    title: 'Total Management Fee',
    render: (_, record) => {
      let fee = BN(0)
      record.strategies.forEach((strategy) => {
        if (strategy.managementFee) {
          fee = fee.plus(BN(strategy.managementFee))
        }
      })
      return <div>{fee.toString()}</div>
    },
  },
  {
    title: 'Total Performance Fee',
    render: (_, record) => {
      let fee = BN(0)
      record.strategies.forEach((strategy) => {
        if (strategy.performanceFee) {
          fee = fee.plus(BN(strategy.performanceFee))
        }
      })
      return <div>{fee.toString()}</div>
    },
  },
  {
    title: 'Total Fee',
    render: (_, record) => {
      let fee = BN(0)
      record.strategies.forEach((strategy) => {
        if (strategy.performanceFee) {
          fee = fee.plus(BN(strategy.performanceFee))
        }
        if (strategy.managementFee) {
          fee = fee.plus(BN(strategy.managementFee))
        }
      })
      return <div>{fee.toString()}</div>
    },
  },
]

const strategyColumns = [
  {
    title: 'Strategy',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Principals',
    dataIndex: 'principals',
    key: 'principals',
  },
  {
    title: 'Current',
    dataIndex: 'unallocated',
    key: 'unallocated',
  },
  {
    title: 'Profit',
    dataIndex: 'profit',
    key: 'profit',
  },
]
