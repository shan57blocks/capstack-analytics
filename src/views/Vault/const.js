export const VAULT = {
  ETH: 'ETH',
  USD: 'USD',
  BTC: 'BTC',
}

export const ChainEnum = {
  Ethereum: 'Ethereum',
  BSC: 'BSC',
  Polygon: 'Polygon',
  Solana: 'Solana',
  Avalanche: 'Avalanche',
}

export const Chains = {
  [ChainEnum.Ethereum]: {
    id: 1,
    name: 'Ethereum',
  },
  [ChainEnum.BSC]: {
    id: 7,
    name: 'BSC',
  },
  [ChainEnum.Avalanche]: {
    id: 63,
    name: 'Avalanche',
  },
  [ChainEnum.Solana]: {
    id: 54,
    name: 'Solana',
  },
}

export const VAULT_STATUS = {
  OPEN: 'OPEN',
}
