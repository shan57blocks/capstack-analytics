import React from 'react'
import { Button, Form } from 'antd'
import { emptyLayout } from 'src/utils/const'
import { useHistory } from 'react-router'

const FormBottom = ({ path }) => {
  const history = useHistory()

  return (
    <Form.Item {...emptyLayout} className="form-bottom">
      <Button
        onClick={() => history.push(path)}
        style={{ visibility: path ? 'visible' : 'hidden' }}
      >
        取消
      </Button>
      <Button type="primary" htmlType="submit">
        确定
      </Button>
    </Form.Item>
  )
}

export default FormBottom
