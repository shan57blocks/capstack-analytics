import result from './positions.json'
import pools from './pools.json'

const usePosition = () => {
  result.positionHistories.forEach((history) => {
    const startPosition = result.positions.find(
      (position) => position.id === history.positionId
    )
    calApy(startPosition, history)
  })
  result.positions.forEach((position) => {
    const pool = pools.find((pool) => pool.id === position.poolId)
    position.pool = pool
    const histories = result.positionHistories.filter(
      (history) => history.positionId === position.id
    )
    position.histories = histories.reverse()
    position.currentHistory = position.histories[0]
  })
  return result
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

    const currentPrincipal = currentAsset.balance - startBorrow.balance
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

  let rewardNumber = 0
  for (let i = 0; i < currentPosition.rewards.length; i++) {
    const reward = currentPosition.rewards[i]
    rewardNumber += reward.balance * reward.price
  }

  const diffInTime = currentPosition.timestamp - Number(startPosition.openDate)
  const diffInDays = diffInTime / (3600 * 24)
  const fee_interest = IL_fee_interest - IL
  const fee = fee_interest - interest
  const netWithoutIL = fee + rewardNumber + interest
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
  currentPosition.rewardInfo = get_daily_yearly_apy(rewardNumber)
  currentPosition.netWithoutIL = get_daily_yearly_apy(netWithoutIL)
  currentPosition.net = get_daily_yearly_apy(net)
}
