import './index.less'

import { Table } from 'antd'
import React from 'react'
import { formatTime, scaleDown } from 'src/utils/common'

const Strategy = ({ strategies, vault }) => {
  return (
    <Table
      columns={columns}
      dataSource={strategies}
      pagination={false}
      rowKey="id"
      bordered
    />
  )
}

export default Strategy

const columns = [
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
    key: 'principalsCalculated',
    dataIndex: 'principalsCalculated',
  },
  {
    title: 'Start Time',
    key: 'startTime',
    dataIndex: 'startTime',
    render: (startTime) => (
      <span>{formatTime(startTime, 'MM/DD/YYYY HH:mm')}</span>
    ),
  },
  {
    title: 'Current Estimated',
    key: 'currentBalance',
    dataIndex: 'currentBalance',
  },
  {
    title: 'Current Time',
    key: 'currentTime',
    dataIndex: 'currentTime',
    render: (currentTime) => (
      <span>{formatTime(currentTime, 'MM/DD/YYYY HH:mm')}</span>
    ),
  },
  {
    title: 'Net Estimated',
    key: 'netBalance',
    dataIndex: 'netBalance',
  },
  {
    title: 'Apy Estimated',
    key: 'netApy',
    dataIndex: 'netApy',
    render: (apy) => <span>{(apy * 100).toFixed(2)}%</span>,
  },
]
