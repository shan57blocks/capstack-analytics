import './index.less'

import { Button, Form, Input, Modal, Space, Table } from 'antd'
import React, { useState } from 'react'

const CalcDifference = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

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

  return (
    <div className="vault-calc">
      <div className="vault-calc-change">
        <div>Net Change to Vault:</div>
        <Input width={200} />
        <Button>Calculate</Button>
      </div>
      <Table columns={getColumns(showModal)} dataSource={data} bordered />
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
    name: 'ETH/USDT (First)',
    protocol: 'Alpaca (BSC)',
    principals: '3.524',
    current: '3.569',
    target: '20%',
    targetChange: '13',
    action:
      '-4 ETH/-2 AVAX (pay back 1 AVAX/2ETH in debt), swap 1 AVAX for ETH',
  },
  {
    key: '3',
    name: 'ETH/USDT (Second)',
    protocol: 'Alpaca (BSC)',
    principals: '3.524',
    current: '3.569',
    target: '20%',
    targetChange: '13',
    action:
      '-4 ETH/-2 AVAX (pay back 1 AVAX/2ETH in debt), swap 1 AVAX for ETH',
  },
]

const getColumns = (showModal) => [
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
    title: 'Suggestion',
    dataIndex: 'action',
    key: 'action',
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
