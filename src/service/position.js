import api from 'src/utils/api'

const getPositionHistories = (positionId) => {
  return api.get(`/positions/${positionId}/histories`)
}

const positionService = {
  getPositionHistories,
}

export default positionService
