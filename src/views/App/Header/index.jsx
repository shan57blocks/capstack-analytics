import './index.less'

import { Select } from 'antd'
import React from 'react'

const { Option } = Select

const Header = () => {
  return (
    <div className="header">
      <div className="header-right">
        <div className="header-right__welcome">Capstack Analytics </div>
        <div className="header-right__user">
          <div className="header-right__user-signout">
            <span>Account: </span>
            <Select
              defaultValue="0x7c43375fc06deD6169DB079a3f5f9b75fa0ceC1D"
              style={{ width: 400 }}
            >
              <Option value="0x7c43375fc06deD6169DB079a3f5f9b75fa0ceC1D">
                0x7c43375fc06deD6169DB079a3f5f9b75fa0ceC1D
              </Option>
              <Option value="8qPKSiDVxXYmvopt4AHQWCd15xjtLv9uESU7jwY1EtAr">
                8qPKSiDVxXYmvopt4AHQWCd15xjtLv9uESU7jwY1EtAr
              </Option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
