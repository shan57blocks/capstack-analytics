import './index.less'

import { Form, Input, Modal, Space, Table } from 'antd'
import React, { useState } from 'react'
import CapSkeleton from 'src/components/CapSkeleton'
import { toPercentage } from 'src/utils/common'

const Suggest = ({ vault }) => {
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

  if (!vault) {
    return <CapSkeleton />
  }

  return (
    <div className="vault-suggest">
      <div className="vault-suggest-change">
        <div>Uninvested:</div>
        <div>{vault.unallocated}</div>
      </div>
      <Table
        rowKey="id"
        columns={getColumns(vault, showModal)}
        dataSource={vault.strategies}
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

const getColumns = (vault, showModal) => [
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
    render: (percentage) => {
      return <div>{toPercentage(percentage)}</div>
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
