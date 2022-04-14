import React from 'react'
import CapTooltip from 'src/components/CapTooltip'
import { formatTime } from 'src/utils/common'

export const positionColumns = [
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
      const { IL, ilApy } = position.currentHistory
      return (
        <div>
          <div>
            <CapTooltip title={IL}>${IL.toFixed(3)}</CapTooltip>
          </div>
          <div>Loss: {(ilApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Rewards',
    render: (position) => {
      const { rewardValue, rewardsApy, rewards } = position.currentHistory
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
            <CapTooltip title={rewardValue}>
              ${rewardValue.toFixed(3)}
            </CapTooltip>
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
      const { netValue, netApy } = position.currentHistory
      return (
        <div>
          <div>
            <CapTooltip title={netValue}>${netValue.toFixed(3)}</CapTooltip>
          </div>
          <div>APY: {(netApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
]
