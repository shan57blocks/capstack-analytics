import React from 'react'
import CapTooltip from 'src/components/CapTooltip'
import { BN, formatTime } from 'src/utils/common'

export const getPositionColumns = (tokenPrice, strategyTokenId) => [
  {
    title: 'Principals',
    render: (position) => {
      const { principals } = position
      return (
        <div>
          {principals.map((principal, index) => {
            return (
              <div key={index}>
                <CapTooltip title={principal.balance}>
                  <a
                    href={`/#/position-history/${position.id}?strategyTokenId=${strategyTokenId}`}
                  >
                    {Number(principal.balance).toFixed(3)} {principal.symbol}
                  </a>
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
            const { startBorrows } = position
            return (
              <div key={index}>
                <CapTooltip title={asset.balance}>
                  {Number(asset.balance).toFixed(3)} {asset.symbol}
                </CapTooltip>
                <CapTooltip title={startBorrows[index].balance}>
                  ({Number(startBorrows[index].balance).toFixed(3)} Borrow)
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
      const { assets, borrows, timestamp } = position.currentHistory
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
    render: (position) => {
      const { interest, interestApy } = position.currentHistory
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
    render: (position) => {
      const { fee, feeApy } = position.currentHistory
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
    render: (position) => {
      const { IL, ilApy } = position.currentHistory
      const ILAmount = BN(IL).div(tokenPrice).toNumber()
      return (
        <div>
          <div>
            <CapTooltip title={ILAmount}>{ILAmount.toFixed(3)}</CapTooltip>
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
      const rewardAmount = BN(rewardValue).div(tokenPrice).toNumber()
      return (
        <div>
          {rewards.map((reward) => {
            return (
              <div key={reward.symbol}>
                <CapTooltip title={reward.balance}>
                  {Number(reward.balance).toFixed(3)} {reward.symbol}
                </CapTooltip>
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
    render: (position) => {
      const { netWithoutIL, netWithoutIlApy } = position.currentHistory
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
    render: (position) => {
      const { netValue, netApy } = position.currentHistory
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
