import './index.less'

import { Space, Table, Button, Modal, Form, Input } from 'antd'
import React, { useState } from 'react'

const Investor = () => {
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
    <div className="vault-investor">
      <Button className="vault-investor-add" onClick={showModal}>
        Add
      </Button>
      <Table columns={columns} dataSource={data} bordered />
      <Modal
        title="Add Investor"
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
          <Form.Item label="Investor Name" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Wallet Address" name="password">
            <Input />
          </Form.Item>
          <Form.Item label="Wallet Type" name="type">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Investor

const data = [
  {
    key: '1',
    name: 'John Brown',
    address: '0xc0aad83d27b5b091729efe16a7b068f6bdab1f1c',
    type: 'EVM',
  },
  {
    key: '2',
    name: 'Jim Green',
    address: '0xc0aad83d27b5b091729efe16a7b068f6bdab1f1c',
    type: 'EVM',
  },
  {
    key: '3',
    name: 'Joe Black',
    address: '8qPKSiDVxXYmvopt4AHQWCd15xjtLv9uESU7jwY1EtAr',
    type: 'Solana',
  },
]

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => text,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Address type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
]
