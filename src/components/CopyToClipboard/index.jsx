import React from 'react'
import { copyToClipboard } from 'src/utils/common'
import { Tooltip, Icon } from 'antd'
import './index.less'

const CopyToClipboard = ({ value }) => {
  return (
    <>
      <span className="copy-to-clipboard">
        <Tooltip title="复制">
          <Icon
            role="button"
            type="copy"
            onClick={() => copyToClipboard(value)}
          />
        </Tooltip>
      </span>
    </>
  )
}

export default CopyToClipboard
