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

  currentPosition.ilFeeInterests = result.map((item) => item.IL_fee_interest)
  currentPosition.IL = get_daily_yearly_apy(IL)
  currentPosition.interest = get_daily_yearly_apy(interest)
  currentPosition.fee = get_daily_yearly_apy(fee)
  currentPosition.rewardInfo = get_daily_yearly_apy(rewardValue)
  currentPosition.netWithoutIL = get_daily_yearly_apy(netWithoutIL)
  currentPosition.net = get_daily_yearly_apy(net)
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

export const mapStrategy = (strategy, positions) => {
  let netGain = 0
  let net = 0

  positions.forEach((position) => {
    const { currentHistory, tokens } = position
    const index = tokens.findIndex((token) => token.id === strategy.tokenId)
    const tokenPrice = currentHistory.assets[index].price
    netGain += currentHistory.net.yearToDate / tokenPrice
    net += currentHistory.net.yearToDate
  })
  strategy.netGain = netGain
  strategy.net = net
  return strategy
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
