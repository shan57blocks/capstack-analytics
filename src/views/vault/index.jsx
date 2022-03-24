import './index.less'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as appAction from 'src/actions/app'

import Vault from './Vault'

const Vaults = () => {
  const dispatch = useDispatch()
  const { vaults } = useSelector((state) => state.app)

  useEffect(() => {
    dispatch(appAction.getVaults())
  }, [dispatch])

  if (!vaults) {
    return null
  }

  return (
    <div className="page">
      {vaults.map((vault) => (
        <Vault key={vault.id} vault={vault}></Vault>
      ))}
    </div>
  )
}

export default Vaults
