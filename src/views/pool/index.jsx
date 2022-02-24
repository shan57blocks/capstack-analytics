import { Table } from 'antd'
import React from 'react'
import { useParams } from 'react-router'
import { formatTime } from 'src/utils/common'
import usePosition from '../defi/hooks/usePosition'

const symbolMap = {
  '0x50b7545627a5162f82a992c33b87adc75187b218': 'WBTC.e',
  '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7': 'WAVAX',
  '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab': 'WETH.e',
  '0xc7198437980c041c805a1edcba50c1ce5db95118': 'USDT.e',
  '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664': 'USDC.e',
  '0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd': 'JOE',
}

const Pool = () => {
  const { id: poolId } = useParams()
  const positions = usePosition()
  const position = positions?.positions.find(
    (position) => position.poolId === Number(poolId)
  )
  const columns = [
    {
      title: 'Date',
      dataIndex: 'timestamp',
      render: (timestamp) => <div>{formatTime(timestamp)}</div>,
    },
    {
      title: 'Current Position',
      render: (_, history) => {
        const { assets, borrows } = history
        return (
          <div>
            {assets.map((asset, index) => {
              const symbol = symbolMap[asset.address.toLowerCase()]
              return (
                <div key={symbol}>
                  {asset.balance.toFixed(3)} {symbol} (
                  {borrows[index].balance.toFixed(3)} Borrow)
                </div>
              )
            })}
          </div>
        )
      },
    },
    {
      title: 'Borrow',
      render: (_, history) => {
        const { borrows } = history
        return (
          <div>
            {borrows.map((borrow) => {
              const symbol = symbolMap[borrow.address.toLowerCase()]
              return (
                <div key={symbol}>
                  {borrow.balance.toFixed(3)} {symbol}
                </div>
              )
            })}
          </div>
        )
      },
    },
    {
      title: 'Value',
      render: (_, history) => {
        const { assets } = history
        return (
          <div>
            {assets.map((asset) => {
              const symbol = symbolMap[asset.address.toLowerCase()]
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
      render: (_, history) => {
        return (
          <div>
            <div>${history.interest.yearToDate.toFixed(3)}</div>
            <div>APY: {(history.interest.apy * 100).toFixed(2)}%</div>
          </div>
        )
      },
    },
    {
      title: 'Fee',
      render: (_, history) => {
        return (
          <div>
            <div>${history.fee.yearToDate.toFixed(3)}</div>
            <div>APY: {(history.fee.apy * 100).toFixed(2)}%</div>
          </div>
        )
      },
    },
    {
      title: 'IL',
      render: (_, history) => {
        return (
          <div>
            <div>${history.IL.yearToDate.toFixed(3)}</div>
            <div>APY: {(history.IL.apy * 100).toFixed(2)}%</div>
          </div>
        )
      },
    },
    {
      title: 'Rewards',
      render: (_, history) => {
        return (
          <div>
            <div>${history.rewardInfo.yearToDate.toFixed(3)}</div>
            <div>APY: {(history.rewardInfo.apy * 100).toFixed(2)}%</div>
          </div>
        )
      },
    },
    {
      title: 'Net without IL',
      render: (_, history) => {
        return (
          <div>
            <div>${history.netWithoutIL.yearToDate.toFixed(3)}</div>
            <div>APY: {(history.netWithoutIL.apy * 100).toFixed(2)}%</div>
          </div>
        )
      },
    },
    {
      title: 'Net',
      render: (_, history) => {
        return (
          <div>
            <div>${history.net.yearToDate.toFixed(3)}</div>
            <div>APY: {(history.net.apy * 100).toFixed(2)}%</div>
          </div>
        )
      },
    },
  ]

  if (!positions) return null

  return (
    <div className="page">
      <div style={{ fontSize: 20, marginBottom: 10 }}>
        {position?.pool.name} (Alpha Homora V2)
      </div>
      <div>
        <div
          style={{
            fontSize: 16,
            marginBottom: 10,
            fontWeight: 'bold',
          }}
        >
          Summary
        </div>
        <Summary></Summary>
        <div
          style={{
            fontSize: 16,
            marginTop: 20,
            marginBottom: 10,
            fontWeight: 'bold',
          }}
        >
          History
        </div>
        <Table columns={columns} dataSource={position.histories} size="small" />
      </div>
    </div>
  )
}

export default Pool

const Summary = () => {
  const { id: poolId } = useParams()
  const positions = usePosition()
  const columns = [
    {
      title: 'Principal',
      dataIndex: 'principals',
      render: (principals) => (
        <div>
          {principals.map((principal) => {
            const symbol = symbolMap[principal.address.toLowerCase()]
            return (
              <div key={symbol}>
                {principal.balance.toFixed(3)} {symbol}
              </div>
            )
          })}
        </div>
      ),
    },
    {
      title: 'Start Position',
      render: (_, position) => (
        <div>
          <>
            {position.principals.map((principal, index) => {
              const { borrows } = position
              const symbol = symbolMap[principal.address.toLowerCase()]
              return (
                <div key={symbol}>
                  {(principal.balance + borrows[index].balance).toFixed(3)}{' '}
                  {principal.symbol} ({borrows[index].balance.toFixed(3)}{' '}
                  Borrow)
                </div>
              )
            })}
          </>
          <div>
            Leverage: {position.leverage.toFixed(1)}X (
            {formatTime(Number(position.openDate))})
          </div>
        </div>
      ),
    },
    {
      title: 'Current Position',
      render: (_, position) => {
        const { assets, borrows, timestamp } = position.currentHistory
        return (
          <div>
            <>
              {assets.map((asset, index) => {
                const symbol = symbolMap[asset.address.toLowerCase()]
                return (
                  <div key={symbol}>
                    {asset.balance.toFixed(3)} {symbol} (
                    {borrows[index].balance.toFixed(3)} Borrow)
                  </div>
                )
              })}
            </>
            <div>{formatTime(timestamp, 'MM/DD/YYYY HH:MM')}</div>
          </div>
        )
      },
    },
    {
      title: 'Current Value',
      render: (_, position) => {
        const { assets } = position.currentHistory
        return (
          <div>
            {assets.map((asset) => {
              const symbol = symbolMap[asset.address.toLowerCase()]
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
      render: (_, position) => {
        const { currentHistory } = position
        return (
          <div>
            <div>${currentHistory.interest.yearToDate.toFixed(3)}</div>
            <div>APY: {(currentHistory.interest.apy * 100).toFixed(2)}%</div>
          </div>
        )
      },
    },
    {
      title: 'Fee',
      render: (_, position) => {
        const { currentHistory } = position
        return (
          <div>
            <div>${currentHistory.fee.yearToDate.toFixed(3)}</div>
            <div>APY: {(currentHistory.fee.apy * 100).toFixed(2)}%</div>
          </div>
        )
      },
    },
    {
      title: 'IL',
      render: (_, position) => {
        const { currentHistory } = position
        return (
          <div>
            <div>${currentHistory.IL.yearToDate.toFixed(3)}</div>
            <div>APY: {(currentHistory.IL.apy * 100).toFixed(2)}%</div>
          </div>
        )
      },
    },
    {
      title: 'Rewards',
      render: (_, position) => {
        const { currentHistory } = position
        return (
          <div>
            <div>${currentHistory.rewardInfo.yearToDate.toFixed(3)}</div>
            <div>APY: {(currentHistory.rewardInfo.apy * 100).toFixed(2)}%</div>
          </div>
        )
      },
    },
    {
      title: 'Net without IL',
      render: (_, position) => {
        const { currentHistory } = position
        return (
          <div>
            <div>${currentHistory.netWithoutIL.yearToDate.toFixed(3)}</div>
            <div>
              APY: {(currentHistory.netWithoutIL.apy * 100).toFixed(2)}%
            </div>
          </div>
        )
      },
    },
    {
      title: 'Net',
      render: (_, position) => {
        const { currentHistory } = position
        return (
          <div>
            <div>${currentHistory.net.yearToDate.toFixed(3)}</div>
            <div>APY: {(currentHistory.net.apy * 100).toFixed(2)}%</div>
          </div>
        )
      },
    },
  ]

  if (!positions) return null

  return (
    <Table
      columns={columns}
      dataSource={positions.positions.filter(
        (position) => position.poolId === Number(poolId)
      )}
      pagination={false}
      size="small"
    />
  )
}
