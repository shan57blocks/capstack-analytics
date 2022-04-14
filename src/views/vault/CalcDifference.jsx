import './index.less'

import { Button, Input, Space, Table } from 'antd'
import React, { useState } from 'react'

const CalcDifference = () => {
  return (
    <div className="vault-calc">
      <div className="vault-calc-change">
        <div>Net Change to Vault:</div>
        <Input width={200} />
        <Button>Calculate</Button>
      </div>
      <Table columns={getColumns()} dataSource={data} bordered />
    </div>
  )
}

export default CalcDifference

const data = [
  {
    key: '1',
    name: 'ETH/AVAX',
    protocol: 'Alpha Homora V2 (Avalanche)',
    principals: '3.524',
    current: '3.569',
    target: '25%',
    targetChange: '2',
    action:
      '-4 ETH/-2 AVAX (pay back 1 AVAX/2ETH in debt), swap 1 AVAX for ETH',
  },
  {
    key: '2',
    name: 'ETH/USDT',
    protocol: 'Alpaca (Avalanche)',
    principals: '3.524',
    current: '3.569',
    target: '20%',
    targetChange: '13',
    action:
      '-4 ETH/-2 AVAX (pay back 1 AVAX/2ETH in debt), swap 1 AVAX for ETH',
  },
  {
    key: '3',
    name: 'Unallocated',
    protocol: '',
    principals: '10',
    current: '10',
    target: '0%',
    targetChange: '-10',
  },
]

const getColumns = (confirm) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Protocol',
    dataIndex: 'protocol',
    key: 'protocol',
  },
  {
    title: 'Principals',
    dataIndex: 'principals',
    key: 'principals',
  },
  {
    title: 'Current Estimated',
    dataIndex: 'current',
    key: 'current',
  },
  {
    title: 'Target',
    dataIndex: 'target',
    key: 'target',
  },
  {
    title: 'Target Change',
    dataIndex: 'targetChange',
    key: 'targetChange',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
]
