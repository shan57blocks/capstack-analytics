import { Table } from 'antd'
import React from 'react'
import historyData from './history.json'
import summaryData from './summary.json'

const Pool = () => {
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Position',
      dataIndex: 'tokens',
      render: (tokens) => (
        <div>
          {tokens.map((token) => (
            <div>
              {token.currentPosition} {token.symbol}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Borrow',
      dataIndex: 'tokens',
      render: (tokens) => (
        <div>
          {tokens.map((token) => (
            <div>
              {token.currentPosition} {token.symbol}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Value',
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
      title: 'Net Yield',
      dataIndex: 'feeAndIL',
      render: (feeAndIL) => (
        <div>
          <div>Current: ${feeAndIL.yearToDate}</div>
          {/* <div>Daily: ${feeAndIL.daily}</div>
          <div>Yearly: ${feeAndIL.yearly}</div> */}
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
          {/* <div>Daily: ${net.daily}</div>
          <div>Yearly: ${net.yearly}</div> */}
          <div>APY: {(net.apy * 100).toFixed(2)}%</div>
        </div>
      ),
    },
    {
      title: 'Reward',
      dataIndex: 'reward',
      render: (reward) => (
        <div>
          <div>Current: ${reward.yearToDate}</div>
          {/* <div>Daily: ${reward.daily}</div>
          <div>Yearly: ${reward.yearly}</div> */}
          <div>APY: {(reward.apy * 100).toFixed(2)}%</div>
        </div>
      ),
    },
  ]

  return (
    <div className="page">
      <div style={{ fontSize: 20, marginBottom: 10 }}>
        WBTC.e/WAVAX (Alpha Homora V2)
      </div>
      <div>
        <div
          style={{
            fontSize: 16,
            marginBottom: 10,
            fontWeight: 'bold',
          }}
        >
          Summary
        </div>
        <Summary></Summary>
        <div
          style={{
            fontSize: 16,
            marginTop: 20,
            marginBottom: 10,
            fontWeight: 'bold',
          }}
        >
          History
        </div>
        <Table columns={columns} dataSource={historyData} size="small" />
      </div>
    </div>
  )
}

export default Pool

const Summary = () => {
  const columns = [
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
    <Table
      columns={columns}
      dataSource={summaryData}
      pagination={false}
      size="small"
    />
  )
}
