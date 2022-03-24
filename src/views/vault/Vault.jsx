import './index.less'

import Summary from './Summary'

import React from 'react'
import Strategy from './Strategy'

const Vault = ({ vault }) => {
  return (
    <div className="vault">
      <div className="vault-name">{vault.name} Vault</div>
      <div className="vault-summary">Summary</div>
      <Summary vault={vault}></Summary>
      <div className="vault-strategies">Strategies</div>
      <Strategy strategies={vault.strategies} vault={vault}></Strategy>
    </div>
  )
}

export default Vault
