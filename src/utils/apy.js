import _ from 'lodash'
import { BN } from './common'

const ONE_YEAR_SECONDS = 365 * 24 * 3600

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
      IL: currentIL,
      IL_fee_interest: current_IL_fee_interest,
      interest: currentInterest,
      holdValue: currentHoldValue,
      feeInterest: currentFeeInterest,
      fee: currentFee,
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
    IL += result[i].IL
    IL_fee_interest += result[i].IL_fee_interest
    holdValue += result[i].holdValue
    interest -= result[i].interest
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
  const netValue = netWithoutIL + IL

  currentPosition.holdValue = holdValue
  currentPosition.IL_fee_interest = IL_fee_interest
  currentPosition.IL = IL
  currentPosition.interest = interest
  currentPosition.ILLoss = IL / currentValue
  currentPosition.fee = fee
  currentPosition.rewardValue = rewardValue
  currentPosition.netWithoutIL = netWithoutIL
  currentPosition.netValue = netValue
  currentPosition.tokenDetails = result

  const getApy = getApyFn(
    startPosition.openDate,
    currentPosition.timestamp,
    holdValue
  )
  currentPosition.ilApy = currentPosition.IL / holdValue
  currentPosition.interestApy = getApy(currentPosition.interest)
  currentPosition.feeApy = getApy(currentPosition.fee)
  currentPosition.rewardsApy = getApy(currentPosition.rewardValue)
  currentPosition.netWithoutIlApy = getApy(currentPosition.netWithoutIL)
  currentPosition.netApy = getApy(currentPosition.netValue, currentPosition.IL)

  currentPosition.tokenDetails = result.map((item, index) => {
    const startAsset = startPosition.startAssets[index]
    const currentAsset = currentPosition.assets[index]
    const currentRatio = (startAsset.balance * currentAsset.price) / holdValue
    item.netValue = currentPosition.netValue * currentRatio
    item.rewardValue = currentPosition.rewardValue * currentRatio
    item.IL = currentPosition.IL / result.length
    item.ILLoss = currentPosition.ILLoss
    item.netWithoutIL = item.netValue - item.IL
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
  const [firstPosition] = positions
  const tokenIndex = firstPosition.tokens.findIndex(
    (token) => token.id === strategy.tokenId
  )
  const tokenPrice = firstPosition.currentHistory.assets[tokenIndex].price
  const decimals = `1e${firstPosition.tokens[tokenIndex].decimals}`
  const principalsBN = BN(strategy.principals)

  strategy.interest = 0
  strategy.interestBalance = 0
  strategy.fee = 0
  strategy.feeBalance = 0
  strategy.IL = 0
  strategy.ILBalance = 0
  strategy.rewardValue = 0
  strategy.rewardBalance = 0
  strategy.netWithoutIL = 0
  strategy.netWithoutILBalance = 0
  strategy.netValue = 0
  strategy.netBalance = 0
  strategy.holdValue = 0
  strategy.startTime = firstPosition.openDate
  strategy.currentTime = firstPosition.currentHistory.timestamp

  positions.forEach((position) => {
    const { currentHistory, tokens } = position
    if (position.openDate < strategy.startTime) {
      strategy.startTime = position.openDate
    }
    if (currentHistory.timestamp > strategy.currentTime) {
      strategy.currentTime = currentHistory.timestamp
    }
    const fillStrategy = (source) => {
      strategy.interest += source.interest
      strategy.interestBalance += source.interest / tokenPrice
      strategy.fee += source.fee
      strategy.feeBalance += source.fee / tokenPrice
      strategy.IL += source.IL
      strategy.ILBalance += source.IL / tokenPrice
      strategy.rewardValue += source.rewardValue
      strategy.rewardBalance += source.rewardValue / tokenPrice
      strategy.netWithoutIL += source.netWithoutIL
      strategy.netWithoutILBalance += source.netWithoutIL / tokenPrice
      strategy.netValue += source.netValue
      strategy.netBalance += source.netValue / tokenPrice
      strategy.holdValue += source.holdValue
    }

    if (positionStrategies[position.id].length > 1) {
      const tokenDetail = currentHistory.tokenDetails.find(
        (item) => item.tokenId === tokens[tokenIndex].id
      )
      fillStrategy(tokenDetail)
    } else {
      fillStrategy(currentHistory)
    }
  })

  const getApy = getApyFn(
    strategy.startTime,
    strategy.currentTime,
    strategy.holdValue
  )
  strategy.interestApy = getApy(strategy.interest)
  strategy.ilApy = strategy.IL / strategy.holdValue
  strategy.feeApy = getApy(strategy.fee)
  strategy.rewardsApy = getApy(strategy.rewardValue)
  strategy.netWithoutIlApy = getApy(strategy.netWithoutIL)
  strategy.netApy = getApy(strategy.netValue, strategy.IL)
  strategy.netValueYearly = getYearly(strategy)
  strategy.netBalanceYearly = getYearly(strategy) / tokenPrice
  strategy.principalsCalculated = principalsBN.div(decimals).toNumber()
  strategy.currentBalance = strategy.principalsCalculated + strategy.netBalance
  strategy.ILLoss = firstPosition.currentHistory.ILLoss
  strategy.priceChange = calcPriceChange(firstPosition)
  strategy.ILLoss50 = calcILLoss(firstPosition, 0.5)
  strategy.ILBalance50 = strategy.ILLoss50 * strategy.currentBalance
  strategy.ILLoss100 = calcILLoss(firstPosition, 1)
  strategy.ILBalance100 = strategy.ILLoss100 * strategy.currentBalance
  strategy.ILLoss50Neg = calcILLoss(firstPosition, -0.5)
  strategy.ILBalance50Neg = strategy.ILLoss50Neg * strategy.currentBalance
  strategy.ILLoss75Neg = calcILLoss(firstPosition, -0.75)
  strategy.ILBalance75Neg = strategy.ILLoss75Neg * strategy.currentBalance
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
  vault.currentBalance = vault.principalsCalculated + vault.netBalance
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

const getApyFn = (start, end, base) => (value, IL = 0) => {
  const finalValue = value + Math.abs(IL)
  const diffInTime = Number(end) - Number(start)
  const diffInDays = diffInTime / (3600 * 24)
  return ((finalValue / diffInDays) * 365) / base - Math.abs(IL) / base
}

const getYearly = (strategy) => {
  const diffInTime = Number(strategy.currentTime) - Number(strategy.startTime)
  return (strategy.netWithoutIL / diffInTime) * ONE_YEAR_SECONDS + strategy.IL
}

const calcILLoss = (position, ILRatio) => {
  const { startAssets } = position
  if (startAssets.length === 2) {
    const priceChange = calcPriceChange(position)
    const initTruePrice0 = startAssets[0].price
    const initTruePrice1 = startAssets[1].price
    const initBalance0 = 1
    const initBalance1 = (initTruePrice0 * initBalance0) / initTruePrice1
    const initPrice0 = initTruePrice0 / initTruePrice1
    const initPrice1 = (initPrice0 * initBalance0) / initBalance1

    const realCurrentPrice0 = initPrice0 * (1 + priceChange)
    const currentPrice0 = realCurrentPrice0 * (1 + ILRatio)
    const currentPrice1 = initPrice1

    const K = initBalance0 * initBalance1
    const currentR = currentPrice0 / currentPrice1
    const currentBalance0 = Math.sqrt(K / currentR)
    const currentBalance1 = Math.sqrt(K * currentR)
    const currentValue =
      currentPrice0 * currentBalance0 + currentBalance1 * currentPrice1
    const holdValue =
      currentPrice0 * initBalance0 + currentPrice1 * initBalance1
    const loss = (currentValue - holdValue) / holdValue
    return loss
  }
  return 0
}

const calcPriceChange = (position) => {
  const { startAssets, currentHistory } = position
  const currentAssets = currentHistory.assets
  if (startAssets.length === 2) {
    const startPrice = startAssets[0].price / startAssets[1].price
    const currentPrice = currentAssets[0].price / currentAssets[1].price
    return (currentPrice - startPrice) / startPrice
  }
  return 0
}
