import api from 'src/utils/api'

const getInvestorShare = (investorId, vaultId) => {
  return api.get(`/investors/${investorId}/shares?vaultId=${vaultId}`)
}

const investorService = {
  getInvestorShare,
}

export default investorService
