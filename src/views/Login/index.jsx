import './index.less'

import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import React from 'react'
import { local } from 'src/utils/storage'

const Login = ({ history }) => {
  const onFinish = async (values) => {
    const { username, password } = values
    try {
      local.setItem('username', username)
      local.setItem('password', password)
      history.push('/')
      window.location.reload()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="login">
      <div className="login-container">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            className="login-container-title"
            label="Capstack Analytics"
          ></Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="Username"
            name="username"
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="Password"
            name="password"
          >
            <Input prefix={<LockOutlined />} type="password" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
