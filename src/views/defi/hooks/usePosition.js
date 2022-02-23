import { useMemo } from 'react'
import useFetch from 'src/hooks/useFetch'

const usePosition = () => {
  const [result] = useFetch(`/defi/positions`)

  const accountPosition = useMemo(() => {
    if (!result) {
      return
    }
    result.positions = result.positions.map((position) => {
      position.principals = JSON.parse(position.principals)
      position.borrows = JSON.parse(position.borrows)
      return position
    })
    result.positionHistories = result.positionHistories.map(
      (positionHistory) => {
        positionHistory.assets = JSON.parse(positionHistory.assets)
        positionHistory.borrows = JSON.parse(positionHistory.borrows)
        positionHistory.rewards = JSON.parse(positionHistory.rewards)
        return positionHistory
      }
    )

    result.positionHistories.forEach((history, index) => {
      const startPosition = result.positions.find(
        (position) => position.id === history.positionId
      )
      if (index === 11) {
        calApy(startPosition, history)
      }
    })

    return result
  }, [result])

  return accountPosition
}

export default usePosition

const calApy = (startPosition, currentPosition) => {
  console.log('startPosition', startPosition)
  console.log('currentPosition', currentPosition)

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

  let rewards = 0
  for (let i = 0; i < currentPosition.rewards.length; i++) {
    const reward = currentPosition.rewards[i]
    rewards += reward.balance * reward.price
  }

  const diffInTime = currentPosition.timestamp - Number(startPosition.openDate)
  const diffInDays = diffInTime / (3600 * 24)
  const fee_interest = IL_fee_interest - IL
  const fee = fee_interest - interest
  const netWithoutIL = fee + rewards + interest
  const net = netWithoutIL + IL
  const daily_fee_interest = fee_interest / diffInDays
  const yearly_fee_interest = daily_fee_interest * 365
  const apy_fee_interest = yearly_fee_interest / holdValue
  console.log('daily_fee_interest', daily_fee_interest)
  console.log('yearly_fee_interest', yearly_fee_interest)
  console.log('apy_fee_interest', apy_fee_interest)
}
