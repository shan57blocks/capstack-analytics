import { Table } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'
import {
  getApyRow,
  getCurrentPositionRow,
  getCurrentValueRow,
  getPositionNameRow,
  getPrincipalRow,
  getStartPositionRow,
} from 'src/utils/tableUtil'

const Positions = ({ protocolPosition }) => {
  const history = useHistory()
  const { protocol, positions } = protocolPosition

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

export default Positions

const getColumns = (history) => [
  getPositionNameRow(history),
  getPrincipalRow(),
  getStartPositionRow(),
  getCurrentPositionRow(),
  getCurrentValueRow(),
  getApyRow('Interest', 'interest'),
  getApyRow(
    'Fee + Price + Swapping',
    'fee',
    'Fee includes price change impact and swapping impact'
  ),
  getApyRow('IL', 'IL'),
  getApyRow('Rewards', 'rewardInfo'),
  getApyRow('Net without IL', 'netWithoutIL'),
  getApyRow('Net', 'net'),
]
