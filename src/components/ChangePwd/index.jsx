import React from 'react'
import { Modal, Form, Input } from 'antd'
import { formLayout } from 'src/utils/const'

const ChangePwd = ({ setVisible, title, changePassword }) => {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    changePassword(values.password)
  }

  return (
    <div>
      <Modal
        title={`修改${title}密码`}
        wrapClassName="change-password"
        visible={true}
        onOk={() => form.submit()}
        onCancel={() => setVisible(false)}
        cancelText="取消"
        okText="确定"
      >
        <Form
          {...formLayout}
          form={form}
          className="change-password-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="password"
            label="新密码"
            rules={[
              {
                required: true,
                message: '请输入新密码',
              },
              { min: 6 },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="确认新密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请再次输入新密码',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('两次输入的密码不一样')
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ChangePwd
