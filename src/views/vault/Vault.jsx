import './index.less'

import React from 'react'

import Strategy from './Strategy'
import VaultSummary from './VaultSummary'

const Vault = ({ vault }) => {
  return (
    <div className="vault">
      <div className="vault-name">{vault.name} Vault</div>
      <div className="vault-summary">Summary</div>
      <VaultSummary vaults={[vault]}></VaultSummary>
      <div className="vault-strategies">Strategies</div>
      <Strategy strategies={vault.strategies}></Strategy>
    </div>
  )
}

export default Vault
