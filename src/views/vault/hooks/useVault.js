import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as vaultAction from 'src/actions/vault'

export const useVault = () => {
  const dispatch = useDispatch()
  const { vaults } = useSelector((state) => state.vault)

  useEffect(() => {
    dispatch(vaultAction.getVaults())
  }, [dispatch])

  if (vaults) {
  }

  return vaults
}
