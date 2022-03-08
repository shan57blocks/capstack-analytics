export const calApy = (startPosition, currentPosition) => {
  const startPrincipals = startPosition.principals
  const startBorrows = startPosition.borrows
  const startAssets = startPosition.startAssets

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
  return currentPosition
}

export const calCloseApy = (position) => {
  const { principals, closeAssets, openDate, closeDate } = position
  const rewards = closeAssets.filter((token) => token.type === 'rewards')
  const closeTokens = closeAssets.filter((token) => !token.type)

  let holdValue = 0
  for (let i = 0; i < principals.length; i++) {
    holdValue += principals[i].balance * closeTokens[i].price
  }
  let closeValue = 0
  for (let i = 0; i < closeTokens.length; i++) {
    closeValue += closeTokens[i].balance * closeTokens[i].price
  }
  let rewardValue = 0
  for (let i = 0; i < rewards.length; i++) {
    rewardValue += rewards[i].balance * rewards[i].price
  }

  const diffInTime = Number(closeDate) - Number(openDate)
  const diffInDays = diffInTime / (3600 * 24)
  const net = closeValue + rewardValue - holdValue

  const get_daily_yearly_apy = (value) => {
    return {
      yearToDate: value,
      daily: value / diffInDays,
      yearly: (value / diffInDays) * 365,
      apy: ((value / diffInDays) * 365) / holdValue,
    }
  }

  position.closeTokens = closeTokens
  position.closeReward = get_daily_yearly_apy(rewardValue)
  position.closeNet = get_daily_yearly_apy(net)
  return position
}

export const mapPosition = (position) => {
  position.symbol = position.tokens.map((token) => token.symbol).join('/')
  if (position.closed) {
    position = calCloseApy(position)
  }
  position.histories = position.histories
    .map((history) => {
      history.tokens = position.tokens
      return calApy(position, history)
    })
    .sort(sortTimestamp)
  position.currentHistory = position.histories[0]
  return position
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
