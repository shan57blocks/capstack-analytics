import './index.less'

import { LeftCircleOutlined } from '@ant-design/icons'
import { Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { mapPosition } from 'src/utils/apy'
import { BN, formatTime } from 'src/utils/common'
import CsvDownload from 'react-json-to-csv'
import positionService from 'src/service/position'

const PositionHistory = () => {
  const history = useHistory()
  const { id: postionId } = useParams()
  const [position, setPosition] = useState()

  useEffect(() => {
    const fetch = async () => {
      const position = await positionService.getPosition(postionId)
      setPosition(mapPosition(position))
    }
    fetch()
  }, [postionId])

  if (!position) {
    return <Spin className="cap-spin" />
  }

  const { pool } = position
  const downloadData = position.histories.map((history) => {
    const [asset0, asset1] = history.assets
    return {
      pool: pool.name,
      value0: asset0 ? BN(asset0.balance).times(asset0.price).toNumber() : null,
      value1: asset1 ? BN(asset1.balance).times(asset1.price).toNumber() : null,
      IL: history.IL,
    }
  })

  return (
    <div className="page position-history">
      <div className="page position-history-title">
        <div>
          <span
            className="page position-history-title-return"
            onClick={() => history.push('/vaults')}
          >
            <LeftCircleOutlined />
          </span>
          <span className="page position-history-title-text">
            {pool.name} ({pool.protocol.name}
          </span>
          <img width={30} src={pool.protocol.logo} alt="chain" />)
        </div>
        <CsvDownload
          className="position-history-title-download"
          data={downloadData}
          filename={`${pool}.csv`}
          style={{}}
        >
          Download
        </CsvDownload>
      </div>
      <Table
        rowKey="timestamp"
        columns={getHistoryColumns(pool.tokens)}
        dataSource={position.histories}
        size="small"
      />
    </div>
  )
}

export default PositionHistory

const getHistoryColumns = (tokens) => [
  {
    title: 'Date',
    dataIndex: 'timestamp',
    render: (timestamp) => <div>{formatTime(timestamp)}</div>,
  },
  {
    title: 'Position',
    render: (history) => {
      const { assets, borrows } = history
      return (
        <div>
          {assets.map((asset, index) => {
            const { symbol } = tokens[index]
            return (
              <div key={symbol}>
                {Number(asset.balance).toFixed(3)} {symbol} (
                {Number(borrows[index].balance).toFixed(3)} Borrow)
              </div>
            )
          })}
        </div>
      )
    },
  },
  {
    title: 'Value',
    render: (_, position) => {
      const { assets } = position
      return (
        <div>
          {assets.map((asset, index) => {
            const { symbol } = tokens[index]
            return (
              <div key={symbol}>
                ${(asset.balance * asset.price).toFixed(3)}
              </div>
            )
          })}
        </div>
      )
    },
  },
  {
    title: 'Interest',
    render: (history) => {
      const { interest, interestApy } = history
      return (
        <div>
          <div>${interest.toFixed(3)}</div>
          <div>APY: {(interestApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Yield + Price change + Slippage + Swapping fees',
    render: (history) => {
      const { fee, feeApy } = history
      return (
        <div>
          <div>${fee.toFixed(3)}</div>
          <div>APY: {(feeApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'IL',
    render: (history) => {
      const { IL, ilApy } = history
      return (
        <div>
          <div>${IL.toFixed(3)}</div>
          <div>APY: {(ilApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'rewards',
    render: (history) => {
      const { rewards, rewardValue, rewardsApy } = history
      return (
        <div>
          {rewards.map((reward, index) => {
            return (
              <div key={index}>
                {Number(reward.balance).toFixed(3)} {reward.symbol}
              </div>
            )
          })}
          <div>${rewardValue.toFixed(3)}</div>
          <div>APY: {(rewardsApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Net Without IL',
    render: (history) => {
      const { netWithoutIL, netWithoutIlApy } = history
      return (
        <div>
          <div>${netWithoutIL.toFixed(3)}</div>
          <div>APY: {(netWithoutIlApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Net',
    render: (history) => {
      const { netValue, netApy } = history
      return (
        <div>
          <div>${netValue.toFixed(3)}</div>
          <div>APY: {(netApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
]
