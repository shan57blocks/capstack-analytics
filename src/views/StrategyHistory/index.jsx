import './index.less'

import { LeftCircleOutlined } from '@ant-design/icons'
import { Spin, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import CapSkeleton from 'src/components/CapSkeleton'
import CapTooltip from 'src/components/CapTooltip'
import useParamsSearch from 'src/hooks/useParamsSearch'
import positionService from 'src/service/position'
import vaultService from 'src/service/vault'
import { mapPosition, mapStrategy } from 'src/utils/apy'
import { deepClone, formatTime, isEmpty } from 'src/utils/common'

const StrategyHistory = () => {
  const history = useHistory()
  const { id: strategyId } = useParams()
  const { positionIds } = useParamsSearch()
  const [strategy, setStrategy] = useState()
  const [strategyHistories, setStrategyHistories] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const strategy = await vaultService.getStrategy(strategyId)
      const ids = positionIds.split(',')
      const positions = await Promise.all(
        ids.map((id) => positionService.getPosition(id))
      )
      strategy.positions = positions.map((position) => {
        return mapPosition(position)
      })
      const strategyHistories = []
      strategyHistories.push(deepClone(mapStrategy(strategy)))
      const dateKeys = positions[0].histories.map((history) => history.dateKey)
      dateKeys.forEach((dateKey) => {
        const histories = []
        positions.forEach((position) => {
          const history = position.histories.find(
            (history) => history.dateKey === dateKey
          )
          if (history) {
            history.currentHistory = deepClone(history)
            history.startAssets = position.startAssets
            history.openDate = position.openDate
            histories.push(history)
          }
        })
        strategy.positions = histories
        strategyHistories.push(deepClone(mapStrategy(strategy)))
      })
      setStrategy(strategy)
      setStrategyHistories(strategyHistories)
    }
    fetch()
  }, [positionIds, strategyId])

  if (!strategyHistories.length) {
    return <Spin className="cap-spin" />
  }

  const { pool } = strategy

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
      </div>
      <Table
        rowKey="timestamp"
        columns={getHistoryColumns()}
        dataSource={strategyHistories}
        size="small"
      />
    </div>
  )
}

export default StrategyHistory

const getHistoryColumns = () => [
  {
    title: 'Date',
    dataIndex: 'currentTime',
    render: (currentTime) => <div>{formatTime(currentTime)}</div>,
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
    title: 'Net Estimated',
    key: 'netBalance',
    dataIndex: 'netBalance',
    render: (_, record) => {
      if (isEmpty(record.netBalance)) {
        return <CapSkeleton />
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
    title: 'Yield + Price change + Slippage + Swapping fees',
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

      return (
        <div>
          <Tooltip title={record.ILBalance}>
            <div>
              {(record.priceChange * 100).toFixed(2)}%:{' '}
              {record.ILBalance.toFixed(3)} ({(record.ilApy * 100).toFixed(2)}%)
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
            <div>Yearly: {netBalanceYearly?.toFixed(3)}</div>
          </Tooltip>
          <Tooltip title={apyTitle}>
            <div>APY: {(record.netApy * 100).toFixed(2)}%</div>
          </Tooltip>
        </div>
      )
    },
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
