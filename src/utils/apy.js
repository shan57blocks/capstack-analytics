import _ from 'lodash'
import { BN } from './common'

export const calApy = (startPosition, currentPosition) => {
  const startPrincipals = startPosition.principals
  const startBorrows = startPosition.startBorrows
  const startAssets = startPosition.startAssets

  const calculatedValues = {
    0: null,
    1: null,
  }
  if (startAssets.length === 2) {
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
    calculatedValues['0'] = calculatedValue0
    calculatedValues['1'] = calculatedValue1
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
    const currentIL = calculatedValues[index]
      ? calculatedValues[index] - startValue
      : 0
    const currentHoldValue = startPrincipal.balance * currentPrice
    const current_IL_fee_interest = currentNetInvestment - currentHoldValue
    const currentInterestBalance = currentBorrow.balance - startBorrow.balance
    const currentInterest = currentInterestBalance * currentPrice
    const currentFeeInterest = current_IL_fee_interest - currentIL
    const currentFee = currentFeeInterest - currentInterest
    const currentValue = currentAsset.balance * currentPrice

    return {
      startAsset,
      currentIL,
      current_IL_fee_interest,
      currentInterest,
      currentHoldValue,
      currentFeeInterest,
      currentFee,
      currentValue,
      tokenId: currentPosition.tokens[index].id,
    }
  })

  let IL = 0
  let IL_fee_interest = 0
  let holdValue = 0
  let interest = 0
  let currentValue = 0
  for (let i = 0; i < result.length; i++) {
    IL += result[i].currentIL
    IL_fee_interest += result[i].current_IL_fee_interest
    holdValue += result[i].currentHoldValue
    interest -= result[i].currentInterest
    currentValue += result[i].currentValue
  }

  let rewardValue = 0
  for (let i = 0; i < currentPosition.rewards.length; i++) {
    const reward = currentPosition.rewards[i]
    rewardValue += reward.balance * reward.price
  }

  const fee_interest = IL_fee_interest - IL
  const fee = fee_interest - interest
  const netWithoutIL = fee + rewardValue + interest
  const net = netWithoutIL + IL

  currentPosition.holdValue = holdValue
  currentPosition.IL_fee_interest = IL_fee_interest
  currentPosition.IL = IL
  currentPosition.interest = interest
  currentPosition.ILLoss = IL / currentValue
  currentPosition.fee = fee
  currentPosition.rewardInfo = rewardValue
  currentPosition.netWithoutIL = netWithoutIL
  currentPosition.net = net
  currentPosition.tokenDetails = result
  currentPosition.netRatio = net / holdValue

  const diffInTime = currentPosition.timestamp - Number(startPosition.openDate)
  const diffInDays = diffInTime / (3600 * 24)
  const getApy = (value) => ((value / diffInDays) * 365) / holdValue

  currentPosition.ilApy = getApy(currentPosition.IL)
  currentPosition.interestApy = getApy(currentPosition.interest)
  currentPosition.feeApy = getApy(currentPosition.fee)
  currentPosition.rewardsApy = getApy(currentPosition.rewardInfo)
  currentPosition.netWithoutIlApy = getApy(currentPosition.netWithoutIL)
  currentPosition.netApy = getApy(currentPosition.net)

  currentPosition.tokenDetails = result.map((item, index) => {
    item.currentNet =
      item.startAsset.balance *
      currentPosition.netRatio *
      currentPosition.assets[index].price
    item.currentRewardInfo = currentPosition.rewardInfo / result.length
    item.currentIL = currentPosition.IL / result.length
    item.currentILLoss = currentPosition.ILLoss / result.length
    item.currentNetWithoutIL = currentPosition.netWithoutIL / result.length
    return item
  })

  return currentPosition
}

export const mapPosition = (position) => {
  position.symbol = position.tokens.map((token) => token.symbol).join('/')
  position.histories = position.histories
    .map((history) => {
      if (!history.borrows) {
        history.borrows = genBorrows(history.assets.length)
      }
      if (!history.rewards) {
        history.rewards = []
      }
      history.tokens = position.tokens
      return calApy(position, history)
    })
    .sort(sortTimestamp)
  position.currentHistory = position.histories[0]
  return position
}

