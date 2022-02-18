import { Form } from 'antd'
import React from 'react'
import ImageUpload from '../ImageUpload'

const FormImage = ({ form, label, name, message, imageUrl }) => {
  const handleLogoChange = (imageUrl) => {
    form.setFieldsValue({
      [name]: imageUrl,
    })
  }

  return (
    <Form.Item rules={[{ required: true, message }]} label={label} name={name}>
      <ImageUpload callback={handleLogoChange} imageUrl={imageUrl} />
    </Form.Item>
  )
}

export default FormImage
