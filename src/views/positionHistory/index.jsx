import './index.less'

import { Table } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import * as appAction from 'src/actions/app'
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

const PositionHistory = () => {
  const dispatch = useDispatch()
  const { id: positionId } = useParams()
  const { position } = useSelector((state) => state.app)

  useEffect(() => {
    dispatch(appAction.getPositionHistory(positionId))
  }, [dispatch, positionId])

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
