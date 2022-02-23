import { Table } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'
import usePosition from './hooks/usePosition'

import pools from './pools.json'

const Defi = () => {
  const history = useHistory()
  const test = usePosition()

  const columns = [
    {
      title: 'Pool',
      dataIndex: 'tokens',
      render: (tokens) => (
        <a onClick={() => history.push('/defi/pool')}>
          {tokens.map((token) => (
            <div key={token.symbol}>{token.symbol}</div>
          ))}
        </a>
      ),
    },
    {
      title: 'Principal',
      dataIndex: 'tokens',
      render: (tokens) => (
        <div>
          {tokens.map((token) => (
            <div key={token.symbol}>
              {token.unleveragePositioin} {token.symbol}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Start Position',
      dataIndex: 'tokens',
      render: (tokens, item) => (
        <div>
          <>
            {tokens.map((token) => (
              <div key={token.symbol}>
                {token.startPosition} {token.symbol} (
                {token.startBorrowPosition} Borrow)
              </div>
            ))}
          </>
          <div>Leverage: {item.leverage}X (11/02/2022)</div>
        </div>
      ),
    },
    {
      title: 'Current Position',
      dataIndex: 'tokens',
      render: (tokens) => (
        <div>
          <>
            {tokens.map((token) => (
              <div key={token.symbol}>
                {token.currentPosition} {token.symbol} ({token.borrowPosition}{' '}
                Borrow)
              </div>
            ))}
          </>
          <div>18/02/2022</div>
        </div>
      ),
    },
    {
      title: 'Current Value',
      dataIndex: 'tokens',
      render: (tokens) => (
        <div>
          {tokens.map((token) => (
            <div key={token.symbol}>${token.currentValue}</div>
          ))}
        </div>
      ),
    },
    {
      title: 'Net Yield',
      dataIndex: 'feeAndIL',
      render: (feeAndIL) => (
        <div>
          <div>${feeAndIL.yearToDate}</div>
          <div>APY: {(feeAndIL.apy * 100).toFixed(2)}%</div>
        </div>
      ),
    },
    {
      title: 'Net Yield (Exclude IL)',
      dataIndex: 'net',
      render: (net) => (
        <div>
          <div>${net.yearToDate}</div>
          <div>APY: {(net.apy * 100).toFixed(2)}%</div>
        </div>
      ),
    },
  ]

  return (
    <div className="page">
      <div style={{ fontSize: 20, marginBottom: 20 }}>Alpha Homora V2</div>
      <div>
        <Table columns={columns} dataSource={pools} size="small" />
      </div>
    </div>
  )
}

export default Defi
