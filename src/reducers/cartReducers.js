import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
  CART_ADD_SHIPPING_ADDRESS,
  CART_ADD_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const cartReducers = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      // check item already exist in cart
      const existedItem = state.cartItems.find(
        (product) => product.productId === item.productId
      )

      if (existedItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.productId === item.productId ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.productId !== action.payload
        ),
      }

    case CART_ADD_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }

    case CART_ADD_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }

    case CART_RESET:
      return {
        ...state,
        cartItems: [],
      }
    default:
      return state
  }
}
