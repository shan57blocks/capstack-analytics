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
  SETTLE: 'SETTLE',
  SETTLED: 'SETTLED',
}

export const TXType = {
  Transfer: 'Transfer',
  Swap: 'Swap',
  Open: 'Open',
  Adjust: 'Adjust',
  Harvest: 'Harvest',
  Close: 'Close',
}

export const InvestStatus = {
  InvestRequested: 'Invest requested',
  WithdrawlRequested: 'Withdrawl requested',
}
