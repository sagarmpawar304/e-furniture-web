import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_REQUEST,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
} from '../constants/usersConstants'

export const userSignUpReducers = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true, ...state }
    case USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userLoginReducers = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, ...state }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT_REQUEST:
      return {}
    default:
      return state
  }
}

export const userUpdateReducers = (state = { userUpdatedInfo: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true, ...state }
    case USER_UPDATE_SUCCESS:
      return { loading: false, userUpdatedInfo: action.payload }
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const userDetailsReducers = (state = { userDetailInfo: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true, ...state }
    case USER_DETAILS_SUCCESS:
      return { loading: false, userDetailInfo: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return {}
    default:
      return state
  }
}
