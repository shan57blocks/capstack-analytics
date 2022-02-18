import { handleActions } from 'redux-actions'

import {
  APP_SHOW_LOADING,
  APP_CLOSE_LOADING,
  APP_OAUTH_USER,
  GET_AGENT_LEVELS,
  GET_ALL_COURSES,
} from 'src/actions/app'

const initState = {
  loading: false,
  user: null,
  agentLevels: [],
  allCourses: [],
}

const app = handleActions(
  {
    [APP_SHOW_LOADING]: (state) => {
      return {
        ...state,
        loading: true,
      }
    },
    [APP_CLOSE_LOADING]: (state) => {
      return {
        ...state,
        loading: false,
      }
    },
    [APP_OAUTH_USER]: (state, { payload }) => {
      return {
        ...state,
        user: payload,
      }
    },
    [GET_AGENT_LEVELS]: (state, { payload }) => {
      return {
        ...state,
        agentLevels: payload,
      }
    },
    [GET_ALL_COURSES]: (state, { payload }) => {
      return {
        ...state,
        allCourses: payload.data,
      }
    },
  },
  initState
)

export default app
