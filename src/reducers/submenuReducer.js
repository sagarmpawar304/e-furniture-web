import { OPEN_SUBMENU, CLOSE_SUBMENU } from '../constants/SubMenuOpen'

export const submenuReducer = (
  state = { display: false, category: {} },
  action
) => {
  switch (action.type) {
    case OPEN_SUBMENU:
      return {
        display: true,
        category: action.payload.category,
        location: action.payload.location,
      }

    case CLOSE_SUBMENU:
      return { display: false, category: {}, location: {} }
    default:
      return state
  }
}
