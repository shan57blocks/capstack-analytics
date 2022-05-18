import api from 'src/utils/api'

const enterPositionOpening = (vaultId) => {
  return api.post(`/vaults/${vaultId}/enter-position-opening`)
}

const openPosition = (strategyId, hash, protocol) => {
  const url = `/vaults/strategies/${strategyId}/open-positions?hash=${hash}&protocol=${protocol}`
  return api.post(url)
}

const vaultService = { openPosition, enterPositionOpening }

export default vaultService
