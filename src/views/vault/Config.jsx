import './index.less'

import { Form, Input } from 'antd'
import React from 'react'

const Config = () => {
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  return (
    <div className="vault-config">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Liquidation Alert" name="type">
          <Input />
        </Form.Item>
        <Form.Item label="Harvest Alert" name="type">
          <Input />
        </Form.Item>
      </Form>
    </div>
  )
}

export default Config
