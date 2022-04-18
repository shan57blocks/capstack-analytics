import './index.less'

import { Form, Input, Modal, Space, Table } from 'antd'
import React, { useState } from 'react'

const Profit = () => {
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
    <div className="vault-profit">
      <Table columns={getColumns(showModal)} dataSource={data} bordered />
      <Modal
        title="Management Fee"
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
          <Form.Item label="TX Hash" name="username">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Profit

const data = [
  {
    key: '1',
    profit: '10ETH',
    currentShares: 23423423,
    managementFee: '1ETH',
  },
]

const getColumns = (showModal) => [
  {
    title: 'Profit',
    dataIndex: 'profit',
    key: 'profit',
  },
  {
    title: 'Current Shares',
    dataIndex: 'currentShares',
    key: 'currentShares',
  },
  {
    title: 'Management Fee',
    dataIndex: 'managementFee',
    key: 'managementFee',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a onClick={showModal}>Confirm Management Fee</a>
        <a>Confirm Profit Distribution</a>
      </Space>
    ),
  },
]
