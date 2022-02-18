import React from 'react'
import './index.less'

const PageCustom = ({ children, title, customClass }) => {
  return (
    <div className={`page page-custom jjt-form ${customClass}`}>
      <div className="jjt-form-title">{title}</div>
      {children}
    </div>
  )
}

export default PageCustom
