import './index.less'

import { Form, Input, Modal, Space, Table } from 'antd'
import React, { useState } from 'react'
import { BigNumber as BN } from 'bignumber.js'

const Profit = ({ vault }) => {
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
      <Table
        columns={getColumns(showModal)}
        dataSource={vault?.strategies}
        bordered
      />
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

const getColumns = (showModal) => [
  {
    title: 'Strategy',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Principals',
    dataIndex: 'principals',
    key: 'principals',
  },
  {
    title: 'Current',
    dataIndex: 'unallocated',
    key: 'unallocated',
  },
  {
    title: 'Profit',
    dataIndex: 'profit',
    key: 'profit',
  },
  {
    title: 'Management Fee',
    dataIndex: 'managementFee',
    key: 'managementFee',
  },
  {
    title: 'Performance Fee',
    dataIndex: 'performanceFee',
    key: 'performanceFee',
  },
]