export const mapStrategy = (strategy, positions, positionStrategies) => {
  const token = positions[0].tokens.find(
    (token) => token.id === strategy.tokenId
  )
  const decimals = `1e${token.decimals}`
  let startTime = positions[0].openDate
  let currentTime = positions[0].currentHistory.timestamp

  strategy.interestApy = 0
  strategy.feeApy = 0
  strategy.ilApy = 0
  strategy.rewardsApy = 0
  strategy.netWithoutIlApy = 0
  strategy.netApy = 0
  strategy.interest = 0
  strategy.fee = 0
  strategy.IL = 0
  strategy.ILLoss = 0
  strategy.rewardInfo = 0
  strategy.netWithoutIL = 0
  strategy.netBalance = 0
  strategy.netValue = 0
  strategy.holdValue = 0

  positions.forEach((position) => {
    const { currentHistory, tokens } = position

    if (position.openDate < startTime) {
      startTime = position.openDate
    }
    if (currentHistory.timestamp > currentTime) {
      currentTime = currentHistory.timestamp
    }

    const index = tokens.findIndex((token) => token.id === strategy.tokenId)
    const tokenPrice = currentHistory.assets[index].price

    if (positionStrategies[position.id].length > 1) {
      const tokenDetail = currentHistory.tokenDetails.find(
        (item) => item.tokenId === tokens[index].id
      )
      strategy.interest += tokenDetail.currentInterest
      strategy.fee += tokenDetail.currentFee
      strategy.IL += tokenDetail.currentIL
      strategy.ILLoss += tokenDetail.currentILLoss
      strategy.rewardInfo += tokenDetail.currentRewardInfo
      strategy.netWithoutIL += tokenDetail.currentNetWithoutIL
      strategy.netBalance += tokenDetail.currentNet / tokenPrice
      strategy.netValue += tokenDetail.currentNet
      strategy.holdValue += tokenDetail.currentHoldValue
    } else {
      strategy.interest += currentHistory.interest
      strategy.fee += currentHistory.fee
      strategy.IL += currentHistory.IL
      strategy.ILLoss += currentHistory.ILLoss
      strategy.rewardInfo += currentHistory.rewardInfo
      strategy.netWithoutIL += currentHistory.netWithoutIL
      strategy.netBalance += currentHistory.net / tokenPrice
      strategy.netValue += currentHistory.net
      strategy.holdValue += currentHistory.holdValue
    }
  })

  const diffInTime = Number(currentTime) - Number(startTime)
  const diffInDays = diffInTime / (3600 * 24)
  const getApy = (value) => ((value / diffInDays) * 365) / strategy.holdValue
  strategy.interestApy += getApy(strategy.interest)
  strategy.ilApy += getApy(strategy.IL)
  strategy.feeApy += getApy(strategy.fee)
  strategy.rewardsApy += getApy(strategy.rewardInfo)
  strategy.netWithoutIlApy += getApy(strategy.netWithoutIL)
  strategy.netApy += getApy(strategy.netValue)
  strategy.startTime = startTime
  strategy.currentTime = currentTime
  strategy.currentBalance = BN(strategy.principals)
    .plus(BN(strategy.netBalance) * BN(decimals))
    .div(decimals)
    .toNumber()
  strategy.positions = positions
  return strategy
}

export const mapVault = (vault, strategies) => {
  const { principals, shares, priceToken } = vault
  const principalsBN = BN(principals)
  const sharesBN = BN(shares)
  const decimals = `1e${priceToken.decimals}`
  vault.principalsCalculated = principalsBN.div(decimals).toNumber()
  vault.sharesCalculated = sharesBN.div(decimals).toNumber()
  vault.sharePriceCalculated = principals / shares
  vault.netBalance = _.sum(strategies.map((item) => item.netBalance))
  vault.currentBalance = principalsBN
    .plus(BN(vault.netBalance) * BN(decimals))
    .div(decimals)
    .toNumber()
  vault.apy = _.sum(strategies.map((item) => item.netApy * item.percentage))
  vault.strategies = strategies
  return vault
}

const sortTimestamp = (a, b) => {
  if (a.timestamp < b.timestamp) {
    return 1
  }
  if (a.timestamp > b.timestamp) {
    return -1
  }
  return 0
}

const genBorrows = (length) => {
  const result = []
  for (let i = 0; i < length; i++) {
    result.push({ balance: 0 })
  }
  return result
}
