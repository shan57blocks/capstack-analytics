import '../index.less'

import { Table, Modal, Form, Input } from 'antd'
import React, { useState } from 'react'

import { getColumns } from './Column'
import { positionColumns } from './PositionColumn'
import strategies from './strategies.json'

const Strategy = () => {
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
    <>
      <Table
        columns={getColumns(showModal)}
        dataSource={strategies}
        pagination={false}
        rowKey="id"
        bordered
        expandable={expandable}
      />
      <Modal
        title="Strategy Operation"
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
    </>
  )
}

export default Strategy

const expandable = {
  expandedRowRender: (record) => (
    <div className="vault-strategies-positions">
      <div className="vault-strategies-positions-title">Positions</div>
      <Table
        columns={positionColumns}
        dataSource={record.positions}
        size="small"
        bordered
        pagination={false}
      />
    </div>
  ),
}
