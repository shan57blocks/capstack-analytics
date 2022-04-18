import './index.less'

import React from 'react'
import { Card } from 'antd'
import classnames from 'classnames'
import { VAULT } from './const'

const VaultSummary = ({ vault, selectVault }) => {
  return (
    <div className="vault-summary">
      <Card
        size="small"
        title="ETH Vault"
        style={{ width: 300 }}
        onClick={() => selectVault(VAULT.ETH)}
        className={classnames({
          'vault-summary-selected': vault === VAULT.ETH,
        })}
      >
        <div>
          <div>Vault total</div>
          <div>27</div>
          <div>$200000</div>
        </div>
        <div>
          <div>Uninvested</div>
          <div>10</div>
          <div>$40000</div>
        </div>
        <div>
          <div>Apy</div>
          <div>15%</div>
        </div>
      </Card>
      <Card
        size="small"
        title="USD Vault"
        style={{ width: 300 }}
        onClick={() => selectVault(VAULT.USD)}
        className={classnames({
          'vault-summary-selected': vault === VAULT.USD,
        })}
      >
        <div>
          <div>Vault total</div>
          <div>27</div>
          <div>$200000</div>
        </div>
        <div>
          <div>Uninvested</div>
          <div>10</div>
          <div>$40000</div>
        </div>
        <div>
          <div>Apy</div>
          <div>15%</div>
        </div>
      </Card>
      <Card
        size="small"
        title="BTC Vault"
        style={{ width: 300 }}
        onClick={() => selectVault(VAULT.BTC)}
        className={classnames({
          'vault-summary-selected': vault === VAULT.BTC,
        })}
      >
        <div>
          <div>Vault total</div>
          <div>27</div>
          <div>$200000</div>
        </div>
        <div>
          <div>Uninvested</div>
          <div>10</div>
          <div>$40000</div>
        </div>
        <div>
          <div>Apy</div>
          <div>15%</div>
        </div>
      </Card>
    </div>
  )
}

export default VaultSummary
