import './index.less'

import { Table } from 'antd'
import React from 'react'
import { scaleDown } from 'src/utils/common'

const Summary = ({ vault }) => {
  const { decimals } = vault.priceToken
  return (
    <Table
      columns={getColumns(decimals)}
      dataSource={[vault]}
      pagination={false}
      rowKey="id"
      bordered
    />
  )
}

export default Summary

const getColumns = (decimals) => [
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
    render: (_, record) => <span></span>,
  },
  {
    title: 'Apy Estimated',
    render: (_, record) => <span></span>,
  },
]
