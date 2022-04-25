import api from 'src/utils/api'

export const startPosition = (strategy, payload) => {
  const { id, protocol } = strategy
  return api.post(
    `/vaults/strategies/${id}/start-positions?protocol=${protocol.geckoId}`,
    payload
  )
}
