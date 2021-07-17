import axios from 'axios'

import {
  CART_ADD_WISHLIST_ITEM,
  CART_REMOVE_WISHLIST_ITEM,
  CART_WISHLIST_RESET,
} from '../constants/cartConstants'

export const addItemToWishList = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `https://e-furniture-api.herokuapp.com/api/products/${id}`
  )
  dispatch({
    type: CART_ADD_WISHLIST_ITEM,
    payload: {
      productId: id,
      name: data.name,
      images: data.images,
      price: data.totalPrice,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem(
    'wishList-E-furniture',
    JSON.stringify(getState().wishList.wishListItems)
  )
}

export const removeItemFromWishList = (id) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_WISHLIST_ITEM, payload: id })
  localStorage.setItem(
    'wishList-E-furniture',
    JSON.stringify(getState().wishList.wishListItems)
  )
}

export const resetWishList = () => async (dispatch, getState) => {
  dispatch({ type: CART_WISHLIST_RESET })
  localStorage.setItem(
    'wishList-E-furniture',
    JSON.stringify(getState().wishList.wishListItems)
  )
}
