import api from 'src/utils/api'

const enterPositionOpening = (vaultId) => {
  return api.post(`/vaults/${vaultId}/enter-position-opening`)
}

const vaultService = { enterPositionOpening }

export default vaultService
