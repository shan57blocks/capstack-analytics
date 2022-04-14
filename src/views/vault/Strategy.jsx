import './index.less'

import { Table, Tooltip } from 'antd'
import React from 'react'
import { formatTime, isEmpty } from 'src/utils/common'
import CapTooltip from 'src/components/CapTooltip'
import CapSkeleton from 'src/components/CapSkeleton'

const Strategy = () => {
  return (
    <Table
      columns={columns}
      dataSource={strategies}
      pagination={false}
      rowKey="id"
      bordered
      expandable={expandable}
    />
  )
}

export default Strategy

const columns = [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'Protocol',
    render: (_, record) => {
      const [position = {}] = record.positions
      return (
        <div>
          <div>{position.protocol?.name}</div>
          <div>({position.protocol?.chain})</div>
        </div>
      )
    },
  },
  {
    title: 'Principals',
    key: 'principalsCalculated',
    render: (_, record) => {
      if (isEmpty(record.principalsCalculated)) {
        return <CapSkeleton />
      }
      return (
        <div>
          <CapTooltip title={record.principalsCalculated}>
            <div>{record.principalsCalculated.toFixed(3)}</div>
          </CapTooltip>
          <div>{formatTime(record.startTime, 'MM/DD/YYYY HH:mm')}</div>
        </div>
      )
    },
  },
  {
    title: 'Current Estimated',
    key: 'currentBalance',
    dataIndex: 'currentBalance',
    render: (_, record) => {
      if (isEmpty(record.currentBalance)) {
        return <CapSkeleton />
      }
      return (
        <div>
          <CapTooltip title={record.currentBalance}>
            <div>{record.currentBalance.toFixed(3)}</div>
          </CapTooltip>
          <div>{formatTime(record.currentTime, 'MM/DD/YYYY HH:mm')}</div>
        </div>
      )
    },
  },
  {
    title: 'Interest',
    key: 'interest',
    dataIndex: 'interest',
    render: (_, record) => {
      if (isEmpty(record.interest)) {
        return <CapSkeleton />
      }
      const { interest, interestBalance, interestApy } = record
      return (
        <div>
          <StrategyTooltip value={interest} balance={interestBalance}>
            <div>{interestBalance.toFixed(3)}</div>
          </StrategyTooltip>
          <div>APY: {(interestApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Fee',
    key: 'fee',
    dataIndex: 'fee',
    render: (_, record) => {
      if (isEmpty(record.fee)) {
        return <CapSkeleton />
      }
      const { fee, feeBalance, feeApy } = record
      return (
        <div>
          <StrategyTooltip value={fee} balance={feeBalance}>
            <div>{feeBalance.toFixed(3)}</div>
          </StrategyTooltip>
          <div>APY: {(feeApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'IL',
    key: 'IL',
    dataIndex: 'IL',
    render: (_, record) => {
      if (isEmpty(record.IL)) {
        return <CapSkeleton />
      }
      return (
        <div>
          <Tooltip title={record.ILBalance}>
            <div>
              Current {(record.priceChange * 100).toFixed(2)}%:
              {record.ILBalance.toFixed(3)}({(record.ilApy * 100).toFixed(2)}%)
            </div>
          </Tooltip>
          <Tooltip title={record.ILBalance50}>
            <div>
              +50%: {record.ILBalance50.toFixed(3)}(
              {(record.ILLoss50 * 100).toFixed(2)}%)
            </div>
          </Tooltip>
          <Tooltip title={record.ILBalance100}>
            <div>
              +100%: {record.ILBalance100.toFixed(3)}(
              {(record.ILLoss100 * 100).toFixed(2)}%)
            </div>
          </Tooltip>
          <Tooltip title={record.ILBalance50Neg}>
            <div>
              -50%: {record.ILBalance50Neg.toFixed(3)}(
              {(record.ILLoss50Neg * 100).toFixed(2)}%)
            </div>
          </Tooltip>
          <Tooltip title={record.ILBalance75Neg}>
            <div>
              -75%: {record.ILBalance75Neg.toFixed(3)}(
              {(record.ILLoss75Neg * 100).toFixed(2)}%)
            </div>
          </Tooltip>
        </div>
      )
    },
  },
  {
    title: 'Rewards',
    key: 'rewardValue',
    dataIndex: 'rewardValue',
    render: (_, record) => {
      if (isEmpty(record.rewardValue)) {
        return <CapSkeleton />
      }
      const { rewardValue, rewardBalance, rewardsApy } = record
      return (
        <div>
          <StrategyTooltip value={rewardValue} balance={rewardBalance}>
            <div>{rewardBalance.toFixed(3)}</div>
          </StrategyTooltip>
          <div>APY: {(rewardsApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Net Without IL',
    key: 'netWithoutIL',
    dataIndex: 'netWithoutIL',
    render: (_, record) => {
      if (isEmpty(record.netWithoutIL)) {
        return <CapSkeleton />
      }
      const { netWithoutIL, netWithoutILBalance, netWithoutIlApy } = record
      return (
        <div>
          <StrategyTooltip value={netWithoutIL} balance={netWithoutILBalance}>
            <div>{netWithoutILBalance.toFixed(3)}</div>
          </StrategyTooltip>
          <div>APY: {(netWithoutIlApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Net Apy Estimated',
    key: 'netApy',
    dataIndex: 'netApy',
    render: (_, record) => {
      if (isEmpty(record.netValue)) {
        return <CapSkeleton />
      }
      const { netValue, netBalance, netValueYearly, netBalanceYearly } = record
      const currentTitle = () => {
        return (
          <>
            <div>{netBalance}</div>
            <div>${netValue}</div>
          </>
        )
      }
      const yearlyTitle = () => {
        return (
          <>
            <div>{netBalanceYearly}</div>
            <div>${netValueYearly}</div>
          </>
        )
      }
      const apyTitle = () => {
        return (
          <>
            <div>
              50% IL: {((record.netApy + record.ILLoss50) * 100).toFixed(2)}%
            </div>
            <div>
              100% IL: {((record.netApy + record.ILLoss100) * 100).toFixed(2)}%
            </div>
            <div>
              -50% IL: {((record.netApy + record.ILLoss50Neg) * 100).toFixed(2)}
              %
            </div>
            <div>
              -75% IL: {((record.netApy + record.ILLoss75Neg) * 100).toFixed(2)}
              %
            </div>
          </>
        )
      }
      return (
        <div>
          <Tooltip title={currentTitle}>
            <div>Current: {netBalance.toFixed(3)}</div>
          </Tooltip>
          <Tooltip title={yearlyTitle}>
            <div>Yearly: {netBalanceYearly.toFixed(3)}</div>
          </Tooltip>
          <Tooltip title={apyTitle}>
            <div>APY: {(record.netApy * 100).toFixed(2)}%</div>
          </Tooltip>
        </div>
      )
    },
  },
]

const expandable = {
  expandedRowRender: (record) => (
    <div className="vault-strategies-positions">
      <div className="vault-strategies-positions-title">Positions</div>
      <Table
        columns={positionColumns}
        dataSource={record.positions}
        size="small"
        bordered
        pagination={false}
      />
    </div>
  ),
}

const positionColumns = [
  {
    title: 'Principals',
    render: (position) => {
      const { principals, tokens } = position
      return (
        <div>
          {principals.map((principal, index) => {
            return (
              <div key={index}>
                <CapTooltip title={principal.balance}>
                  {principal.balance.toFixed(3)} {tokens[index].symbol}
                </CapTooltip>
              </div>
            )
          })}
        </div>
      )
    },
  },
  {
    title: 'Start Position',
    render: (position) => {
      return (
        <div>
          {position.startAssets.map((asset, index) => {
            const { startBorrows, tokens } = position
            return (
              <div key={index}>
                <CapTooltip title={asset.balance}>
                  {asset.balance.toFixed(3)} {tokens[index].symbol}
                </CapTooltip>
                <CapTooltip title={startBorrows[index].balance}>
                  ({startBorrows[index].balance.toFixed(3)} Borrow)
                </CapTooltip>
              </div>
            )
          })}
          <div>
            Leverage: {position.leverage.toFixed(1)}X (
            {formatTime(Number(position.openDate))})
          </div>
        </div>
      )
    },
  },
  {
    title: 'Current Position',
    render: (position) => {
      const { tokens } = position
      const { assets, borrows, timestamp } = position.currentHistory
      return (
        <div>
          <>
            {assets.map((asset, index) => {
              return (
                <div key={index}>
                  <CapTooltip title={asset.balance}>
                    {asset.balance.toFixed(3)} {tokens[index].symbol}
                  </CapTooltip>
                  <CapTooltip title={borrows[index].balance}>
                    ({borrows[index].balance.toFixed(3)} Borrow)
                  </CapTooltip>
                </div>
              )
            })}
          </>
          <div>{formatTime(timestamp, 'MM/DD/YYYY HH:mm')}</div>
        </div>
      )
    },
  },
  {
    title: 'Current Value',
    render: (position) => {
      const { assets } = position.currentHistory
      return (
        <div>
          {assets.map((asset, index) => {
            return (
              <div key={index}>
                <CapTooltip title={asset.balance * asset.price}>
                  ${(asset.balance * asset.price).toFixed(3)}
                </CapTooltip>
              </div>
            )
          })}
        </div>
      )
    },
  },
  {
    title: 'Interest',
    render: (position) => {
      const { interest, interestApy } = position.currentHistory
      return (
        <div>
          <div>
            <CapTooltip title={interest}>${interest.toFixed(3)}</CapTooltip>
          </div>
          <div>APY: {(interestApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Yield + Price change + Slippage + Swapping fees',
    render: (position) => {
      const { fee, feeApy } = position.currentHistory
      return (
        <div>
          <div>
            <CapTooltip title={fee}>${fee.toFixed(3)}</CapTooltip>
          </div>
          <div>APY: {(feeApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'IL',
    render: (position) => {
      const { IL, ilApy } = position.currentHistory
      return (
        <div>
          <div>
            <CapTooltip title={IL}>${IL.toFixed(3)}</CapTooltip>
          </div>
          <div>Loss: {(ilApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Rewards',
    render: (position) => {
      const { rewardValue, rewardsApy, rewards } = position.currentHistory
      return (
        <div>
          {rewards.map((reward) => {
            return (
              <div key={reward.symbol}>
                <CapTooltip title={reward.balance}>
                  {reward.balance.toFixed(3)} {reward.symbol}
                </CapTooltip>
              </div>
            )
          })}
          <div>
            <CapTooltip title={rewardValue}>
              ${rewardValue.toFixed(3)}
            </CapTooltip>
          </div>
          <div>APY: {(rewardsApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Net Without IL',
    render: (position) => {
      const { netWithoutIL, netWithoutIlApy } = position.currentHistory
      return (
        <div>
          <div>
            <CapTooltip title={netWithoutIL}>
              ${netWithoutIL.toFixed(3)}
            </CapTooltip>
          </div>
          <div>APY: {(netWithoutIlApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
  {
    title: 'Net',
    render: (position) => {
      const { netValue, netApy } = position.currentHistory
      return (
        <div>
          <div>
            <CapTooltip title={netValue}>${netValue.toFixed(3)}</CapTooltip>
          </div>
          <div>APY: {(netApy * 100).toFixed(2)}%</div>
        </div>
      )
    },
  },
]

const StrategyTooltip = ({ value, balance, children }) => {
  const title = () => {
    return (
      <>
        <div>{balance}</div>
        <div>${value}</div>
      </>
    )
  }

  return (
    <Tooltip title={title}>
      <span>{children}</span>
    </Tooltip>
  )
}

const strategies = [
  {
    id: 162,
    name: 'ETH/AVAX',
    percentage: '0.1260492728',
    positions: [
      {
        id: 138,
        protocol: {
          chain: 'Avalanche',
          logo:
            'https://assets.coingecko.com/coins/images/12738/large/AlphaToken_256x256.png',
          name: 'Alpha Homora V2',
        },
        lpToken: '0xFE15c2695F1F920da45C30AAE47d11dE51007AF9',
        tokens: [
          {
            id: 14860,
            address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
            symbol: 'WETH.e',
            decimals: 18,
          },
          {
            id: 14858,
            address: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
            symbol: 'WAVAX',
            decimals: 18,
          },
        ],
        liquidationThreshold: 1,
        leverage: 2.604816849971659,
        principals: [
          {
            balance: 3.524230248081327,
            price: 2619.97,
          },
          {
            balance: 0,
            price: 75.62,
          },
        ],
        startAssets: [
          {
            balance: 4.586355508177612,
            price: 2619.97,
          },
          {
            balance: 159.15214340873413,
            price: 75.62,
          },
        ],
        startBorrows: [
          {
            balance: 1.057269074424398,
            price: 2619.97,
          },
          {
            balance: 159.32116601753,
            price: 75.62,
          },
        ],
        closeAssets: '',
        rewards: ' ',
        openDate: '1646793017',
        closeDate: null,
        closed: false,
        histories: [
          {
            positionId: 138,
            assets: [
              {
                balance: 4.413622120900855,
                price: 3114.39,
              },
              {
                balance: 168.412727276594,
                price: 81.63,
              },
            ],
            borrows: [
              {
                balance: 1.063964801142551,
                price: 3114.39,
              },
              {
                balance: 161.22981237269707,
                price: 81.63,
              },
            ],
            rewards: [
              {
                balance: 77.40292321682126,
                price: 1.28,
                symbol: 'JOE',
              },
            ],
            dateKey: 20220414,
            timestamp: 1649915353,
            tokens: [
              {
                id: 14860,
                address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
                symbol: 'WETH.e',
                decimals: 18,
              },
              {
                id: 14858,
                address: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
                symbol: 'WAVAX',
                decimals: 18,
              },
            ],
            holdValue: 10975.827442322003,
            IL_fee_interest: 42.65316136516833,
            IL: -30.622712640451937,
            interest: -176.65590630603634,
            ILLoss: -0.0011138257086989293,
            fee: 249.9317803116566,
            rewardValue: 99.07574171753122,
            netWithoutIL: 172.3516157231515,
            netValue: 141.72890308269956,
            tokenDetails: [
              {
                startAsset: {
                  balance: 4.586355508177612,
                  price: 2619.97,
                },
                IL: -15.311356320225968,
                IL_fee_interest: -543.6881822399391,
                interest: 20.85310433374885,
                holdValue: 10975.827442322003,
                feeInterest: 117.67830640943976,
                fee: 96.82520207569091,
                currentValue: 13745.740597112414,
                tokenId: 14860,
                netValue: 184.4428682476679,
                rewardValue: 128.93498488084478,
                ILLoss: -0.0011138257086989293,
                netWithoutIL: 199.75422456789386,
              },
              {
                startAsset: {
                  balance: 159.15214340873413,
                  price: 75.62,
                },
                IL: -15.311356320225968,
                IL_fee_interest: 586.3413436051075,
                interest: 155.80280197228748,
                holdValue: 0,
                feeInterest: -44.40243240381949,
                fee: -200.20523437610697,
                currentValue: 13747.530927588368,
                tokenId: 14858,
                netValue: 167.7580787468978,
                rewardValue: 117.27146488432646,
                ILLoss: -0.0011138257086989293,
                netWithoutIL: 183.06943506712378,
              },
            ],
            ilApy: -0.0027900140377911694,
            interestApy: -0.16256156143269065,
            feeApy: 0.2299911806443055,
            rewardsApy: 0.09117106589010494,
            netWithoutIlApy: 0.15860068510171982,
            netApy: 0.15581067106392865,
          },
        ],
        symbol: 'WETH.e/WAVAX',
        currentHistory: {
          positionId: 138,
          assets: [
            {
              balance: 4.413622120900855,
              price: 3114.39,
            },
            {
              balance: 168.412727276594,
              price: 81.63,
            },
          ],
          borrows: [
            {
              balance: 1.063964801142551,
              price: 3114.39,
            },
            {
              balance: 161.22981237269707,
              price: 81.63,
            },
          ],
          rewards: [
            {
              balance: 77.40292321682126,
              price: 1.28,
              symbol: 'JOE',
            },
          ],
          dateKey: 20220414,
          timestamp: 1649915353,
          tokens: [
            {
              id: 14860,
              address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
              symbol: 'WETH.e',
              decimals: 18,
            },
            {
              id: 14858,
              address: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
              symbol: 'WAVAX',
              decimals: 18,
            },
          ],
          holdValue: 10975.827442322003,
          IL_fee_interest: 42.65316136516833,
          IL: -30.622712640451937,
          interest: -176.65590630603634,
          ILLoss: -0.0011138257086989293,
          fee: 249.9317803116566,
          rewardValue: 99.07574171753122,
          netWithoutIL: 172.3516157231515,
          netValue: 141.72890308269956,
          tokenDetails: [
            {
              startAsset: {
                balance: 4.586355508177612,
                price: 2619.97,
              },
              IL: -15.311356320225968,
              IL_fee_interest: -543.6881822399391,
              interest: 20.85310433374885,
              holdValue: 10975.827442322003,
              feeInterest: 117.67830640943976,
              fee: 96.82520207569091,
              currentValue: 13745.740597112414,
              tokenId: 14860,
              netValue: 184.4428682476679,
              rewardValue: 128.93498488084478,
              ILLoss: -0.0011138257086989293,
              netWithoutIL: 199.75422456789386,
            },
            {
              startAsset: {
                balance: 159.15214340873413,
                price: 75.62,
              },
              IL: -15.311356320225968,
              IL_fee_interest: 586.3413436051075,
              interest: 155.80280197228748,
              holdValue: 0,
              feeInterest: -44.40243240381949,
              fee: -200.20523437610697,
              currentValue: 13747.530927588368,
              tokenId: 14858,
              netValue: 167.7580787468978,
              rewardValue: 117.27146488432646,
              ILLoss: -0.0011138257086989293,
              netWithoutIL: 183.06943506712378,
            },
          ],
          ilApy: -0.0027900140377911694,
          interestApy: -0.16256156143269065,
          feeApy: 0.2299911806443055,
          rewardsApy: 0.09117106589010494,
          netWithoutIlApy: 0.15860068510171982,
          netApy: 0.15581067106392865,
        },
      },
    ],
    principals: '3524230248081320000',
    tokenId: 14860,
    interest: -176.65590630603634,
    interestBalance: -0.05672247416220716,
    fee: 249.9317803116566,
    feeBalance: 0.08025063666132264,
    IL: -30.622712640451937,
    ILBalance: -0.009832651864555158,
    rewardValue: 99.07574171753122,
    rewardBalance: 0.03181224628820771,
    netWithoutIL: 172.3516157231515,
    netWithoutILBalance: 0.0553404087873232,
    netValue: 141.72890308269956,
    netBalance: 0.045507756922768046,
    holdValue: 10975.827442322003,
    startTime: '1646793017',
    currentTime: 1649915353,
    interestApy: -0.16256156143269065,
    ilApy: -0.0027900140377911694,
    feeApy: 0.2299911806443055,
    rewardsApy: 0.09117106589010494,
    netWithoutIlApy: 0.15860068510171982,
    netApy: 0.15581067106392865,
    netValueYearly: 1710.1510392700745,
    netBalanceYearly: 0.5491126799373471,
    principalsCalculated: 3.52423024808132,
    currentBalance: 3.5697380050040883,
    ILLoss: -0.0011138257086989293,
    priceChange: 0.10119328468819423,
    ILLoss50: -0.030677517803055596,
    ILBalance50: -0.10951070120075708,
    ILLoss100: -0.07316374236828216,
    ILBalance100: -0.2611753917203846,
    ILLoss50Neg: -0.042920672469690876,
    ILBalance50Neg: -0.1532155557153882,
    ILLoss75Neg: -0.17715129651876657,
    ILBalance75Neg: -0.6323837158187895,
  },
  {
    id: 163,
    name: 'ETH/USDT',
    percentage: '0.2671452596',
    positions: [
      {
        id: 142,
        protocol: {
          chain: 'BSC',
          logo:
            'https://assets.coingecko.com/coins/images/14165/large/Logo200.png',
          name: 'Alpaca Finance',
        },
        lpToken: '0x0FB881c078434b1C0E4d0B64d8c64d12078b7Ce2',
        tokens: [
          {
            id: 14866,
            address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
            symbol: 'ETH',
            decimals: 18,
          },
          {
            id: 14864,
            address: '0x55d398326f99059ff775485246999027b3197955',
            symbol: 'USDT',
            decimals: 18,
          },
        ],
        liquidationThreshold: 1,
        leverage: 2.599929909674469,
        principals: [
          {
            balance: 1.4191537940470584,
            price: 2614.49,
          },
          {
            balance: 0,
            price: 1,
          },
        ],
        startAssets: [
          {
            balance: 1.8424178004290541,
            price: 2614.49,
          },
          {
            balance: 4818.108855585749,
            price: 1,
          },
        ],
        startBorrows: [
          {
            balance: 2.2705466015238893,
            price: 2614.49,
          },
          {
            balance: 0,
            price: 1,
          },
        ],
        closeAssets: '',
        rewards: ' ',
        openDate: '1646789952',
        closeDate: null,
        closed: false,
        histories: [
          {
            positionId: 142,
            assets: [
              {
                balance: 1.693242807494606,
                price: 3112.53,
              },
              {
                balance: 5273.670840026362,
                price: 1.001,
              },
            ],
            borrows: [
              {
                balance: 2.2877497313573127,
                price: 3112.53,
              },
              {
                balance: 0,
                price: 1.001,
              },
            ],
            rewards: [
              {
                balance: 66.89208316124864,
                price: 0.564533,
                symbol: 'ALPACA',
              },
              {
                balance: 0.01743456033823685,
                price: 3112.53,
                symbol: 'ETH',
              },
              {
                balance: 54.30061894105093,
                price: 1.001,
                symbol: 'USDT',
              },
            ],
            dateKey: 20220414,
            timestamp: 1649915351,
            tokens: [
              {
                id: 14866,
                address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
                symbol: 'ETH',
                decimals: 18,
              },
              {
                id: 14864,
                address: '0x55d398326f99059ff775485246999027b3197955',
                symbol: 'USDT',
                decimals: 18,
              },
            ],
            holdValue: 4417.158758585291,
            IL_fee_interest: -988.6348834492937,
            IL: -39.434856535814106,
            interest: -53.54525770042542,
            ILLoss: -0.0037381797573887926,
            fee: -895.6547692130542,
            rewardValue: 146.3833000328335,
            netWithoutIL: -802.8167268806461,
            netValue: -842.2515834164602,
            tokenDetails: [
              {
                startAsset: {
                  balance: 1.8424178004290541,
                  price: 2614.49,
                },
                IL: -19.717428267907053,
                IL_fee_interest: -6267.579394315682,
                interest: 53.54525770042542,
                holdValue: 4417.158758585291,
                feeInterest: -5792.03511008372,
                fee: -5845.580367784145,
                currentValue: 5270.269035611186,
                tokenId: 14866,
                netValue: -1093.4539415215672,
                rewardValue: 190.04226236603097,
                ILLoss: -0.0037381797573887926,
                netWithoutIL: -1073.7365132536602,
              },
              {
                startAsset: {
                  balance: 4818.108855585749,
                  price: 1,
                },
                IL: -19.717428267907053,
                IL_fee_interest: 5278.944510866389,
                interest: 0,
                holdValue: 0,
                feeInterest: 4842.83508317024,
                fee: 4842.83508317024,
                currentValue: 5278.944510866389,
                tokenId: 14864,
                netValue: -919.6223397240205,
                rewardValue: 159.83033516738982,
                ILLoss: -0.0037381797573887926,
                netWithoutIL: -899.9049114561135,
              },
            ],
            ilApy: -0.008927652070274272,
            interestApy: -0.1223148374440198,
            feeApy: -2.045967695499305,
            rewardsApy: 0.3343872140500121,
            netWithoutIlApy: -1.8338953188933127,
            netApy: -1.842822970963587,
          },
        ],
        symbol: 'ETH/USDT',
        currentHistory: {
          positionId: 142,
          assets: [
            {
              balance: 1.693242807494606,
              price: 3112.53,
            },
            {
              balance: 5273.670840026362,
              price: 1.001,
            },
          ],
          borrows: [
            {
              balance: 2.2877497313573127,
              price: 3112.53,
            },
            {
              balance: 0,
              price: 1.001,
            },
          ],
          rewards: [
            {
              balance: 66.89208316124864,
              price: 0.564533,
              symbol: 'ALPACA',
            },
            {
              balance: 0.01743456033823685,
              price: 3112.53,
              symbol: 'ETH',
            },
            {
              balance: 54.30061894105093,
              price: 1.001,
              symbol: 'USDT',
            },
          ],
          dateKey: 20220414,
          timestamp: 1649915351,
          tokens: [
            {
              id: 14866,
              address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
              symbol: 'ETH',
              decimals: 18,
            },
            {
              id: 14864,
              address: '0x55d398326f99059ff775485246999027b3197955',
              symbol: 'USDT',
              decimals: 18,
            },
          ],
          holdValue: 4417.158758585291,
          IL_fee_interest: -988.6348834492937,
          IL: -39.434856535814106,
          interest: -53.54525770042542,
          ILLoss: -0.0037381797573887926,
          fee: -895.6547692130542,
          rewardValue: 146.3833000328335,
          netWithoutIL: -802.8167268806461,
          netValue: -842.2515834164602,
          tokenDetails: [
            {
              startAsset: {
                balance: 1.8424178004290541,
                price: 2614.49,
              },
              IL: -19.717428267907053,
              IL_fee_interest: -6267.579394315682,
              interest: 53.54525770042542,
              holdValue: 4417.158758585291,
              feeInterest: -5792.03511008372,
              fee: -5845.580367784145,
              currentValue: 5270.269035611186,
              tokenId: 14866,
              netValue: -1093.4539415215672,
              rewardValue: 190.04226236603097,
              ILLoss: -0.0037381797573887926,
              netWithoutIL: -1073.7365132536602,
            },
            {
              startAsset: {
                balance: 4818.108855585749,
                price: 1,
              },
              IL: -19.717428267907053,
              IL_fee_interest: 5278.944510866389,
              interest: 0,
              holdValue: 0,
              feeInterest: 4842.83508317024,
              fee: 4842.83508317024,
              currentValue: 5278.944510866389,
              tokenId: 14864,
              netValue: -919.6223397240205,
              rewardValue: 159.83033516738982,
              ILLoss: -0.0037381797573887926,
              netWithoutIL: -899.9049114561135,
            },
          ],
          ilApy: -0.008927652070274272,
          interestApy: -0.1223148374440198,
          feeApy: -2.045967695499305,
          rewardsApy: 0.3343872140500121,
          netWithoutIlApy: -1.8338953188933127,
          netApy: -1.842822970963587,
        },
      },
      {
        id: 143,
        protocol: {
          chain: 'BSC',
          logo:
            'https://assets.coingecko.com/coins/images/14165/large/Logo200.png',
          name: 'Alpaca Finance',
        },
        lpToken: '0x0FB881c078434b1C0E4d0B64d8c64d12078b7Ce2',
        tokens: [
          {
            id: 14866,
            address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
            symbol: 'ETH',
            decimals: 18,
          },
          {
            id: 14864,
            address: '0x55d398326f99059ff775485246999027b3197955',
            symbol: 'USDT',
            decimals: 18,
          },
        ],
        liquidationThreshold: 1,
        leverage: 2.598245696830508,
        principals: [
          {
            balance: 6.050000000000001,
            price: 2617.98,
          },
          {
            balance: 0,
            price: 1,
          },
        ],
        startAssets: [
          {
            balance: 7.85906099301557,
            price: 2617.98,
          },
          {
            balance: 20567.370781816186,
            price: 1,
          },
        ],
        startBorrows: [
          {
            balance: 0,
            price: 2617.98,
          },
          {
            balance: 25314.260379799416,
            price: 1,
          },
        ],
        closeAssets: '',
        rewards: ' ',
        openDate: '1646789823',
        closeDate: null,
        closed: false,
        histories: [
          {
            positionId: 143,
            assets: [
              {
                balance: 7.225397650900528,
                price: 3112.53,
              },
              {
                balance: 22503.783113970487,
                price: 1.001,
              },
            ],
            borrows: [
              {
                balance: 0,
                price: 3112.53,
              },
              {
                balance: 25664.251665738808,
                price: 1.001,
              },
            ],
            rewards: [
              {
                balance: 49.38742251143861,
                price: 0.564533,
                symbol: 'ALPACA',
              },
              {
                balance: 0.07430739970145867,
                price: 3112.53,
                symbol: 'ETH',
              },
              {
                balance: 231.43329785265576,
                price: 1.001,
                symbol: 'USDT',
              },
            ],
            dateKey: 20220414,
            timestamp: 1649915357,
            tokens: [
              {
                id: 14866,
                address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
                symbol: 'ETH',
                decimals: 18,
              },
              {
                id: 14864,
                address: '0x55d398326f99059ff775485246999027b3197955',
                symbol: 'USDT',
                decimals: 18,
              },
            ],
            holdValue: 18830.806500000002,
            IL_fee_interest: 494.83143003732994,
            IL: -166.8476681523607,
            interest: -350.341277225331,
            ILLoss: -0.0037064448594325643,
            fee: 1012.0203754150216,
            rewardValue: 490.8295717359395,
            netWithoutIL: 1152.50866992563,
            netValue: 985.6610017732694,
            tokenDetails: [
              {
                startAsset: {
                  balance: 7.85906099301557,
                  price: 2617.98,
                },
                IL: -83.42383407618036,
                IL_fee_interest: 3658.460450357419,
                interest: 0,
                holdValue: 18830.806500000002,
                feeInterest: 5678.696764429977,
                fee: 5678.696764429977,
                currentValue: 22489.26695035742,
                tokenId: 14866,
                netValue: 1280.3917241938764,
                rewardValue: 637.596618421233,
                ILLoss: -0.0037064448594325643,
                netWithoutIL: 1363.8155582700567,
              },
              {
                startAsset: {
                  balance: 20567.370781816186,
                  price: 1,
                },
                IL: -83.42383407618036,
                IL_fee_interest: -3163.6290203200892,
                interest: 350.341277225331,
                holdValue: 0,
                feeInterest: -5017.017666240286,
                fee: -5367.358943465618,
                currentValue: 22526.286897084454,
                tokenId: 14864,
                netValue: 1077.6345529298417,
                rewardValue: 536.629637523262,
                ILLoss: -0.0037064448594325643,
                netWithoutIL: 1161.058387006022,
              },
            ],
            ilApy: -0.008860356998111616,
            interestApy: -0.1877175025415532,
            feeApy: 0.5422539384986209,
            rewardsApy: 0.2629929938873581,
            netWithoutIlApy: 0.6175294298444258,
            netApy: 0.6086690728463142,
          },
        ],
        symbol: 'ETH/USDT',
        currentHistory: {
          positionId: 143,
          assets: [
            {
              balance: 7.225397650900528,
              price: 3112.53,
            },
            {
              balance: 22503.783113970487,
              price: 1.001,
            },
          ],
          borrows: [
            {
              balance: 0,
              price: 3112.53,
            },
            {
              balance: 25664.251665738808,
              price: 1.001,
            },
          ],
          rewards: [
            {
              balance: 49.38742251143861,
              price: 0.564533,
              symbol: 'ALPACA',
            },
            {
              balance: 0.07430739970145867,
              price: 3112.53,
              symbol: 'ETH',
            },
            {
              balance: 231.43329785265576,
              price: 1.001,
              symbol: 'USDT',
            },
          ],
          dateKey: 20220414,
          timestamp: 1649915357,
          tokens: [
            {
              id: 14866,
              address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
              symbol: 'ETH',
              decimals: 18,
            },
            {
              id: 14864,
              address: '0x55d398326f99059ff775485246999027b3197955',
              symbol: 'USDT',
              decimals: 18,
            },
          ],
          holdValue: 18830.806500000002,
          IL_fee_interest: 494.83143003732994,
          IL: -166.8476681523607,
          interest: -350.341277225331,
          ILLoss: -0.0037064448594325643,
          fee: 1012.0203754150216,
          rewardValue: 490.8295717359395,
          netWithoutIL: 1152.50866992563,
          netValue: 985.6610017732694,
          tokenDetails: [
            {
              startAsset: {
                balance: 7.85906099301557,
                price: 2617.98,
              },
              IL: -83.42383407618036,
              IL_fee_interest: 3658.460450357419,
              interest: 0,
              holdValue: 18830.806500000002,
              feeInterest: 5678.696764429977,
              fee: 5678.696764429977,
              currentValue: 22489.26695035742,
              tokenId: 14866,
              netValue: 1280.3917241938764,
              rewardValue: 637.596618421233,
              ILLoss: -0.0037064448594325643,
              netWithoutIL: 1363.8155582700567,
            },
            {
              startAsset: {
                balance: 20567.370781816186,
                price: 1,
              },
              IL: -83.42383407618036,
              IL_fee_interest: -3163.6290203200892,
              interest: 350.341277225331,
              holdValue: 0,
              feeInterest: -5017.017666240286,
              fee: -5367.358943465618,
              currentValue: 22526.286897084454,
              tokenId: 14864,
              netValue: 1077.6345529298417,
              rewardValue: 536.629637523262,
              ILLoss: -0.0037064448594325643,
              netWithoutIL: 1161.058387006022,
            },
          ],
          ilApy: -0.008860356998111616,
          interestApy: -0.1877175025415532,
          feeApy: 0.5422539384986209,
          rewardsApy: 0.2629929938873581,
          netWithoutIlApy: 0.6175294298444258,
          netApy: 0.6086690728463142,
        },
      },
    ],
    principals: '7469153794047050000',
    tokenId: 14866,
    interest: -403.8865349257564,
    interestBalance: -0.1297614914316509,
    fee: 116.36560620196735,
    feeBalance: 0.037386179796489505,
    IL: -206.28252468817482,
    ILBalance: -0.06627487114603708,
    rewardValue: 637.212871768773,
    rewardBalance: 0.20472505382077377,
    netWithoutIL: 349.691943044984,
    netWithoutILBalance: 0.11234974218561233,
    netValue: 143.40941835680917,
    netBalance: 0.04607487103957525,
    holdValue: 23247.965258585293,
    startTime: '1646789823',
    currentTime: 1649915357,
    interestApy: -0.1752898647659337,
    ilApy: -0.008873143193122946,
    feeApy: 0.05050356872703944,
    rewardsApy: 0.27655529080708996,
    netWithoutIlApy: 0.15176899476819575,
    netApy: 0.1428958515750728,
    netValueYearly: 3322.037793013253,
    netBalanceYearly: 1.0673110919455404,
    principalsCalculated: 7.46915379404705,
    currentBalance: 7.515228665086625,
    ILLoss: -0.0037381797573887926,
    priceChange: 0.1893029154521839,
    ILLoss50: -0.04046735741781255,
    ILBalance50: -0.30412144446665074,
    ILLoss100: -0.08703588388100043,
    ILBalance100: -0.6540945694336454,
    ILLoss50Neg: -0.03284637179445445,
    ILBalance50Neg: -0.24684799485377693,
    ILLoss75Neg: -0.15938485438336383,
    ILBalance75Neg: -1.1978136264425137,
  },
  {
    id: 164,
    name: 'ETH/USDC',
    percentage: '0.1199685032',
    positions: [
      {
        id: 144,
        protocol: {
          chain: 'Avalanche',
          logo:
            'https://assets.coingecko.com/coins/images/17569/large/joe_200x200.png',
          name: 'Trader Joe',
        },
        lpToken: '0x199fb78019A08af2Cb6a078409D0C8233Eba8a0c',
        tokens: [
          {
            id: 14860,
            address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
            symbol: 'WETH.e',
            decimals: 18,
          },
          {
            id: 14862,
            address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
            symbol: 'USDC.e',
            decimals: 6,
          },
        ],
        liquidationThreshold: 1,
        leverage: 1,
        principals: [
          {
            balance: 3.354217112036585,
            price: 2916.04,
          },
          {
            balance: 9813.844281,
            price: 0.9994,
          },
        ],
        startAssets: [
          {
            balance: 3.354217112036585,
            price: 2916.04,
          },
          {
            balance: 9813.844281,
            price: 0.9994,
          },
        ],
        startBorrows: [
          {
            balance: 0,
            price: 2916.04,
          },
          {
            balance: 0,
            price: 0.9994,
          },
        ],
        closeAssets: [],
        rewards: [],
        openDate: '1644624172',
        closeDate: null,
        closed: false,
        histories: [
          {
            positionId: 144,
            assets: [
              {
                balance: 3.3103525422062567,
                price: 3114.39,
              },
              {
                balance: 10316.498307083059,
                price: 0.99917,
              },
            ],
            rewards: [
              {
                balance: 109.63157368545758,
                price: 1.28,
                symbol: 'JOE',
              },
            ],
            dateKey: 20220414,
            timestamp: 1649915353,
            borrows: [
              {
                balance: 0,
              },
              {
                balance: 0,
              },
            ],
            tokens: [
              {
                id: 14860,
                address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
                symbol: 'WETH.e',
                decimals: 18,
              },
              {
                id: 14862,
                address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
                symbol: 'USDC.e',
                decimals: 6,
              },
            ],
            holdValue: 20252.03902180239,
            IL_fee_interest: 365.62544560753486,
            IL: -10.135379005243522,
            interest: 0,
            ILLoss: -0.0004915871543677697,
            fee: 375.7608246127784,
            rewardValue: 140.32841431738572,
            netWithoutIL: 516.0892389301641,
            netValue: 505.9538599249206,
            tokenDetails: [
              {
                startAsset: {
                  balance: 3.354217112036585,
                  price: 2916.04,
                },
                IL: -5.067689502621761,
                IL_fee_interest: -136.61137763387524,
                interest: 0,
                holdValue: 10446.34023155562,
                feeInterest: 188.77703252317224,
                fee: 188.77703252317224,
                currentValue: 10309.728853921744,
                tokenId: 14860,
                netValue: 260.97945775013466,
                rewardValue: 72.38374163391516,
                ILLoss: -0.0004915871543677697,
                netWithoutIL: 266.0471472527564,
              },
              {
                startAsset: {
                  balance: 9813.844281,
                  price: 0.9994,
                },
                IL: -5.067689502621761,
                IL_fee_interest: 502.2368232414101,
                interest: 0,
                holdValue: 9805.69879024677,
                feeInterest: 186.98379208960614,
                fee: 186.98379208960614,
                currentValue: 10307.93561348818,
                tokenId: 14862,
                netValue: 244.97440217478598,
                rewardValue: 67.94467268347056,
                ILLoss: -0.0004915871543677697,
                netWithoutIL: 250.04209167740774,
              },
            ],
            ilApy: -0.0005004621507163921,
            interestApy: 0,
            feeApy: 0.1105851301958535,
            rewardsApy: 0.041298174133658876,
            netWithoutIlApy: 0.1518833043295124,
            netApy: 0.151382842178796,
          },
        ],
        symbol: 'WETH.e/USDC.e',
        currentHistory: {
          positionId: 144,
          assets: [
            {
              balance: 3.3103525422062567,
              price: 3114.39,
            },
            {
              balance: 10316.498307083059,
              price: 0.99917,
            },
          ],
          rewards: [
            {
              balance: 109.63157368545758,
              price: 1.28,
              symbol: 'JOE',
            },
          ],
          dateKey: 20220414,
          timestamp: 1649915353,
          borrows: [
            {
              balance: 0,
            },
            {
              balance: 0,
            },
          ],
          tokens: [
            {
              id: 14860,
              address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
              symbol: 'WETH.e',
              decimals: 18,
            },
            {
              id: 14862,
              address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
              symbol: 'USDC.e',
              decimals: 6,
            },
          ],
          holdValue: 20252.03902180239,
          IL_fee_interest: 365.62544560753486,
          IL: -10.135379005243522,
          interest: 0,
          ILLoss: -0.0004915871543677697,
          fee: 375.7608246127784,
          rewardValue: 140.32841431738572,
          netWithoutIL: 516.0892389301641,
          netValue: 505.9538599249206,
          tokenDetails: [
            {
              startAsset: {
                balance: 3.354217112036585,
                price: 2916.04,
              },
              IL: -5.067689502621761,
              IL_fee_interest: -136.61137763387524,
              interest: 0,
              holdValue: 10446.34023155562,
              feeInterest: 188.77703252317224,
              fee: 188.77703252317224,
              currentValue: 10309.728853921744,
              tokenId: 14860,
              netValue: 260.97945775013466,
              rewardValue: 72.38374163391516,
              ILLoss: -0.0004915871543677697,
              netWithoutIL: 266.0471472527564,
            },
            {
              startAsset: {
                balance: 9813.844281,
                price: 0.9994,
              },
              IL: -5.067689502621761,
              IL_fee_interest: 502.2368232414101,
              interest: 0,
              holdValue: 9805.69879024677,
              feeInterest: 186.98379208960614,
              fee: 186.98379208960614,
              currentValue: 10307.93561348818,
              tokenId: 14862,
              netValue: 244.97440217478598,
              rewardValue: 67.94467268347056,
              ILLoss: -0.0004915871543677697,
              netWithoutIL: 250.04209167740774,
            },
          ],
          ilApy: -0.0005004621507163921,
          interestApy: 0,
          feeApy: 0.1105851301958535,
          rewardsApy: 0.041298174133658876,
          netWithoutIlApy: 0.1518833043295124,
          netApy: 0.151382842178796,
        },
      },
    ],
    principals: '3354217112036580000',
    tokenId: 14860,
    sharedPosition: true,
    interest: 0,
    interestBalance: 0,
    fee: 188.77703252317224,
    feeBalance: 0.060614448583244954,
    IL: -5.067689502621761,
    ILBalance: -0.0016271852602345116,
    rewardValue: 72.38374163391516,
    rewardBalance: 0.023241707568389048,
    netWithoutIL: 266.0471472527564,
    netWithoutILBalance: 0.08542512249678313,
    netValue: 260.97945775013466,
    netBalance: 0.08379793723654862,
    holdValue: 10446.34023155562,
    startTime: '1644624172',
    currentTime: 1649915353,
    interestApy: 0,
    ilApy: -0.0004851162598853153,
    feeApy: 0.10770577184316892,
    rewardsApy: 0.04129817413365888,
    netWithoutIlApy: 0.15179184119240768,
    netApy: 0.15130672493252237,
    netValueYearly: 1580.6015279675282,
    netBalanceYearly: 0.5075156059348792,
    principalsCalculated: 3.35421711203658,
    currentBalance: 3.4380150492731283,
    ILLoss: -0.0004915871543677697,
    priceChange: 0.06826617766934838,
    ILLoss50: -0.027159960851294993,
    ILBalance50: -0.09337635414442119,
    ILLoss100: -0.06795912098238278,
    ILBalance100: -0.23364448067280524,
    ILLoss50Neg: -0.04722204520154454,
    ILBalance50Neg: -0.16235010206036604,
    ILLoss75Neg: -0.18428149381878678,
    ILBalance75Neg: -0.6335625490515219,
  },
  {
    id: 165,
    name: 'ETH/TOKE',
    percentage: '0.2152067252',
    positions: [
      {
        id: 148,
        protocol: {
          chain: 'Ethereum',
          logo:
            'https://assets.coingecko.com/coins/images/17495/large/tokemak-avatar-200px-black.png',
          name: 'Tokemak',
        },
        lpToken: '0xd4e7a6e2D03e4e48DfC27dd3f46DF1c176647E38',
        tokens: [
          {
            id: 14873,
            address: '0x2e9d63788249371f1dfc918a52f8d799f4a38c94',
            symbol: 'TOKE',
            decimals: 18,
          },
          {
            id: 14874,
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            symbol: 'WETH',
            decimals: 18,
          },
        ],
        liquidationThreshold: 1,
        leverage: 1,
        principals: [
          {
            balance: 528.0191204197482,
            price: 30.42,
          },
          {
            balance: 6.016996635814503,
            price: 2648.73,
          },
        ],
        startAssets: [
          {
            balance: 528.0191204197482,
            price: 30.42,
          },
          {
            balance: 6.016996635814503,
            price: 2648.73,
          },
        ],
        startBorrows: [
          {
            balance: 0,
            price: 37.8,
          },
          {
            balance: 0,
            price: 2917.46,
          },
        ],
        closeAssets: [],
        rewards: [],
        openDate: '1646240400',
        closeDate: null,
        closed: false,
        histories: [
          {
            positionId: 148,
            assets: [
              {
                balance: 705.340759753693,
                price: 19.91,
              },
              {
                balance: 4.514411812926789,
                price: 3114.39,
              },
            ],
            rewards: [
              {
                balance: 167.36158238360733,
                price: 19.91,
                symbol: 'TOKE',
              },
            ],
            dateKey: 20220414,
            timestamp: 1649915346,
            borrows: [
              {
                balance: 0,
              },
              {
                balance: 0,
              },
            ],
            tokens: [
              {
                id: 14873,
                address: '0x2e9d63788249371f1dfc918a52f8d799f4a38c94',
                symbol: 'TOKE',
                decimals: 18,
              },
              {
                id: 14874,
                address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
                decimals: 18,
              },
            ],
            holdValue: 29252.134840171515,
            IL_fee_interest: -1149.161307414428,
            IL: -1180.5564340771634,
            interest: 0,
            ILLoss: -0.04200823918867859,
            fee: 31.395126662735493,
            rewardValue: 3332.169105257622,
            netWithoutIL: 3363.5642319203575,
            netValue: 2183.007797843194,
            tokenDetails: [
              {
                startAsset: {
                  balance: 528.0191204197482,
                  price: 30.42,
                },
                IL: -590.2782170385817,
                IL_fee_interest: 3530.47383913884,
                interest: 0,
                holdValue: 10512.860687557188,
                feeInterest: 7.545323648851991,
                fee: 7.545323648851991,
                currentValue: 14043.334526696028,
                tokenId: 14873,
                netValue: 784.5463923904824,
                rewardValue: 1197.5409583730084,
                ILLoss: -0.04200823918867859,
                netWithoutIL: 1374.8246094290641,
              },
              {
                startAsset: {
                  balance: 6.016996635814503,
                  price: 2648.73,
                },
                IL: -590.2782170385817,
                IL_fee_interest: -4679.635146553268,
                interest: 0,
                holdValue: 18739.27415261433,
                feeInterest: 23.849803013883502,
                fee: 23.849803013883502,
                currentValue: 14059.639006061061,
                tokenId: 14874,
                netValue: 1398.461405452712,
                rewardValue: 2134.628146884614,
                ILLoss: -0.04200823918867859,
                netWithoutIL: 1988.7396224912936,
              },
            ],
            ilApy: -0.040357958163652494,
            interestApy: 0,
            feeApy: 0.009210014584101959,
            rewardsApy: 0.9775187845489226,
            netWithoutIlApy: 0.9867287991330246,
            netApy: 0.9463708409693721,
          },
        ],
        symbol: 'TOKE/WETH',
        currentHistory: {
          positionId: 148,
          assets: [
            {
              balance: 705.340759753693,
              price: 19.91,
            },
            {
              balance: 4.514411812926789,
              price: 3114.39,
            },
          ],
          rewards: [
            {
              balance: 167.36158238360733,
              price: 19.91,
              symbol: 'TOKE',
            },
          ],
          dateKey: 20220414,
          timestamp: 1649915346,
          borrows: [
            {
              balance: 0,
            },
            {
              balance: 0,
            },
          ],
          tokens: [
            {
              id: 14873,
              address: '0x2e9d63788249371f1dfc918a52f8d799f4a38c94',
              symbol: 'TOKE',
              decimals: 18,
            },
            {
              id: 14874,
              address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
              symbol: 'WETH',
              decimals: 18,
            },
          ],
          holdValue: 29252.134840171515,
          IL_fee_interest: -1149.161307414428,
          IL: -1180.5564340771634,
          interest: 0,
          ILLoss: -0.04200823918867859,
          fee: 31.395126662735493,
          rewardValue: 3332.169105257622,
          netWithoutIL: 3363.5642319203575,
          netValue: 2183.007797843194,
          tokenDetails: [
            {
              startAsset: {
                balance: 528.0191204197482,
                price: 30.42,
              },
              IL: -590.2782170385817,
              IL_fee_interest: 3530.47383913884,
              interest: 0,
              holdValue: 10512.860687557188,
              feeInterest: 7.545323648851991,
              fee: 7.545323648851991,
              currentValue: 14043.334526696028,
              tokenId: 14873,
              netValue: 784.5463923904824,
              rewardValue: 1197.5409583730084,
              ILLoss: -0.04200823918867859,
              netWithoutIL: 1374.8246094290641,
            },
            {
              startAsset: {
                balance: 6.016996635814503,
                price: 2648.73,
              },
              IL: -590.2782170385817,
              IL_fee_interest: -4679.635146553268,
              interest: 0,
              holdValue: 18739.27415261433,
              feeInterest: 23.849803013883502,
              fee: 23.849803013883502,
              currentValue: 14059.639006061061,
              tokenId: 14874,
              netValue: 1398.461405452712,
              rewardValue: 2134.628146884614,
              ILLoss: -0.04200823918867859,
              netWithoutIL: 1988.7396224912936,
            },
          ],
          ilApy: -0.040357958163652494,
          interestApy: 0,
          feeApy: 0.009210014584101959,
          rewardsApy: 0.9775187845489226,
          netWithoutIlApy: 0.9867287991330246,
          netApy: 0.9463708409693721,
        },
      },
    ],
    principals: '6016996635814500000',
    tokenId: 14874,
    sharedPosition: true,
    interest: 0,
    interestBalance: 0,
    fee: 23.849803013883502,
    feeBalance: 0.007657937192799715,
    IL: -590.2782170385817,
    ILBalance: -0.18953253029921807,
    rewardValue: 2134.628146884614,
    rewardBalance: 0.6854081045998138,
    netWithoutIL: 1988.7396224912936,
    netWithoutILBalance: 0.6385647341827111,
    netValue: 1398.461405452712,
    netBalance: 0.4490322038834931,
    holdValue: 18739.27415261433,
    startTime: '1646240400',
    currentTime: 1649915346,
    interestApy: 0,
    ilApy: -0.031499524060073135,
    feeApy: 0.010921635455752678,
    rewardsApy: 0.9775187845489227,
    netWithoutIlApy: 0.9107114704728272,
    netApy: 0.879211946412754,
    netValueYearly: 16475.79370208225,
    netBalanceYearly: 5.29021532373346,
    principalsCalculated: 6.0169966358145,
    currentBalance: 6.4660288396979935,
    ILLoss: -0.04200823918867859,
    priceChange: -0.44335700958482005,
    ILLoss50: -0.004052755816176393,
    ILBalance50: -0.026205235987650337,
    ILLoss100: -0.0014378650890759727,
    ILBalance100: -0.009297277133560164,
    ILLoss50Neg: -0.1746022543598855,
    ILBalance50Neg: -1.1289832121673042,
    ILLoss75Neg: -0.3450572178389184,
    ILBalance75Neg: -2.231149921892399,
  },
  {
    id: 178,
    name: 'RAY/ETH',
    percentage: '0.2716302391',
    positions: [
      {
        id: 157,
        protocol: {
          chain: 'Solana',
          logo:
            'https://pbs.twimg.com/profile_images/1476861175023353857/Srga_3kj_400x400.jpg',
          name: 'Francium',
        },
        lpToken: 'mjQH33MqZv5aKAbKHi8dG3g3qXeRQqq1GFcXceZkNSr',
        tokens: [
          {
            id: 14881,
            address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
            symbol: 'RAY',
            decimals: 6,
          },
          {
            id: 14882,
            address: '2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk',
            symbol: 'ETH',
            decimals: 6,
          },
        ],
        liquidationThreshold: 0.8333,
        leverage: 3,
        principals: [
          {
            balance: 0,
            price: 3.18,
          },
          {
            balance: 7.59455,
            price: 3105.19,
          },
        ],
        startAssets: [
          {
            balance: 11131.917873,
            price: 3.18,
          },
          {
            balance: 11.391797,
            price: 3105.19,
          },
        ],
        startBorrows: [
          {
            balance: 11131.891489,
            price: 3.18,
          },
          {
            balance: 3.797274,
            price: 3105.19,
          },
        ],
        closeAssets: [],
        rewards: [],
        openDate: '1648158000',
        closeDate: null,
        closed: false,
        histories: [
          {
            positionId: 157,
            assets: [
              {
                balance: 11793.482745129118,
                price: 2.85,
              },
              {
                balance: 10.782735885776598,
                price: 3112.53,
              },
            ],
            borrows: [
              {
                balance: 11342.978364999999,
                price: 2.85,
              },
              {
                balance: 3.8148839999999997,
                price: 3112.53,
              },
            ],
            rewards: [
              {
                balance: 164.88500747204944,
                price: 2.85,
                symbol: 'RAY',
              },
              {
                balance: 0.15075372775948762,
                price: 3112.53,
                symbol: 'ETH',
              },
            ],
            dateKey: 20220414,
            timestamp: 1649915355,
            tokens: [
              {
                id: 14881,
                address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
                symbol: 'RAY',
                decimals: 6,
              },
              {
                id: 14882,
                address: '2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk',
                symbol: 'ETH',
                decimals: 6,
              },
            ],
            holdValue: 23638.2647115,
            IL_fee_interest: -666.6791980957712,
            IL: -103.6990322138372,
            interest: -656.409249899998,
            ILLoss: -0.001543760282302474,
            fee: 93.42908401806403,
            rewardValue: 939.1477715585789,
            netWithoutIL: 376.16760567664505,
            netValue: 272.46857346280785,
            tokenDetails: [
              {
                startAsset: {
                  balance: 11131.917873,
                  price: 3.18,
                },
                IL: -51.8495161069186,
                IL_fee_interest: 1283.9374833679906,
                interest: 601.5975965999983,
                holdValue: 0,
                feeInterest: -529.8849897050966,
                fee: -1131.4825863050949,
                currentValue: 33611.42582361799,
                tokenId: 14881,
                netValue: 365.6921853770703,
                rewardValue: 1260.4719752024612,
                ILLoss: -0.001543760282302474,
                netWithoutIL: 417.5417014839889,
              },
              {
                startAsset: {
                  balance: 11.391797,
                  price: 3105.19,
                },
                IL: -51.8495161069186,
                IL_fee_interest: -1950.6166814637618,
                interest: 54.811653299999705,
                holdValue: 23638.2647115,
                feeInterest: -33.09517617683741,
                fee: -87.90682947683712,
                currentValue: 33561.58892655624,
                tokenId: 14882,
                netValue: 408.7018556422559,
                rewardValue: 1408.7181948367852,
                ILLoss: -0.001543760282302474,
                netWithoutIL: 460.5513717491745,
              },
            ],
            ilApy: -0.004386913907575783,
            interestApy: -0.4983175769837881,
            feeApy: 0.07092732891072041,
            rewardsApy: 0.7129604618217867,
            netWithoutIlApy: 0.28557021374871916,
            netApy: 0.2811832998411434,
          },
        ],
        symbol: 'RAY/ETH',
        currentHistory: {
          positionId: 157,
          assets: [
            {
              balance: 11793.482745129118,
              price: 2.85,
            },
            {
              balance: 10.782735885776598,
              price: 3112.53,
            },
          ],
          borrows: [
            {
              balance: 11342.978364999999,
              price: 2.85,
            },
            {
              balance: 3.8148839999999997,
              price: 3112.53,
            },
          ],
          rewards: [
            {
              balance: 164.88500747204944,
              price: 2.85,
              symbol: 'RAY',
            },
            {
              balance: 0.15075372775948762,
              price: 3112.53,
              symbol: 'ETH',
            },
          ],
          dateKey: 20220414,
          timestamp: 1649915355,
          tokens: [
            {
              id: 14881,
              address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
              symbol: 'RAY',
              decimals: 6,
            },
            {
              id: 14882,
              address: '2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk',
              symbol: 'ETH',
              decimals: 6,
            },
          ],
          holdValue: 23638.2647115,
          IL_fee_interest: -666.6791980957712,
          IL: -103.6990322138372,
          interest: -656.409249899998,
          ILLoss: -0.001543760282302474,
          fee: 93.42908401806403,
          rewardValue: 939.1477715585789,
          netWithoutIL: 376.16760567664505,
          netValue: 272.46857346280785,
          tokenDetails: [
            {
              startAsset: {
                balance: 11131.917873,
                price: 3.18,
              },
              IL: -51.8495161069186,
              IL_fee_interest: 1283.9374833679906,
              interest: 601.5975965999983,
              holdValue: 0,
              feeInterest: -529.8849897050966,
              fee: -1131.4825863050949,
              currentValue: 33611.42582361799,
              tokenId: 14881,
              netValue: 365.6921853770703,
              rewardValue: 1260.4719752024612,
              ILLoss: -0.001543760282302474,
              netWithoutIL: 417.5417014839889,
            },
            {
              startAsset: {
                balance: 11.391797,
                price: 3105.19,
              },
              IL: -51.8495161069186,
              IL_fee_interest: -1950.6166814637618,
              interest: 54.811653299999705,
              holdValue: 23638.2647115,
              feeInterest: -33.09517617683741,
              fee: -87.90682947683712,
              currentValue: 33561.58892655624,
              tokenId: 14882,
              netValue: 408.7018556422559,
              rewardValue: 1408.7181948367852,
              ILLoss: -0.001543760282302474,
              netWithoutIL: 460.5513717491745,
            },
          ],
          ilApy: -0.004386913907575783,
          interestApy: -0.4983175769837881,
          feeApy: 0.07092732891072041,
          rewardsApy: 0.7129604618217867,
          netWithoutIlApy: 0.28557021374871916,
          netApy: 0.2811832998411434,
        },
      },
    ],
    principals: '7594550',
    tokenId: 14882,
    interest: -656.409249899998,
    interestBalance: -0.21089250542163385,
    fee: 93.42908401806403,
    feeBalance: 0.030017087070024717,
    IL: -103.6990322138372,
    ILBalance: -0.03331663701677966,
    rewardValue: 939.1477715585789,
    rewardBalance: 0.30173131554027716,
    netWithoutIL: 376.16760567664505,
    netWithoutILBalance: 0.12085589718866807,
    netValue: 272.46857346280785,
    netBalance: 0.08753926017188841,
    holdValue: 23638.2647115,
    startTime: '1648158000',
    currentTime: 1649915355,
    interestApy: -0.4983175769837881,
    ilApy: -0.004386913907575783,
    feeApy: 0.07092732891072041,
    rewardsApy: 0.7129604618217867,
    netWithoutIlApy: 0.28557021374871916,
    netApy: 0.2811832998411434,
    netValueYearly: 6646.685274098023,
    netBalanceYearly: 2.135460629808555,
    principalsCalculated: 7.59455,
    currentBalance: 7.682089260171888,
    ILLoss: -0.001543760282302474,
    priceChange: -0.10588707518102888,
    ILLoss50: -0.010675020099168783,
    ILBalance50: -0.08200645725594355,
    ILLoss100: -0.0407910315386674,
    ILBalance100: -0.3133603452945296,
    ILLoss50Neg: -0.07588566495354535,
    ILBalance50Neg: -0.5829604517406329,
    ILLoss75Neg: -0.22717316832101228,
    ILBalance75Neg: -1.745164556558069,
  },
]
