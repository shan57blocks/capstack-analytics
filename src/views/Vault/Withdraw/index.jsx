import './index.less'

import { Button, message, Modal, Spin, Table } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as appAction from 'src/actions/app'
import vaultService from 'src/service/vault'
import { formatTime } from 'src/utils/common'

import { InvestStatus, VAULT_STATUS } from '../const'

const { confirm } = Modal

const Withdraw = ({ vault }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { investorTxs, investors } = useSelector((state) => state.app)

  const enterDepositSettling = async () => {
    try {
      setLoading(true)
      await vaultService.enterDepositSettling(vault.id)
      dispatch(appAction.getVaults())
      message.success(`Entering investment suggestion successfully.`)
    } finally {
      setLoading(false)
    }
  }

  const confirmDepositSettling = () => {
    confirm({
      title: 'Are you sure to enter deposit settling?',
      content:
        'After enter strategy operating, all the withdrawals will be settled.',
      onOk() {
        enterDepositSettling()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  if (!investorTxs || !investors || !vault) {
    return null
  }

  if (vault.status !== VAULT_STATUS.WithdrawalSettling) {
    return <div>Please first confirm the profit distribution.</div>
  }

  const txs = investorTxs.filter((item) => {
    return item.status === InvestStatus.WithdrawlRequested
  })

  return (
    <div className="vault-withdrawal">
      <div className="vault-withdrawal-action">
        <Button
          className="vault-withdrawal-action-settle"
          onClick={confirmDepositSettling}
          type="primary"
        >
          Next Step: Deposit Settlement
        </Button>
      </div>
      <Table
        columns={getColumns(investors)}
        dataSource={txs}
        bordered
        rowKey="id"
      />
      {loading && <Spin />}
    </div>
  )
}

export default Withdraw

const getColumns = (investors) => [
  {
    title: 'Investor',
    dataIndex: 'investorId',
    key: 'investorId',
    render: (investorId) => {
      const investor = investors.find((investor) => investor.id === investorId)
      return <div>{investor.name}</div>
    },
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount) => {
      return <span>{amount}</span>
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Request Date',
    dataIndex: 'requestTime',
    key: 'requestTime',
    render: (requestTime) => {
      return <div>{formatTime(requestTime, 'MM/DD/YYYY HH:mm')}</div>
    },
  },
]
