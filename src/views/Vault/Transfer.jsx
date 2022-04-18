import './index.less'

import { Space, Table, Button, Modal, Form, Input, Select } from 'antd'
import React, { useState } from 'react'

const { Option } = Select

const Transfer = () => {
  const [settleVisible, setSettleVisible] = useState(false)
  const [addVisible, setAddVisible] = useState(false)

  const showSettleModal = () => {
    setSettleVisible(true)
  }

  const handleSettleOk = () => {
    setSettleVisible(false)
  }

  const handleSettleCancel = () => {
    setSettleVisible(false)
  }

  const showAddModal = () => {
    setAddVisible(true)
  }

  const handleAddOk = () => {
    setAddVisible(false)
  }

  const handleAddCancel = () => {
    setAddVisible(false)
  }

  const onFinish = (values) => {
    console.log('Success:', values)
  }

  return (
    <div className="vault-transfer">
      <Button className="vault-transfer-add" onClick={showAddModal}>
        Add
      </Button>
      <Table columns={getColumns(showSettleModal)} dataSource={data} bordered />
      <Modal
        title="Add Transfer"
        visible={addVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Investor" name="username">
            <Select>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="password">
            <Select>
              <Option value="jack">Invest requested</Option>
              <Option value="lucy">Withdrawl requested</Option>
            </Select>
          </Form.Item>
          <Form.Item label="TX Hash" name="type">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Settle Withdrawl"
        visible={settleVisible}
        onOk={handleSettleOk}
        onCancel={handleSettleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="TX Hash" name="username">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Transfer

const data = [
  {
    key: '1',
    date: '01/01/2022 10:10',
    investor: 'John Brown',
    requested: '10 ETH',
    shares: 100,
    status: 'Invest requested',
  },
  {
    key: '2',
    date: '01/03/2022 10:20',
    investor: 'John Brown',
    requested: '10 ETH',
    shares: 100,
    status: 'Invested',
  },
  {
    key: '3',
    date: '01/04/2022 12:00',
    investor: 'John Brown',
    requested: '-10 ETH',
    shares: 100,
    status: 'Withdrawl requested',
  },
  {
    key: '4',
    date: '01/05/2022 13:00',
    investor: 'John Brown',
    requested: '-10 ETH',
    status: 'Withdrawl',
  },
]

const getColumns = (confirm) => [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Investor',
    dataIndex: 'investor',
    key: 'investor',
  },
  {
    title: 'Requested',
    dataIndex: 'requested',
    key: 'requested',
  },
  {
    title: 'Shares',
    dataIndex: 'shares',
    key: 'shares',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        {record.key === '3' && <a onClick={confirm}>Settle</a>}
      </Space>
    ),
  },
]
