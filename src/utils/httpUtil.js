// system
export const courseAgentLevelPath = (courseId, useType) =>
  `/config/course/agentLevel/price/list?courseId=${courseId}&useType=${useType}`

export const courseAgentLevelEditPath = `/config/course/agentLevel/price/edit`

export const payOrderPath = (orderId) =>
  `/client/agent/account/confirmPay?orderId=${orderId}`
