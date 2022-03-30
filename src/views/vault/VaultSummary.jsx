import './index.less'

import { Table } from 'antd'
import React from 'react'

const VaultSummary = ({ vaults }) => {
  return (
    <Table
      columns={columns}
      dataSource={vaults}
      pagination={false}
      rowKey="id"
      bordered
    />
  )
}

export default VaultSummary

const columns = [
  {
    title: 'Principals',
    key: 'principalsCalculated',
    dataIndex: 'principalsCalculated',
  },
  {
    title: 'Shares',
    key: 'sharesCalculated',
    dataIndex: 'sharesCalculated',
  },
  {
    title: 'Share Price',
    key: 'sharePriceCalculated',
    dataIndex: 'sharePriceCalculated',
  },
  {
    title: 'Current Estimated',
    key: 'currentBalance',
    dataIndex: 'currentBalance',
    render: (balance) => <span>{!Number.isNaN(balance) ? balance : ''}</span>,
  },
  {
    title: 'Net Estimated',
    key: 'netBalance',
    dataIndex: 'netBalance',
    render: (balance) => <span>{!Number.isNaN(balance) ? balance : ''}</span>,
  },
  {
    title: 'Apy Estimated',
    key: 'apy',
    dataIndex: 'apy',
    render: (apy) => {
      if (!apy) {
        return null
      }
      return <span>{(apy * 100).toFixed(2)}%</span>
    },
  },
]
