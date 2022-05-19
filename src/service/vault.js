import api from 'src/utils/api'

const enterPositionOpening = (vaultId) => {
  return api.post(`/vaults/${vaultId}/enter-position-opening`)
}

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

const vaultService = {
  openPosition,
  harvestPosition,
  adjustPosition,
  closePosition,
  enterPositionOpening,
}

export default vaultService
