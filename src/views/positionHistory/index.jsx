import { Table } from 'antd'
import React from 'react'
import { useParams } from 'react-router'
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
  const positions = null
  const position = null
  // const { id: poolId } = useParams()
  // const { positions } = usePositions()
  // const position = positions?.find(
  //   (position) => position.poolId === Number(poolId)
  // )

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

  if (!positions) return null

  return (
    <div className="page">
      <div style={{ fontSize: 20, marginBottom: 10 }}>
        {position?.pool.name} (Alpha Homora V2)
      </div>
      <div>
        <div
          style={{
            fontSize: 16,
            marginBottom: 10,
            fontWeight: 'bold',
          }}
        >
          Summary
        </div>
        <Summary position={position}></Summary>
        <div
          style={{
            fontSize: 16,
            marginTop: 20,
            marginBottom: 10,
            fontWeight: 'bold',
          }}
        >
          History
        </div>
        <Table columns={columns} dataSource={position.histories} size="small" />
      </div>
    </div>
  )
}

export default PositionHistory

const Summary = ({ position }) => {
  const columns = position.exit ? closedPoolColumns : activePoolColumns
  return (
    <Table
      columns={columns}
      dataSource={[position]}
      pagination={false}
      size="small"
    />
  )
}

const activePoolColumns = [
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

const closedPoolColumns = [
  getPrincipalRow(),
  getExitRow(),
  getExitValueRow(),
  getClosedApyRow('Rewards', 'exitReward'),
  getClosedApyRow('Net', 'exitNet'),
]
