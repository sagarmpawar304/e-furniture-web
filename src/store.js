import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// reducers
import {
  productDetailsReducer,
  productListReducer,
  productFeaturedReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productCreateReviewReducer,
  productTopRatedReducer,
} from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'
import { wishListReducers } from './reducers/wishListReducers'
import { submenuReducer } from './reducers/submenuReducer'
import {
  userLoginReducers,
  userSignUpReducers,
  userUpdateReducers,
  userDetailsReducers,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderMyListReducer,
  orderListReducer,
  orderDeliverReducer,
  orderDeleteReducer,
} from './reducers/orderReducer'

import { logCreateReducer } from './reducers/logReducers'

const reducer = combineReducers({
  isSubmenuOpen: submenuReducer,
  cart: cartReducers,
  wishList: wishListReducers,
  productList: productListReducer,
  productsFeatured: productFeaturedReducer,
  product: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productCreateReview: productCreateReviewReducer,
  productTopRated: productTopRatedReducer,
  userLogin: userLoginReducers,
  userSignUp: userSignUpReducers,
  userDetails: userDetailsReducers,
  userUpdate: userUpdateReducers,
  orderCreate: orderCreateReducer,
  orderDelete: orderDeleteReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderMyList: orderMyListReducer,
  ordersList: orderListReducer,
  logCreate: logCreateReducer,
})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems-E-furniture')
  ? JSON.parse(localStorage.getItem('cartItems-E-furniture'))
  : []

const wishListFromLocalStorage = localStorage.getItem('wishList-E-furniture')
  ? JSON.parse(localStorage.getItem('wishList-E-furniture'))
  : []

const userInfoLocalStorage = localStorage.getItem('userInfo-E-furniture')
  ? JSON.parse(localStorage.getItem('userInfo-E-furniture'))
  : {}

const shippingAddressFromLocalStorage = localStorage.getItem(
  'shippingAddress-E-furniture'
)
  ? JSON.parse(localStorage.getItem('shippingAddress-E-furniture'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
  },
  isSubmenuOpen: {
    display: false,
  },
  productList: {
    products: [],
  },
  wishList: {
    wishListItems: wishListFromLocalStorage,
  },
  userLogin: {
    userInfo: userInfoLocalStorage,
  },
}

const middleWares = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWares))
)

export default store
