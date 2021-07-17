import {
  CART_ADD_WISHLIST_ITEM,
  CART_REMOVE_WISHLIST_ITEM,
  CART_WISHLIST_RESET,
} from '../constants/cartConstants'

export const wishListReducers = (state = { wishListItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_WISHLIST_ITEM:
      const item = action.payload
      // check item already exist in cart
      const existedItem = state.wishListItems.find(
        (product) => product.productId === item.productId
      )

      if (existedItem) {
        return {
          ...state,
          wishListItems: state.wishListItems.map((x) =>
            x.productId === item.productId ? item : x
          ),
        }
      } else {
        return {
          ...state,
          wishListItems: [...state.wishListItems, item],
        }
      }

    case CART_REMOVE_WISHLIST_ITEM:
      return {
        ...state,
        wishListItems: state.wishListItems.filter(
          (x) => x.productId !== action.payload
        ),
      }

    case CART_WISHLIST_RESET:
      return {
        ...state,
        wishListItems: [],
      }
    default:
      return state
  }
}
