import api from 'src/utils/api'

const openPosition = (strategyId, hash, protocol) => {
  const url = `/vaults/strategies/${strategyId}/open-positions?hash=${hash}&protocol=${protocol}`
  return api.post(url)
}

const harvestPosition = (strategyId, positionId, payload) => {
  const url = `/vaults/strategies/${strategyId}/harvest-positions?positionId=${positionId}`
  return api.post(url, payload)
}

const adjustPosition = (strategyId, positionId, payload) => {
  const url = `/vaults/strategies/${strategyId}/adjust-positions?positionId=${positionId}`
  return api.post(url, payload)
}

const closePosition = (strategyId, positionId, payload) => {
  const url = `/vaults/strategies/${strategyId}/close-positions?positionId=${positionId}`
  return api.post(url, payload)
}

const enterPositionOpening = (vaultId) => {
  return api.post(`/vaults/${vaultId}/enter-position-opening`)
}

const enterOperating = (vaultId) => {
  return api.post(`/vaults/${vaultId}/enter-operating`)
}

const enterProfitDistributing = (vaultId) => {
  return api.post(`/vaults/${vaultId}/enter-profit-distributing`)
}

const enterWithdrawalSettling = (vaultId) => {
  return api.post(`/vaults/${vaultId}/enter-withdrwal-settling`)
}

const enterDepositSettling = (vaultId) => {
  return api.post(`/vaults/${vaultId}/enter-deposit-settling`)
}

const settleWithdrawal = (vaultId, payload) => {
  return api.post(
    `/vaults/${vaultId}/settle-withdrawal?txId=${payload.txId}&txHash=${payload.txHash}&chain=${payload.chainEnum}`
  )
}

const vaultService = {
  openPosition,
  harvestPosition,
  adjustPosition,
  closePosition,
  enterPositionOpening,
  enterOperating,
  enterProfitDistributing,
  enterWithdrawalSettling,
  enterDepositSettling,
  settleWithdrawal,
}

export default vaultService
