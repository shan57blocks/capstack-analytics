import { Space, Tooltip } from 'antd'
import React from 'react'
import { formatTime, isEmpty } from 'src/utils/common'
import CapTooltip from 'src/components/CapTooltip'
import CapSkeleton from 'src/components/CapSkeleton'

export const getColumns = (showModal) => [
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
      if (record.ILBalance === -0.009832651864555158) {
        return (
          <div>
            <div>
              Current {(record.priceChange * 100).toFixed(2)}%:
              {record.ILBalance.toFixed(3)}({(record.ilApy * 100).toFixed(2)}%)
            </div>
            <div style={{ backgroundColor: '#eca9a9' }}>
              <div>Liquidation if ETH increases</div>
              <div> by 10% or ETH decreases by 20%</div>
            </div>
          </div>
        )
      }

      if (isEmpty(record.IL)) {
        return <CapSkeleton />
      }
      return (
        <div>
          <Tooltip title={record.ILBalance}>
            <div>
              Current {(record.priceChange * 100).toFixed(2)}%:
              {record.ILBalance.toFixed(3)}({(record.ilApy * 100).toFixed(2)}%)
            </div>
          </Tooltip>
          <Tooltip title={record.ILBalance50}>
            <div>
              +50%: {record.ILBalance50.toFixed(3)}(
              {(record.ILLoss50 * 100).toFixed(2)}%)
            </div>
          </Tooltip>
          <Tooltip title={record.ILBalance100}>
            <div>
              +100%: {record.ILBalance100.toFixed(3)}(
              {(record.ILLoss100 * 100).toFixed(2)}%)
            </div>
          </Tooltip>
          <Tooltip title={record.ILBalance50Neg}>
            <div>
              -50%: {record.ILBalance50Neg.toFixed(3)}(
              {(record.ILLoss50Neg * 100).toFixed(2)}%)
            </div>
          </Tooltip>
          <Tooltip title={record.ILBalance75Neg}>
            <div>
              -75%: {record.ILBalance75Neg.toFixed(3)}(
              {(record.ILLoss75Neg * 100).toFixed(2)}%)
            </div>
          </Tooltip>
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
        <div>
          <StrategyTooltip value={rewardValue} balance={rewardBalance}>
            <div>{rewardBalance.toFixed(3)}</div>
          </StrategyTooltip>
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
    title: 'Unharvested Assets',
    render: (_, record) => {
      if (record.ILBalance === -0.009832651864555158) {
        return <div style={{ backgroundColor: '#dbf9e5' }}>$2000</div>
      }

      return <div>$200</div>
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={showModal}>Open</a>
        <a onClick={showModal}>Adjust</a>
        <a onClick={showModal}>Close</a>
      </Space>
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
