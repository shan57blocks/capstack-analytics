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
    key: 'principals',
    render: (_, record) => (
      <span>{scaleDown(record.principals, decimals)}</span>
    ),
  },
  {
    title: 'Shares',
    key: 'shares',
    render: (_, record) => <span>{scaleDown(record.shares, decimals)}</span>,
  },
  {
    title: 'Share Price',
    key: 'shares',
    render: (_, record) => <span>{record.principals / record.shares}</span>,
  },
  {
    title: 'Current Estimated',
    render: (_, record) => <span></span>,
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
