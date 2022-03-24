import './index.less'

import { Table } from 'antd'
import React from 'react'
import { formatTime, scaleDown } from 'src/utils/common'

const Strategy = ({ strategies, vault }) => {
  const { decimals } = vault.priceToken
  return (
    <Table
      columns={getColumns(decimals)}
      dataSource={strategies}
      pagination={false}
      bordered
    />
  )
}

export default Strategy

const getColumns = (decimals) => [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'Chain',
    render: (_, record) => {
      const [position = {}] = record.positions
      return <span>{position.protocol?.chain}</span>
    },
  },
  {
    title: 'Protocol',
    render: (_, record) => {
      const [position = {}] = record.positions
      return <span>{position.protocol?.name}</span>
    },
  },
  {
    title: 'Principals',
    render: (_, record) => (
      <span>{scaleDown(record.principals, decimals)}</span>
    ),
  },
  {
    title: 'Start Time',
    render: (_, record) => {
      const [position] = record.positions
      return (
        <span>
          {position ? formatTime(position.openDate, 'MM/DD/YYYY HH:mm') : ''}
        </span>
      )
    },
  },
  {
    title: 'Current Estimated',
    render: (_, record) => <span></span>,
  },
  {
    title: 'Current Time',
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
