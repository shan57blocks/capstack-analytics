import './index.less'

import { LeftCircleOutlined } from '@ant-design/icons'
import { Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { mapPosition } from 'src/utils/apy'
import { BN, formatTime } from 'src/utils/common'
import CsvDownload from 'react-json-to-csv'
import positionService from 'src/service/position'
import CapTooltip from 'src/components/CapTooltip'
import useParamsSearch from 'src/hooks/useParamsSearch'

const PositionHistory = () => {
  const history = useHistory()
  const { id: postionId } = useParams()
  const { strategyTokenId } = useParamsSearch()
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

  const getTokenPrice = (position) => {
    const tokenIndex = pool.tokens.findIndex(
      (token) => token.id === Number(strategyTokenId)
    )
    return position.assets[tokenIndex].price
  }

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
          filename={`${pool.name}.csv`}
          style={{}}
        >
          Download
        </CsvDownload>
      </div>
      <Table
        rowKey="timestamp"
        columns={getHistoryColumns(pool.tokens, getTokenPrice)}
        dataSource={position.histories}
        size="small"
      />
    </div>
  )
}

export default PositionHistory

const getHistoryColumns = (tokens, getTokenPrice) => [
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
    title: 'Current Position',
    render: (position) => {
      const { assets, borrows, timestamp } = position
      return (
        <div>
          <>
            {assets.map((asset, index) => {
              return (
                <div key={index}>
                  <CapTooltip title={asset.balance}>
                    {Number(asset.balance).toFixed(3)} {asset.symbol}
                  </CapTooltip>
                  <CapTooltip title={borrows[index].balance}>
                    ({Number(borrows[index].balance).toFixed(3)} Borrow)
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
    title: 'Interest',
    render: (history) => {
      const { interest, interestApy } = history
      const tokenPrice = getTokenPrice(history)
      const interestAmount = BN(interest).div(tokenPrice).toNumber()
      return (
        <div>
          <div>
            <CapTooltip title={interestAmount}>
              {interestAmount.toFixed(3)}
            </CapTooltip>
          </div>
          <div>APY: {(interestApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Yield + Price change + Slippage + Swapping fees',
    render: (history) => {
      const { fee, feeApy } = history
      const tokenPrice = getTokenPrice(history)
      const feeAmount = BN(fee).div(tokenPrice).toNumber()
      return (
        <div>
          <div>
            <CapTooltip title={feeAmount}>{feeAmount.toFixed(3)}</CapTooltip>
          </div>
          <div>APY: {(feeApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'IL',
    render: (history) => {
      const { IL, ilApy } = history
      const tokenPrice = getTokenPrice(history)
      const ILAmount = BN(IL).div(tokenPrice).toNumber()
      return (
        <div>
          <div>
            <CapTooltip title={ILAmount}>{ILAmount.toFixed(3)}</CapTooltip>
          </div>
          <div>APY: {(ilApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'rewards',
    render: (history) => {
      const { rewards, rewardValue, rewardsApy } = history
      const tokenPrice = getTokenPrice(history)
      const rewardAmount = BN(rewardValue).div(tokenPrice).toNumber()
      return (
        <div>
          {rewards.map((reward, index) => {
            return (
              <div key={index}>
                {Number(reward.balance).toFixed(3)} {reward.symbol}
              </div>
            )
          })}
          <div>
            <CapTooltip title={rewardAmount}>
              {rewardAmount.toFixed(3)}
            </CapTooltip>
          </div>
          <div>APY: {(rewardsApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Net Without IL',
    render: (history) => {
      const { netWithoutIL, netWithoutIlApy } = history
      const tokenPrice = getTokenPrice(history)
      const netWithoutILAmount = BN(netWithoutIL).div(tokenPrice).toNumber()
      return (
        <div>
          <div>
            <CapTooltip title={netWithoutILAmount}>
              {netWithoutILAmount.toFixed(3)}
            </CapTooltip>
          </div>
          <div>APY: {(netWithoutIlApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Net',
    render: (history) => {
      const { netValue, netApy } = history
      const tokenPrice = getTokenPrice(history)
      const netValueAmount = BN(netValue).div(tokenPrice).toNumber()
      return (
        <div>
          <div>
            <CapTooltip title={netValueAmount}>
              {netValueAmount.toFixed(3)}
            </CapTooltip>
          </div>
          <div>APY: {(netApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
]
