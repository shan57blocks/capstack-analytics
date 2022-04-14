import '../index.less'

import { Table } from 'antd'
import React from 'react'

import { columns } from './Column'
import { positionColumns } from './PositionColumn'
import strategies from './strategies.json'

const Strategy = () => {
  return (
    <Table
      columns={columns}
      dataSource={strategies}
      pagination={false}
      rowKey="id"
      bordered
      expandable={expandable}
    />
  )
}

export default Strategy

const expandable = {
  expandedRowRender: (record) => (
    <div className="vault-strategies-positions">
      <div className="vault-strategies-positions-title">Positions</div>
      <Table
        columns={positionColumns}
        dataSource={record.positions}
        size="small"
        bordered
        pagination={false}
      />
    </div>
  ),
}
