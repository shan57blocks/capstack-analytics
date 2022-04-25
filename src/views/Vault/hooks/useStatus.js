import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { InvestStatus, VAULT, VAULT_STATUS } from '../const'

export const useStatus = () => {
  const [status, setStatus] = useState({
    [VAULT.ETH]: null,
    [VAULT.USD]: null,
    [VAULT.BTC]: null,
  })
  const { vaults, investorTxs } = useSelector((state) => state.app)

  useEffect(() => {
    const status = {
      [VAULT.ETH]: null,
      [VAULT.USD]: null,
      [VAULT.BTC]: null,
    }
    if (vaults && investorTxs) {
      vaults.forEach((vault) => {
        vault.strategies.forEach((strategy) => {
          strategy.positions.forEach((position) => {
            if (!position.closed) {
              status[vault.name] = VAULT_STATUS.OPEN
            }
          })
        })
        if (!status[vault.name]) {
          const vaultTxs = investorTxs.filter((tx) => tx.vaultId === vault.id)
          if (
            vaultTxs.some(
              (tx) =>
                tx.status === InvestStatus.InvestRequested ||
                tx.status === InvestStatus.WithdrawlRequested
            )
          ) {
            status[vault.name] = VAULT_STATUS.SETTLE
          }
        }
      })
      setStatus(status)
    }
  }, [investorTxs, vaults])

  return status
}
