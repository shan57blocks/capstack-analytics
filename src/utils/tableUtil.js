import React from 'react'
import { formatTime } from './common'

export const getDateRow = () => ({
  title: 'Date',
  dataIndex: 'timestamp',
  render: (timestamp) => <div>{formatTime(timestamp)}</div>,
})

export const getPositionNameRow = (history) => ({
  title: 'Position',
  render: (position) => {
    return (
      <a onClick={() => history.push(`/positions/${position.id}`)}>
        <span>{position.symbol}</span>
      </a>
    )
  },
})

export const getApyRow = (title, field) => ({
  title,
  render: (_, position) => {
    const apy = position.currentHistory || position
    return (
      <div>
        {field === 'rewardInfo' &&
          apy.rewards.map((reward) => {
            return (
              <div key={reward.symbol}>
                {reward.balance.toFixed(3)} {reward.symbol}
              </div>
            )
          })}
        <div>${apy[field].yearToDate.toFixed(3)}</div>
        <div>APY: {(apy[field].apy * 100).toFixed(2)}%</div>
      </div>
    )
  },
})

export const getClosedApyRow = (title, field) => ({
  title,
  render: (_, position) => {
    return (
      <div>
        {field === 'closeReward' &&
          position.closeAssets
            .filter((token) => token.type === 'rewards')
            .map((reward) => {
              return (
                <div key={reward.symbol}>
                  {reward.balance.toFixed(3)} {reward.symbol}
                </div>
              )
            })}
        <div>${position[field].yearToDate.toFixed(3)}</div>
        <div>APY: {(position[field].apy * 100).toFixed(2)}%</div>
      </div>
    )
  },
})

export const getPrincipalRow = () => ({
  title: 'Principal',
  render: (position) => {
    const { principals, tokens } = position
    return (
      <div>
        {principals.map((principal, index) => {
          return (
            <div key={index}>
              {principal.balance.toFixed(3)} {tokens[index].symbol}
            </div>
          )
        })}
      </div>
    )
  },
})

export const getStartPositionRow = () => ({
  title: 'Start Position',
  render: (position) => {
    return (
      <div>
        {position.startAssets.map((asset, index) => {
          const { borrows, tokens } = position
          return (
            <div key={index}>
              {asset.balance.toFixed(3)} {tokens[index].symbol} (
              {borrows[index].balance.toFixed(3)} Borrow)
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
})

export const getCurrentPositionRow = (showTime = true) => ({
  title: 'Current Position',
  render: (position) => {
    const { assets, borrows, timestamp } = position.currentHistory || position
    const { tokens } = position
    return (
      <div>
        <>
          {assets.map((asset, index) => {
            return (
              <div key={index}>
                {asset.balance.toFixed(3)} {tokens[index].symbol} (
                {borrows[index].balance.toFixed(3)} Borrow)
              </div>
            )
          })}
        </>
        {showTime && <div>{formatTime(timestamp, 'MM/DD/YYYY HH:mm')}</div>}
      </div>
    )
  },
})

export const getCurrentValueRow = () => ({
  title: 'Current Value',
  render: (position) => {
    const { assets } = position.currentHistory
    return (
      <div>
        {assets.map((asset, index) => {
          return (
            <div key={index}>${(asset.balance * asset.price).toFixed(3)}</div>
          )
        })}
      </div>
    )
  },
})

export const getValueRow = () => ({
  title: 'Value',
  render: (position) => {
    const { assets } = position
    return (
      <div>
        {assets.map((asset, index) => {
          return (
            <div key={index}>${(asset.balance * asset.price).toFixed(3)}</div>
          )
        })}
      </div>
    )
  },
})

export const getBorrowRow = () => ({
  title: 'Borrow',
  render: (position) => {
    const { borrows, tokens } = position
    return (
      <div>
        {borrows.map((borrow, index) => {
          const { symbol } = tokens[index]
          return (
            <div key={symbol}>
              {borrow.balance.toFixed(3)} {symbol}
            </div>
          )
        })}
      </div>
    )
  },
})

export const getCloseRow = () => ({
  title: 'Close Position',
  render: (position) => (
    <div>
      {position.closeTokens.map((token, index) => {
        const { symbol } = position.tokens[index]

        return (
          <div key={symbol}>
            {token.balance.toFixed(3)} {symbol}
          </div>
        )
      })}

      <div>{formatTime(Number(position.closeDate), 'MM/DD/YYYY HH:mm')}</div>
    </div>
  ),
})

export const getCloseValueRow = () => ({
  title: 'Close Value',
  render: (position) => {
    const { closeTokens } = position
    return (
      <div>
        {closeTokens.map((token, index) => {
          const { symbol } = position.tokens[index]
          return (
            <div key={symbol}>${(token.balance * token.price).toFixed(3)}</div>
          )
        })}
      </div>
    )
  },
})
