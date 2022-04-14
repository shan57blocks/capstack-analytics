import './index.less'

import React from 'react'
import { Card } from 'antd'

const VaultSummary = () => {
  return (
    <div className="vault-summary">
      <Card size="small" title="ETH Vault" style={{ width: 300 }}>
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
      <Card size="small" title="USD Vault" style={{ width: 300 }}>
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
      <Card size="small" title="BTC Vault" style={{ width: 300 }}>
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
