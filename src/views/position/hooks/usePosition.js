import { useSelector } from 'react-redux'
import { mapPosition } from 'src/utils/apy'

export const usePosition = () => {
  const { protocolPositions } = useSelector((state) => state.app)
  if (!protocolPositions) {
    return {}
  }

  const protocolOpenedPositions = []
  const protocolClosedPositions = []

  protocolPositions.forEach((protocolPosition) => {
    const openedPositions = protocolPosition.positions
      .filter((position) => !position.closed)
      .map((position) => mapPosition(position))

    const closedPositions = protocolPosition.positions
      .filter((position) => position.closed)
      .map((position) => mapPosition(position))

    if (openedPositions.length) {
      protocolOpenedPositions.push({
        protocol: protocolPosition.protocol,
        positions: openedPositions,
      })
    }
    if (closedPositions.length) {
      protocolClosedPositions.push({
        protocol: protocolPosition.protocol,
        positions: closedPositions,
      })
    }
  })

  return {
    protocolOpenedPositions,
    protocolClosedPositions,
  }
}
