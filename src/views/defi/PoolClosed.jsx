import { Table } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'
import {
  getApyRow,
  getClosedApyRow,
  getExitRow,
  getExitValueRow,
  getPoolNameRow,
  getPrincipalRow,
} from 'src/utils/tableUtil'

const PoolClosed = ({ positionInfo }) => {
  const { protocol, positions } = positionInfo
  const history = useHistory()

  return (
    <div className="position-pool">
      <div className="position-pool-name">{protocol.name} (Closed)</div>
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

export default PoolClosed

const getColumns = (history) => [
  getPoolNameRow(history),
  getPrincipalRow(),
  getExitRow(),
  getExitValueRow(),
  getClosedApyRow('Rewards', 'exitReward'),
  getClosedApyRow('Net', 'exitNet'),
]
