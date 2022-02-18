import React from 'react'
import { Table } from 'antd'
import { useHistory } from 'react-router'

const Defi = () => {
  const history = useHistory()

  const columns = [
    {
      title: 'Pool',
      dataIndex: 'tokens',
      render: (tokens) => (
        <a onClick={() => history.push('/defi/pool')}>
          {tokens.map((token) => (
            <div>{token.symbol}</div>
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
            <div>
              {token.unleveragePositioin} {token.symbol}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Start Position',
      dataIndex: 'tokens',
      render: (tokens) => (
        <div>
          <>
            {tokens.map((token) => (
              <div>
                {token.startPosition} {token.symbol} (
                {token.startBorrowPosition} Borrow)
              </div>
            ))}
          </>
          <div>Date: 11/02/2022</div>
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
              <div>
                {token.currentPosition} {token.symbol} ({token.borrowPosition}{' '}
                Borrow)
              </div>
            ))}
          </>
          <div>Date: 18/02/2022</div>
        </div>
      ),
    },
    {
      title: 'Current Value',
      dataIndex: 'tokens',
      render: (tokens) => (
        <div>
          {tokens.map((token) => (
            <div>${token.currentValue}</div>
          ))}
        </div>
      ),
    },
    {
      title: 'Leverage',
      dataIndex: 'leverage',
      key: 'leverage',
    },
    {
      title: 'Net Yield',
      dataIndex: 'feeAndIL',
      render: (feeAndIL) => (
        <div>
          <div>Current: ${feeAndIL.yearToDate}</div>
          <div>Daily: ${feeAndIL.daily}</div>
          <div>Yearly: ${feeAndIL.yearly}</div>
          <div>APY: {(feeAndIL.apy * 100).toFixed(2)}%</div>
        </div>
      ),
    },
    {
      title: 'Net Yield (Exclude IL)',
      dataIndex: 'net',
      render: (net) => (
        <div>
          <div>Current: ${net.yearToDate}</div>
          <div>Daily: ${net.daily}</div>
          <div>Yearly: ${net.yearly}</div>
          <div>APY: {(net.apy * 100).toFixed(2)}%</div>
        </div>
      ),
    },
  ]

  const data = [
    {
      key: '1',
      pool: 'WBTC.e/WAVAX',
      tokens: [
        {
          symbol: 'WBTC.e',
          startPosition: 1.25,
          startBorrowPosition: 0.79,
          unleveragePositioin: 0.46239,
          currentPosition: 1.36,
          borrowPosition: 0.81,
          currentValue: 55523.05,
        },
        {
          symbol: 'WAVAX',
          startPosition: 670.22,
          startBorrowPosition: 421.99,
          unleveragePositioin: 248.23,
          currentPosition: 619.64,
          borrowPosition: 413.88,
          currentValue: 55612.69,
        },
      ],
      leverage: 2.7,
      reward: {
        yearToDate: 170.34,
        daily: 28.39,
        yearly: 10362.35,
        apy: 0.2319,
      },
      yield: {
        yearToDate: 564.72,
        daily: 94.12,
        yearly: 34353.89,
        apy: 0.8347,
      },
      net: {
        yearToDate: 378.99,
        daily: 63.17,
        yearly: 23055.49,
        apy: 0.5602,
      },
      feeAndIL: {
        yearToDate: 14.28,
        daily: 2.38,
        yearly: 868.62,
        apy: 0.0211,
      },
    },
  ]

  return (
    <div className="page">
      <div style={{ fontSize: 20, marginBottom: 20 }}>Alpha Homora V2</div>
      <div>
        <Table columns={columns} dataSource={data} size="small" />
      </div>
    </div>
  )
}

export default Defi
