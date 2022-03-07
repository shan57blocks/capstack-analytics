import { Table } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'
import {
  getClosedApyRow,
  getExitRow,
  getExitValueRow,
  getPoolNameRow,
  getPrincipalRow,
} from 'src/utils/tableUtil'

const PositionsClosed = ({ positionInfo }) => {
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

export default PositionsClosed

const getColumns = (history) => [
  getPoolNameRow(history),
  getPrincipalRow(),
  getExitRow(),
  getExitValueRow(),
  getClosedApyRow('Rewards', 'exitReward'),
  getClosedApyRow('Net', 'exitNet'),
]
