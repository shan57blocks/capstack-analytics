import './index.less'

import { Button, message, Modal, Spin, Table } from 'antd'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as appAction from 'src/actions/app'
import { BN, formatTime } from 'src/utils/common'
import vaultService from 'src/views/service/vault'

import { InvestStatus, VAULT_STATUS } from '../const'

const { confirm } = Modal

const Deposit = ({ vault }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { investorTxs, investors } = useSelector((state) => state.app)

  const enterPositionOpening = async () => {
    try {
      setLoading(true)
      await vaultService.enterPositionOpening(vault.id)
      dispatch(appAction.getInvestorTxs())
      dispatch(appAction.getVaults())
      message.success(`Entering investment suggestion successfully.`)
    } finally {
      setLoading(false)
    }
  }

  const confirmEnterPositionOpening = () => {
    confirm({
      title: 'Are you sure to enter investment suggestion?',
      content:
        'Entering investment suggestion will first settle all the deposits and move the balance to vault.',
      onOk() {
        enterPositionOpening()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const [txs, totalInvestRequested] = useMemo(() => {
    if (!investorTxs) {
      return []
    }

    const txs = investorTxs.filter(
      (tx) => tx.status === InvestStatus.InvestRequested
    )
    let totalInvestRequested = BN(0)
    txs.forEach((tx) => {
      totalInvestRequested = totalInvestRequested.plus(BN(tx.amount))
    })

    return [txs, totalInvestRequested.toString()]
  }, [investorTxs])

  if (!investorTxs || !investors || !vault) {
    return null
  }

  return (
    <div className="vault-deposit">
      <div className="vault-deposit-action">
        {vault.status === VAULT_STATUS.DepositSettling && (
          <Button
            className="vault-deposit-action-settle"
            onClick={confirmEnterPositionOpening}
            type="primary"
          >
            Next Step: Investment Suggestion
          </Button>
        )}
        <span>Total Invest Requested: {totalInvestRequested}</span>
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

export default Deposit

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
