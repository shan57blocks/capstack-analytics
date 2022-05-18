import { useSelector } from 'react-redux'
import { mapVault } from 'src/utils/apy'

import { VAULT } from '../const'

export const useVault = () => {
  const { vaults } = useSelector((state) => state.app)

  if (vaults) {
    const enhancedVaults = vaults.map((vault) => {
      return mapVault(vault)
    })

    return {
      vaults: enhancedVaults.filter((vault) => !!VAULT[vault.name]),
    }
  }

  return {}
}
