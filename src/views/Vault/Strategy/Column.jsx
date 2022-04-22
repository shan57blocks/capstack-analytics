import { Tooltip } from 'antd'
import classnames from 'classnames'
import React from 'react'
import CapSkeleton from 'src/components/CapSkeleton'
import CapTooltip from 'src/components/CapTooltip'
import { formatTime, isEmpty, toPercentage } from 'src/utils/common'

export const getColumns = (showModal, harvestLimit, liquidationLimit) => [
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
      if (isEmpty(record.principalsCalculated)) {
        return <CapSkeleton />
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
      if (isEmpty(record.currentBalance)) {
        return <CapSkeleton />
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
    title: 'Interest',
    key: 'interest',
    dataIndex: 'interest',
    render: (_, record) => {
      if (isEmpty(record.interest)) {
        return <CapSkeleton />
      }
      const { interest, interestBalance, interestApy } = record
      return (
        <div>
          <StrategyTooltip value={interest} balance={interestBalance}>
            <div>{interestBalance.toFixed(3)}</div>
          </StrategyTooltip>
          <div>APY: {(interestApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Fee',
    key: 'fee',
    dataIndex: 'fee',
    render: (_, record) => {
      if (isEmpty(record.fee)) {
        return <CapSkeleton />
      }
      const { fee, feeBalance, feeApy } = record
      return (
        <div>
          <StrategyTooltip value={fee} balance={feeBalance}>
            <div>{feeBalance.toFixed(3)}</div>
          </StrategyTooltip>
          <div>APY: {(feeApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'IL',
    key: 'IL',
    dataIndex: 'IL',
    render: (_, record) => {
      if (isEmpty(record.IL)) {
        return <CapSkeleton />
      }

      const liquidationGap = Number(liquidationLimit) / 100
      const getLiquidation = () => {
        if (!record.positions[0].debtRatio) {
          return null
        }

        let priceChanges = []
        let isAlert = false
        record.positions.forEach((position) => {
          const { liquidationPricePercentages = [] } = position.debtRatio || {}
          liquidationPricePercentages.forEach((priceChange) => {
            const priceChangeNum = Math.abs(Number(priceChange))
            if (priceChangeNum <= liquidationGap) {
              isAlert = true
            }
            priceChanges.push(priceChange)
          })
        })
        priceChanges = priceChanges.sort((a, b) => Number(a) > Number(b))

        return (
          <div className={classnames({ 'liquidation-alert': isAlert })}>
            Liquidation if{' '}
            {priceChanges.map((change, index) => {
              const direction = change > 0 ? 'increases' : 'decreases'
              const or = index < priceChanges.length - 1 ? ' or ' : ''
              return (
                <span key={index}>
                  ETH {direction} by {toPercentage(change)} {or}
                </span>
              )
            })}
          </div>
        )
      }

      return (
        <div>
          <Tooltip title={record.ILBalance}>
            <div>
              {(record.priceChange * 100).toFixed(2)}%:{' '}
              {record.ILBalance.toFixed(3)} ({(record.ilApy * 100).toFixed(2)}%)
            </div>
          </Tooltip>
          {getLiquidation()}
        </div>
      )
    },
  },
  {
    title: 'Rewards',
    key: 'rewardValue',
    dataIndex: 'rewardValue',
    render: (_, record) => {
      if (isEmpty(record.rewardValue)) {
        return <CapSkeleton />
      }
      const { rewardValue, rewardBalance, rewardsApy } = record
      return (
        <div
          className={classnames({
            'reward-harvest-limit': Number(harvestLimit) <= Number(rewardValue),
          })}
        >
          <CapTooltip title={rewardBalance}>
            <div>{rewardBalance.toFixed(3)}</div>
          </CapTooltip>
          <div>
            <CapTooltip title={rewardValue}>
              <div>${rewardValue.toFixed(3)}</div>
            </CapTooltip>
          </div>
          <div>APY: {(rewardsApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Net Without IL',
    key: 'netWithoutIL',
    dataIndex: 'netWithoutIL',
    render: (_, record) => {
      if (isEmpty(record.netWithoutIL)) {
        return <CapSkeleton />
      }
      const { netWithoutIL, netWithoutILBalance, netWithoutIlApy } = record
      return (
        <div>
          <StrategyTooltip value={netWithoutIL} balance={netWithoutILBalance}>
            <div>{netWithoutILBalance.toFixed(3)}</div>
          </StrategyTooltip>
          <div>APY: {(netWithoutIlApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Net Apy Estimated',
    key: 'netApy',
    dataIndex: 'netApy',
    render: (_, record) => {
      if (isEmpty(record.netValue)) {
        return <CapSkeleton />
      }
      const { netValue, netBalance, netValueYearly, netBalanceYearly } = record
      const currentTitle = () => {
        return (
          <>
            <div>{netBalance}</div>
            <div>${netValue}</div>
          </>
        )
      }
      const yearlyTitle = () => {
        return (
          <>
            <div>{netBalanceYearly}</div>
            <div>${netValueYearly}</div>
          </>
        )
      }
      const apyTitle = () => {
        return (
          <>
            <div>
              50% IL: {((record.netApy + record.ILLoss50) * 100).toFixed(2)}%
            </div>
            <div>
              100% IL: {((record.netApy + record.ILLoss100) * 100).toFixed(2)}%
            </div>
            <div>
              -50% IL: {((record.netApy + record.ILLoss50Neg) * 100).toFixed(2)}
              %
            </div>
            <div>
              -75% IL: {((record.netApy + record.ILLoss75Neg) * 100).toFixed(2)}
              %
            </div>
          </>
        )
      }
      return (
        <div>
          <Tooltip title={currentTitle}>
            <div>Current: {netBalance.toFixed(3)}</div>
          </Tooltip>
          <Tooltip title={yearlyTitle}>
            <div>Yearly: {netBalanceYearly.toFixed(3)}</div>
          </Tooltip>
          <Tooltip title={apyTitle}>
            <div>APY: {(record.netApy * 100).toFixed(2)}%</div>
          </Tooltip>
        </div>
      )
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <div className="action">
        <a onClick={showModal}>Harvest</a>
        <a onClick={showModal}>Adjust</a>
        <a onClick={showModal}>Close</a>
      </div>
    ),
  },
]

const StrategyTooltip = ({ value, balance, children }) => {
  const title = () => {
    return (
      <>
        <div>{balance}</div>
        <div>${value}</div>
      </>
    )
  }

  return (
    <Tooltip title={title}>
      <span>{children}</span>
    </Tooltip>
  )
}
