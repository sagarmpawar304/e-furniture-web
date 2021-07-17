import axios from 'axios'
import {
  LOG_CREATE_REQUEST,
  LOG_CREATE_FAIL,
  LOG_CREATE_SUCCESS,
} from '../constants/logConstants'

export const createLog = (error) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOG_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token} `,
      },
    }

    await axios.post(
      'https://e-furniture-api.herokuapp.com/api/log',
      { error },
      config
    )

    dispatch({ type: LOG_CREATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: LOG_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}
