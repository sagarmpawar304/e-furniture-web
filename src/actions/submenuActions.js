import { OPEN_SUBMENU, CLOSE_SUBMENU } from '../constants/SubMenuOpen'

export const openSubmenu = (category, location) => (dispatch) => {
  dispatch({ type: OPEN_SUBMENU, payload: { category, location } })
}

export const CloseSubmenu = () => (dispatch) => {
  dispatch({ type: CLOSE_SUBMENU })
}
