import { createAction } from 'redux-actions'
import api from 'src/utils/api'

export const APP_SHOW_LOADING = 'APP_SHOW_LOADING'
export const APP_CLOSE_LOADING = 'APP_CLOSE_LOADING'

export const APP_OAUTH_USER = 'APP_OAUTH_USER'

export const GET_AGENT_LEVELS = 'GET_AGENT_LEVELS'
export const GET_ALL_COURSES = 'GET_ALL_COURSES'

// 显示/隐藏顶层loading bar
export const showLoadingBar = createAction(APP_SHOW_LOADING)

export const closeLoadingBar = createAction(APP_CLOSE_LOADING)

export const getUserInfo = createAction(APP_OAUTH_USER, () =>
  api.get(`/user/userInfo`)
)

export const getAgentLevels = createAction(GET_AGENT_LEVELS, () =>
  api.get(`/config/agent/level/list`)
)

export const getAllCourses = createAction(GET_ALL_COURSES, () =>
  api.get(`/config/course/page?page=1&rows=10000`)
)
