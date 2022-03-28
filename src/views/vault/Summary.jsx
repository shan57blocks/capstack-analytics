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
  },
  {
    title: 'Net Estimated',
    key: 'netBalance',
    dataIndex: 'netBalance',
  },
  {
    title: 'Apy Estimated',
    key: 'apy',
    dataIndex: 'apy',
    render: (apy) => <span>{(apy * 100).toFixed(2)}%</span>,
  },
]
