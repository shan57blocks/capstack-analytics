import { Tooltip } from 'antd'
import React from 'react'

const CapTooltip = ({ title, children }) => {
  return (
    <Tooltip title={title}>
      <span>{children}</span>
    </Tooltip>
  )
}

export default CapTooltip
