import './index.less'

import { Table } from 'antd'
import React from 'react'
import {
  getApyRow,
  getBorrowRow,
  getClosedApyRow,
  getCurrentPositionRow,
  getCurrentValueRow,
  getDateRow,
  getExitRow,
  getExitValueRow,
  getPrincipalRow,
  getStartPositionRow,
  getValueRow,
} from 'src/utils/tableUtil'

import { usePositionHistory } from './hooks/usePositionHistory'

const PositionHistory = () => {
  const position = usePositionHistory()

  if (!position) return null

  return (
    <div className="page position-history">
      <div className="position-name">{position.symbol} (Alpha Homora V2)</div>
      <div>
        <div className="position-summary-title">Summary</div>
        <Summary position={position}></Summary>
        <div className="position-history-title">History</div>
        <Table columns={columns} dataSource={position.histories} size="small" />
      </div>
    </div>
  )
}

export default PositionHistory

const Summary = ({ position }) => {
  const columns = position.closed
    ? closedPositionColumns
    : activePositionColumns
  return (
    <Table
      columns={columns}
      dataSource={[position]}
      pagination={false}
      size="small"
    />
  )
}

const columns = [
  getDateRow(),
  getCurrentPositionRow(false),
  getBorrowRow(),
  getValueRow(),
  getApyRow('Interest', 'interest'),
  getApyRow('Fee', 'fee'),
  getApyRow('IL', 'IL'),
  getApyRow('Rewards', 'rewardInfo'),
  getApyRow('Net without IL', 'netWithoutIL'),
  getApyRow('Net', 'net'),
]

const activePositionColumns = [
  getPrincipalRow(),
  getStartPositionRow(),
  getCurrentPositionRow(),
  getCurrentValueRow(),
  getApyRow('Interest', 'interest'),
  getApyRow('Fee', 'fee'),
  getApyRow('IL', 'IL'),
  getApyRow('Rewards', 'rewardInfo'),
  getApyRow('Net without IL', 'netWithoutIL'),
  getApyRow('Net', 'net'),
]

const closedPositionColumns = [
  getPrincipalRow(),
  getExitRow(),
  getExitValueRow(),
  getClosedApyRow('Rewards', 'exitReward'),
  getClosedApyRow('Net', 'exitNet'),
]
