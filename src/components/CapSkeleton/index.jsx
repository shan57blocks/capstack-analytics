import './index.less'

import { Skeleton } from 'antd'
import React from 'react'

const CapSkeleton = () => {
  return (
    <Skeleton
      paragraph={{
        rows: 0,
      }}
      active
    />
  )
}

export default CapSkeleton
