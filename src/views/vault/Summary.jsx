import './index.less'

import { Table } from 'antd'
import React from 'react'

const Summary = ({ vault }) => {
  return (
    <Table
      columns={columns}
      dataSource={[vault]}
      pagination={false}
      rowKey="id"
      bordered
    />
  )
}

export default Summary

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
    render: (balance) => <span>{balance ?? ''}</span>,
  },
  {
    title: 'Net Estimated',
    key: 'netBalance',
    dataIndex: 'netBalance',
    render: (balance) => <span>{balance ?? ''}</span>,
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
