import { Table } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'
import {
  getClosedApyRow,
  getCloseRow,
  getCloseValueRow,
  getPositionNameRow,
  getPrincipalRow,
} from 'src/utils/tableUtil'

const PositionsClosed = ({ protocolPosition }) => {
  const history = useHistory()
  const { protocol, positions } = protocolPosition

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
  getPositionNameRow(history),
  getPrincipalRow(),
  getCloseRow(),
  getCloseValueRow(),
  getClosedApyRow('Rewards', 'closeReward'),
  getClosedApyRow('Net', 'closeNet'),
]
