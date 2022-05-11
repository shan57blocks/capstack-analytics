import api from 'src/utils/api'

const startPosition = (strategy, payload) => {
  const { id, protocol } = strategy
  return api.post(
    `/vaults/strategies/${id}/start-positions?protocol=${protocol.geckoId}`,
    payload
  )
}

const closePosition = (strategy, payload) => {
  const { id, protocol } = strategy
  return api.post(
    `/vaults/strategies/${id}/close-positions?protocol=${protocol.geckoId}`,
    payload
  )
}

const harvestPosition = (vault, strategy, payload) => {
  const { protocol } = strategy
  return api.post(
    `/vaults/${vault.id}/harvest-positions?protocol=${protocol.geckoId}`,
    payload
  )
}

const adjustPosition = (vault, strategy, payload) => {
  const { protocol } = strategy
  return api.post(
    `/vaults/${vault.id}/adjust-positions?protocol=${protocol.geckoId}`,
    payload
  )
}

const profitDistribution = (vault, feeTxHash) => {
  return api.post(
    `/process/vaults/${vault.id}/profit-distribution?feeTxHash=${feeTxHash}`
  )
}

const settleWithdrawl = (vault, investorTx, feeTxHash) => {
  return api.post(
    `/process/vaults/${vault.id}/withdrawl-settlement?investorTxId=${investorTx.id}&feeTxHash=${feeTxHash}`
  )
}

const settleDeposits = (vaultId) => {
  return api.post(`/process/vaults/${vaultId}/invest-settlement`)
}

const vaultService = {
  startPosition,
  closePosition,
  harvestPosition,
  adjustPosition,
  profitDistribution,
  settleWithdrawl,
  settleDeposits,
}

export default vaultService
