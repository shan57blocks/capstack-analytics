import { Table } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'
import {
  getApyRow,
  getCurrentPositionRow,
  getCurrentValueRow,
  getPoolNameRow,
  getPrincipalRow,
  getStartPositionRow,
} from 'src/utils/tableUtil'

const Pool = ({ positionInfo }) => {
  const { protocol, positions } = positionInfo
  const history = useHistory()

  return (
    <div className="position-pool">
      <div className="position-pool-name">{protocol.name}</div>
      <div>
        <Table
          columns={getColumns(history)}
          dataSource={positions}
          size="small"
        />
      </div>
    </div>
  )
}

export default Pool

const getColumns = (history) => [
  getPoolNameRow(history),
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
