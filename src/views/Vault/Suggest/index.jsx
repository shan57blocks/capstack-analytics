import './index.less'

import {
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  Table,
  Button,
  message,
} from 'antd'
import React, { useEffect, useState } from 'react'
import CapSkeleton from 'src/components/CapSkeleton'
import api from 'src/utils/api'

const Suggest = ({ vault }) => {
  const [strategies, setStrategies] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const unallocated = vault ? Number(vault.unallocated) : 0

  useEffect(() => {
    setStrategies(renforceStrategies(vault, vault?.strategies))
  }, [vault])

  const changeLeverage = (leverage, strategyId) => {
    const newStrategies = strategies.map((item) => {
      if (item.id === strategyId) {
        item.leverage = leverage
      }
      return item
    })
    setStrategies(renforceStrategies(vault, newStrategies))
  }

  const changePercentage = (percentage, strategyId) => {
    const newStrategies = strategies.map((item) => {
      if (item.id === strategyId) {
        item.percentage = percentage
      }
      return item
    })
    setStrategies(renforceStrategies(vault, newStrategies))
  }

  const savePercentage = async (percentage, strategyId) => {
    const totalPercentage = strategies
      .map((item) => Number(item.percentage))
      .reduce((a, b) => a + b, 0)
    if (totalPercentage > 1) {
      message.error('The total target is more than 100%.')
      return
    }
    await api.put(`/vaults/strategies/${strategyId}?percentage=${percentage}`)
    message.success('The target has been updated successfully.')
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinish = (values) => {
    console.log('Success:', values)
  }

  if (!vault) {
    return <CapSkeleton />
  }

  return (
    <div className="vault-suggest">
      <div className="vault-suggest-change">
        <div>Uninvested:</div>
        <div>{unallocated}</div>
      </div>
      <Table
        rowKey="id"
        columns={getColumns(
          vault,
          changePercentage,
          savePercentage,
          changeLeverage,
          showModal
        )}
        dataSource={strategies}
        bordered
      />
      <Modal
        title="Open Position"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="TX Hash 1" name="type">
            <Input />
          </Form.Item>
          <Form.Item label="TX Hash 2" name="type">
            <Input />
          </Form.Item>
          <Form.Item label="TX Hash 3" name="type">
            <Input />
          </Form.Item>
          <Form.Item label="TX Hash 4" name="type">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Suggest

const getColumns = (
  vault,
  changePercentage,
  savePercentage,
  changeLeverage,
  showModal
) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Protocol',
    dataIndex: 'positions',
    render: (positions) => {
      const [{ protocol }] = positions
      return (
        <div>
          {protocol.name} ({protocol.chain})
        </div>
      )
    },
  },
  {
    title: 'Target',
    dataIndex: 'percentage',
    key: 'percentage',
    render: (percentage, strategy) => {
      return (
        <div className="vault-suggest-percentage">
          <InputNumber
            value={percentage}
            min={0}
            max={100}
            step={0.01}
            formatter={(value) => `${(Number(value) * 100).toFixed(2)}%`}
            parser={(value) => value.replace('%', '') / 100}
            onChange={(value) => changePercentage(value, strategy.id)}
          ></InputNumber>
          <Button
            type="primary"
            onClick={() => {
              savePercentage(percentage, strategy.id)
            }}
          >
            Save
          </Button>
        </div>
      )
    },
  },
  {
    title: 'Target Change',
    dataIndex: 'percentage',
    key: 'percentage',
    render: (percentage) => {
      return <div>{Number(vault.unallocated) * Number(percentage)}</div>
    },
  },
  {
    title: 'Leverage',
    dataIndex: 'leverage',
    key: 'leverage',
    width: 160,
    render: (leverage, strategy) => {
      const [{ protocol }] = strategy.positions
      return (
        <InputNumber
          disabled={!protocol.isLeverage}
          min={1}
          width={80}
          step={0.1}
          value={leverage}
          onChange={(value) => changeLeverage(value, strategy.id)}
        ></InputNumber>
      )
    },
  },
  {
    title: 'Suggestion',
    dataIndex: 'suggestions',
    key: 'suggestions',
    render: (suggestions) => {
      return (
        <div>
          {suggestions.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      )
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={showModal}>Open Position</a>
      </Space>
    ),
  },
]

const renforceStrategies = (vault, strategies) => {
  if (!vault) {
    return []
  }
  return strategies.map((strategy) => {
    const [{ protocol, tokens }] = strategy.positions
    strategy.principal = Number(vault.unallocated) * strategy.percentage
    strategy.suggestions = []
    strategy.leverage = strategy.leverage ?? 3
    const { principal, leverage } = strategy

    if (!protocol.isLeverage) {
      strategy.leverage = 1
      strategy.suggestions.push(`${strategy.principal} ${vault.name}`)
      return strategy
    }

    if (strategy.positions.length > 1) {
      const principal0 = (principal * leverage) / (2 * leverage - 2)
      const borrow0 = principal0 * (leverage - 1)

      const principal1 = (principal * (leverage - 2)) / (2 * leverage - 2)
      const borrow1 = principal1 * (leverage - 1)
      strategy.suggestions.push(
        `${principal0} ${vault.name}, borrow ${borrow0} ${tokens[1].symbol}`
      )
      strategy.suggestions.push(
        `${principal1} ${vault.name}, borrow ${borrow1} ${tokens[0].symbol}`
      )
      return strategy
    }

    const borrowRate0 = (leverage / 2 - 1).toFixed(2)
    const borrowRate1 = (leverage / 2).toFixed(2)
    strategy.suggestions.push(`Borrow ${borrowRate0}X ${tokens[0].symbol}`)
    strategy.suggestions.push(`Borrow ${borrowRate1}X ${tokens[1].symbol}`)
    return strategy
  })
}