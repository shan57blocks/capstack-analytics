import { Form, Radio } from 'antd'
import React from 'react'

const FormRadio = ({ label, name, options }) => {
  return (
    <Form.Item rules={[{ required: true }]} label={label} name={name}>
      <Radio.Group>
        {options.map((option) => {
          return (
            <Radio key={option.value} value={option.value}>
              {option.title}
            </Radio>
          )
        })}
      </Radio.Group>
    </Form.Item>
  )
}

export default FormRadio
