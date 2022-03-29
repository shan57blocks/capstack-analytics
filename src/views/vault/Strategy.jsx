import './index.less'

import { Table } from 'antd'
import React from 'react'
import { formatTime } from 'src/utils/common'
import CapTooltip from 'src/components/CapTooltip'

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
    title: 'Protocol',
    render: (_, record) => {
      const [position = {}] = record.positions
      return (
        <div>
          <div>{position.protocol?.name}</div>
          <div>({position.protocol?.chain})</div>
        </div>
      )
    },
  },
  {
    title: 'Principals',
    key: 'principalsCalculated',
    render: (_, record) => {
      if (!record.principalsCalculated) {
        return null
      }
      return (
        <div>
          <CapTooltip title={record.principalsCalculated}>
            <div>{record.principalsCalculated.toFixed(3)}</div>
          </CapTooltip>
          <div>{formatTime(record.startTime, 'MM/DD/YYYY HH:mm')}</div>
        </div>
      )
    },
  },
  {
    title: 'Current Estimated',
    key: 'currentBalance',
    dataIndex: 'currentBalance',
    render: (_, record) => {
      if (!record.currentBalance) {
        return null
      }
      return (
        <div>
          <CapTooltip title={record.currentBalance}>
            <div>{record.currentBalance.toFixed(3)}</div>
          </CapTooltip>
          <div>{formatTime(record.currentTime, 'MM/DD/YYYY HH:mm')}</div>
        </div>
      )
    },
  },
  {
    title: 'Net Estimated',
    key: 'netBalance',
    dataIndex: 'netBalance',
    render: (_, record) => {
      if (!record.netBalance) {
        return null
      }
      return (
        <div>
          <CapTooltip title={record.netBalance}>
            <div>{record.netBalance.toFixed(3)}</div>
          </CapTooltip>
          <CapTooltip title={record.netValue}>
            <div>${record.netValue?.toFixed(3)}</div>
          </CapTooltip>
        </div>
      )
    },
  },
  {
    title: 'Interest',
    key: 'interest',
    dataIndex: 'interest',
    render: (_, record) => {
      if (!record.interest) {
        return null
      }
      return (
        <div>
          <CapTooltip title={record.interest}>
            <div>${record.interest.toFixed(3)}</div>
          </CapTooltip>
          <div>APY: {(record.interestApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Yield + Price change + Slippage + Swapping fees',
    key: 'fee',
    dataIndex: 'fee',
    render: (_, record) => {
      if (!record.fee) {
        return null
      }
      return (
        <div>
          <CapTooltip title={record.fee}>
            <div>${record.fee.toFixed(3)}</div>
          </CapTooltip>
          <div>APY: {(record.feeApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'IL',
    key: 'IL',
    dataIndex: 'IL',
    render: (_, record) => {
      if (!record.IL) {
        return null
      }
      return (
        <div>
          <CapTooltip title={record.IL}>
            <div>${record.IL.toFixed(3)}</div>
          </CapTooltip>
          <div>APY: {(record.ilApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Rewards',
    key: 'rewardInfo',
    dataIndex: 'rewardInfo',
    render: (_, record) => {
      if (!record.rewardInfo) {
        return null
      }
      return (
        <div>
          <CapTooltip title={record.rewardInfo}>
            <div>${record.rewardInfo.toFixed(3)}</div>
          </CapTooltip>
          <div>APY: {(record.rewardsApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Net Without IL',
    key: 'netWithoutIL',
    dataIndex: 'netWithoutIL',
    render: (_, record) => {
      if (!record.netWithoutIL) {
        return null
      }
      return (
        <div>
          <CapTooltip title={record.netWithoutIL}>
            <div>${record.netWithoutIL.toFixed(3)}</div>
          </CapTooltip>
          <div>APY: {(record.netWithoutIlApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Net Apy Estimated',
    key: 'netApy',
    dataIndex: 'netApy',
    render: (_, record) => {
      if (!record.netValue) {
        return null
      }
      return (
        <div>
          <CapTooltip title={record.netValue}>
            <div>${record.netValue.toFixed(3)}</div>
          </CapTooltip>
          <div>APY: {(record.netApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
]
