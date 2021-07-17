import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
  CART_ADD_SHIPPING_ADDRESS,
  CART_ADD_PAYMENT_METHOD,
  CART_FAIL_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const addItemToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`https://e-furniture-api.herokuapp.com/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      productId: id,
      name: data.name,
      images: data.images,
      price: data.totalPrice,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem('cartItems-E-furniture', JSON.stringify(getState().cart.cartItems));
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
  localStorage.setItem('cartItems-E-furniture', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  try {
    dispatch({ type: CART_ADD_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem('shippingAddress-E-furniture', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CART_FAIL_SHIPPING_ADDRESS,
      payload: error.response && error.response.data.message ? error.response.data.message : error.response,
    });
  }
};

export const addPaymentMethod = (paymentMethod) => (dispatch, getState) => {
  dispatch({ type: CART_ADD_PAYMENT_METHOD, payload: paymentMethod });
  localStorage.setItem('paymentMethod-E-furniture', JSON.stringify(getState().cart.paymentMethod));
};

export const resetCart = () => async (dispatch, getState) => {
  dispatch({ type: CART_RESET });
  localStorage.setItem('cartItems-E-furniture', JSON.stringify(getState().cart.cartItems));
};
