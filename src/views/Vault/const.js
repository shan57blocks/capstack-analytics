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
    name: ChainEnum.Ethereum,
  },
  [ChainEnum.BSC]: {
    id: 7,
    name: ChainEnum.BSC,
  },
  [ChainEnum.Avalanche]: {
    id: 63,
    name: ChainEnum.Avalanche,
  },
  [ChainEnum.Solana]: {
    id: 54,
    name: ChainEnum.Solana,
  },
}

export const ChainTypeEnum = {
  EVM: 'EVM',
  Solana: 'Solana',
}

export const ChainTypes = {
  [ChainTypeEnum.EVM]: {
    length: 42,
    name: ChainTypeEnum.EVM,
  },
  [ChainTypeEnum.Solana]: {
    length: 44,
    name: ChainTypeEnum.Solana,
  },
}

export const VAULT_STATUS = {
  DepositSettling: 'DepositSettling',
  PositionOpening: 'PositionOpening',
  Operating: 'Operating',
  ProfitDistributing: 'ProfitDistributing',
  WithdrawalSettling: 'WithdrawalSettling',
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
