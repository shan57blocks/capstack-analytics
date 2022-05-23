import api from 'src/utils/api'

const getPositionHistories = (positionId) => {
  return api.get(`/positions/${positionId}/histories`)
}

const getPosition = (id) => {
  return api.get(`/positions/${id}`)
}

const positionService = {
  getPositionHistories,
  getPosition,
}

export default positionService
