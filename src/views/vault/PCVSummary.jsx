import './index.less'

import { Table } from 'antd'
import React from 'react'

const PCVSummary = ({ vaults }) => {
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

export default PCVSummary

const columns = [
  {
    title: 'Token',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'Principals',
    key: 'principalsCalculated',
    dataIndex: 'principalsCalculated',
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
