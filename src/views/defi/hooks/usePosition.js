import { useSelector } from 'react-redux'
import { caseIgEqual } from 'src/utils/common'

const usePosition = () => {
  const {
    protocols,
    pools,
    positions,
    positionHistories,
    currentPositions,
  } = useSelector((state) => state.app)
  if (!positions || !protocols || !pools) {
    return {}
  }

  const totalHistories = positionHistories.concat(currentPositions)

  positions.forEach((position) => {
    calCloseApy(position)
  })

  totalHistories.forEach((history) => {
    const startPosition = positions.find(
      (position) => position.id === history.positionId
    )
    calApy(startPosition, history)
  })

  positions.forEach((position) => {
    const pool = pools.find((pool) => pool.id === position.poolId)
    position.pool = pool
    const histories = totalHistories.filter(
      (history) => history.positionId === position.id
    )
    position.histories = histories.sort(sortTimestamp)
    position.currentHistory = position.histories[0]
  })

  const result = []

  protocols.forEach((protocol) => {
    const protocolPools = pools.filter(
      (pool) => pool.protocolId === protocol.id
    )
    const protocolPositions = positions.filter(
      (position) => !!protocolPools.find((pool) => pool.id === position.poolId)
    )
    const activePositions = protocolPositions.filter(
      (position) => !position.exit
    )
    const closedPositions = protocolPositions.filter(
      (position) => position.exit
    )
    if (activePositions.length) {
      result.push({
        protocol,
        status: 'active',
        positions: activePositions,
      })
    }
    if (closedPositions.length) {
      result.push({
        protocol,
        status: 'closed',
        positions: closedPositions,
      })
    }
  })

  return { positionInfos: result, positions }
}

export default usePosition

const calApy = (startPosition, currentPosition) => {
  const startPrincipals = startPosition.principals
  const startBorrows = startPosition.borrows
  const startAssets = startPosition.principals.map((principal, index) => {
    const asset = { ...principal }
    asset.balance = principal.balance + startBorrows[index].balance
    return asset
  })

  const calculatedValue0 =
    Math.sqrt(
      (startAssets[0].balance *
        startAssets[1].balance *
        currentPosition.assets[1].price) /
        currentPosition.assets[0].price
    ) * currentPosition.assets[0].price
  const calculatedValue1 =
    Math.sqrt(
      (startAssets[0].balance *
        startAssets[1].balance *
        currentPosition.assets[0].price) /
        currentPosition.assets[1].price
    ) * currentPosition.assets[1].price
  const calculatedValues = {
    0: calculatedValue0,
    1: calculatedValue1,
  }

  const result = currentPosition.assets.map((currentAsset, index) => {
    const currentPrice = currentAsset.price
    const startPrincipal = startPrincipals[index]
    const startAsset = startAssets[index]
    const startBorrow = startBorrows[index]
    const currentBorrow = currentPosition.borrows[index]

    const currentPrincipal = currentAsset.balance - currentBorrow.balance
    const startValue = startAsset.balance * currentPrice
    const currentNetInvestment = currentPrincipal * currentPrice
    const currentIL = calculatedValues[index] - startValue
    const currentHoldValue = startPrincipal.balance * currentPrice
    const current_IL_fee_interest = currentNetInvestment - currentHoldValue
    const currentInterestBalance = currentBorrow.balance - startBorrow.balance
    const currentInterest = currentInterestBalance * currentPrice

    return {
      currentIL,
      current_IL_fee_interest,
      currentInterest,
      currentHoldValue,
    }
  })

  let IL = 0
  let IL_fee_interest = 0
  let holdValue = 0
  let interest = 0
  for (let i = 0; i < result.length; i++) {
    IL += result[i].currentIL
    IL_fee_interest += result[i].current_IL_fee_interest
    holdValue += result[i].currentHoldValue
    interest -= result[i].currentInterest
  }

  let rewardValue = 0
  for (let i = 0; i < currentPosition.rewards.length; i++) {
    const reward = currentPosition.rewards[i]
    rewardValue += reward.balance * reward.price
  }

  const diffInTime = currentPosition.timestamp - Number(startPosition.openDate)
  const diffInDays = diffInTime / (3600 * 24)
  const fee_interest = IL_fee_interest - IL
  const fee = fee_interest - interest
  const netWithoutIL = fee + rewardValue + interest
  const net = netWithoutIL + IL

  const get_daily_yearly_apy = (value) => {
    return {
      yearToDate: value,
      daily: value / diffInDays,
      yearly: (value / diffInDays) * 365,
      apy: ((value / diffInDays) * 365) / holdValue,
    }
  }

  currentPosition.IL = get_daily_yearly_apy(IL)
  currentPosition.interest = get_daily_yearly_apy(interest)
  currentPosition.fee = get_daily_yearly_apy(fee)
  currentPosition.rewardInfo = get_daily_yearly_apy(rewardValue)
  currentPosition.netWithoutIL = get_daily_yearly_apy(netWithoutIL)
  currentPosition.net = get_daily_yearly_apy(net)
}

const calCloseApy = (position) => {
  if (position.exit) {
    const { principals, exit, openDate, closeDate } = position
    const rewards = exit.filter((token) => token.type === 'rewards')
    const exitTokens = []
    principals.forEach((principal) => {
      const exitToken = exit.find((token) =>
        caseIgEqual(principal.address, token.address)
      )
      exitTokens.push(exitToken)
    })

    let holdValue = 0
    for (let i = 0; i < principals.length; i++) {
      holdValue += principals[i].balance * exitTokens[i].price
    }
    let exitValue = 0
    for (let i = 0; i < exitTokens.length; i++) {
      exitValue += exitTokens[i].balance * exitTokens[i].price
    }
    let rewardValue = 0
    for (let i = 0; i < rewards.length; i++) {
      rewardValue += rewards[i].balance * rewards[i].price
    }

    const diffInTime = Number(closeDate) - Number(openDate)
    const diffInDays = diffInTime / (3600 * 24)
    const net = exitValue + rewardValue - holdValue

    const get_daily_yearly_apy = (value) => {
      return {
        yearToDate: value,
        daily: value / diffInDays,
        yearly: (value / diffInDays) * 365,
        apy: ((value / diffInDays) * 365) / holdValue,
      }
    }

    position.exitTokens = exitTokens
    position.exitReward = get_daily_yearly_apy(rewardValue)
    position.exitNet = get_daily_yearly_apy(net)
  }
}

export const sortTimestamp = (a, b) => {
  if (a.timestamp < b.timestamp) {
    return 1
  }
  if (a.timestamp > b.timestamp) {
    return -1
  }
  return 0
}
