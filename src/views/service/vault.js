import api from 'src/utils/api'

export const startPosition = (strategy, payload) => {
  const { id, protocol } = strategy
  return api.post(
    `/vaults/strategies/${id}/start-positions?protocol=${protocol.geckoId}`,
    payload
  )
}

export const closePosition = (strategy, payload) => {
  const { id, protocol } = strategy
  return api.post(
    `/vaults/strategies/${id}/close-positions?protocol=${protocol.geckoId}`,
    payload
  )
}

export const harvestPosition = (vault, strategy, payload) => {
  const { protocol } = strategy
  return api.post(
    `/vaults/${vault.id}/harvest-positions?protocol=${protocol.geckoId}`,
    payload
  )
}

export const adjustPosition = (vault, strategy, payload) => {
  const { protocol } = strategy
  return api.post(
    `/vaults/${vault.id}/adjust-positions?protocol=${protocol.geckoId}`,
    payload
  )
}

export const profitDistribution = (vault, feeTxHash) => {
  return api.post(
    `/process/vaults/${vault.id}/profit-distribution?feeTxHash=${feeTxHash}`
  )
}

export const settleWithdrawl = (vault, investorTx, feeTxHash) => {
  return api.post(
    `/process/vaults/${vault.id}/withdrawl-settlement?investorTxId=${investorTx.id}&feeTxHash=${feeTxHash}`
  )
}

export const settleDeposits = (vaultId) => {
  return api.post(`/process/vaults/${vaultId}/invest-settlement`)
}
