import {
  LOG_CREATE_REQUEST,
  LOG_CREATE_FAIL,
  LOG_CREATE_SUCCESS,
} from '../constants/logConstants'

export const logCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LOG_CREATE_REQUEST:
      return { loading: true }

    case LOG_CREATE_SUCCESS:
      return { loading: true, success: true }

    case LOG_CREATE_FAIL:
      return { loading: true, error: action.payload }
    default:
      return state
  }
}
