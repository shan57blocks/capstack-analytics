import './index.less'

import { Table } from 'antd'
import React from 'react'
import { formatTime } from 'src/utils/common'
import CapTooltip from 'src/components/CapTooltip'

const Strategy = ({ strategies }) => {
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
          <div>Loss: {(record.ILLoss * 100).toFixed(2)}%</div>
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

const positionColumns = [
  {
    title: 'Principals',
    render: (position) => {
      const { principals, tokens } = position
      return (
        <div>
          {principals.map((principal, index) => {
            return (
              <div key={index}>
                <CapTooltip title={principal.balance}>
                  {principal.balance.toFixed(3)} {tokens[index].symbol}
                </CapTooltip>
              </div>
            )
          })}
        </div>
      )
    },
  },
  {
    title: 'Start Position',
    render: (position) => {
      return (
        <div>
          {position.startAssets.map((asset, index) => {
            const { startBorrows, tokens } = position
            return (
              <div key={index}>
                <CapTooltip title={asset.balance}>
                  {asset.balance.toFixed(3)} {tokens[index].symbol}
                </CapTooltip>
                <CapTooltip title={startBorrows[index].balance}>
                  ({startBorrows[index].balance.toFixed(3)} Borrow)
                </CapTooltip>
              </div>
            )
          })}
          <div>
            Leverage: {position.leverage.toFixed(1)}X (
            {formatTime(Number(position.openDate))})
          </div>
        </div>
      )
    },
  },
  {
    title: 'Current Position',
    render: (position) => {
      const { tokens } = position
      const { assets, borrows, timestamp } = position.currentHistory
      return (
        <div>
          <>
            {assets.map((asset, index) => {
              return (
                <div key={index}>
                  <CapTooltip title={asset.balance}>
                    {asset.balance.toFixed(3)} {tokens[index].symbol}
                  </CapTooltip>
                  <CapTooltip title={borrows[index].balance}>
                    ({borrows[index].balance.toFixed(3)} Borrow)
                  </CapTooltip>
                </div>
              )
            })}
          </>
          <div>{formatTime(timestamp, 'MM/DD/YYYY HH:mm')}</div>
        </div>
      )
    },
  },
  {
    title: 'Current Value',
    render: (position) => {
      const { assets } = position.currentHistory
      return (
        <div>
          {assets.map((asset, index) => {
            return (
              <div key={index}>
                <CapTooltip title={asset.balance * asset.price}>
                  ${(asset.balance * asset.price).toFixed(3)}
                </CapTooltip>
              </div>
            )
          })}
        </div>
      )
    },
  },
  {
    title: 'Interest',
    render: (position) => {
      const { interest, interestApy } = position.currentHistory
      return (
        <div>
          <div>
            <CapTooltip title={interest}>${interest.toFixed(3)}</CapTooltip>
          </div>
          <div>APY: {(interestApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Yield + Price change + Slippage + Swapping fees',
    render: (position) => {
      const { fee, feeApy } = position.currentHistory
      return (
        <div>
          <div>
            <CapTooltip title={fee}>${fee.toFixed(3)}</CapTooltip>
          </div>
          <div>APY: {(feeApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'IL',
    render: (position) => {
      const { IL, ILLoss } = position.currentHistory
      return (
        <div>
          <div>
            <CapTooltip title={IL}>${IL.toFixed(3)}</CapTooltip>
          </div>
          <div>Loss: {(ILLoss * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Rewards',
    render: (position) => {
      const { rewardInfo, rewardsApy, rewards } = position.currentHistory
      return (
        <div>
          {rewards.map((reward) => {
            return (
              <div key={reward.symbol}>
                <CapTooltip title={reward.balance}>
                  {reward.balance.toFixed(3)} {reward.symbol}
                </CapTooltip>
              </div>
            )
          })}
          <div>
            <CapTooltip title={rewardInfo}>${rewardInfo.toFixed(3)}</CapTooltip>
          </div>
          <div>APY: {(rewardsApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Net Without IL',
    render: (position) => {
      const { netWithoutIL, netWithoutIlApy } = position.currentHistory
      return (
        <div>
          <div>
            <CapTooltip title={netWithoutIL}>
              ${netWithoutIL.toFixed(3)}
            </CapTooltip>
          </div>
          <div>APY: {(netWithoutIlApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Net',
    render: (position) => {
      const { net, netApy } = position.currentHistory
      return (
        <div>
          <div>
            <CapTooltip title={net}>${net.toFixed(3)}</CapTooltip>
          </div>
          <div>APY: {(netApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
]
