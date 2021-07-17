import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductDetails from './screens/products/productDetails'
import Products from './screens/products/products'
import Footer from './components/Footer'
import Cart from './screens/cart/CartScreen'
import WishList from './screens/wishlist/WishList'
import Register from './screens/user/UserRegister'
import User from './screens/user/User'
import Login from './screens/user/UserLogin'
import Shipping from './screens/orders/ShippingAddress'
import PaymentMethod from './screens/orders/PaymentScreen'
import PlaceOrder from './screens/orders/PlaceOrder'
import Order from './screens/orders/OrderScreen'
import Myorders from './screens/user/MyOrdersScreen'
import LoginSecurity from './screens/user/LoginAndSecurity'
import UserInfoEdit from './screens/user/UserInfoEditScreen'
import UserShipping from './screens/user/UserShippingAddress'
import EditShipping from './screens/user/EditShippingAddress'
import NewShipping from './screens/user/NewShippingAddress'
import Admin from './screens/admin/AdminScreen'
import Search from './screens/search/searchScreen'



function App() {
  return (
    <Router>
      <Switch>
        <Route path='/search/:keyword' component={Search} />
        <Route path='/admin' component={Admin} />
        <Route path='/orders/:id' component={Order} />
        <Route path='/placeorder' component={PlaceOrder} />
        <Route path='/payment' component={PaymentMethod} />
        <Route path='/shipping' component={Shipping} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/users/addnewAddress' component={NewShipping} />
        <Route path='/users/shippingAddress' component={EditShipping} />
        <Route path='/users/shipping' component={UserShipping} />
        <Route path='/users/orders' component={Myorders} />
        <Route path='/users/editInfo' component={UserInfoEdit} />
        <Route path='/users/loginandsecurity' component={LoginSecurity} />
        <Route exact path='/users' component={User} />
        <Route path='/wishlist' component={WishList} />
        <Route path='/cart/:id?' component={Cart} />
     
        <Route path='/products/:id' component={ProductDetails} />
      
        <Route path='/products' component={Products} />
        <Route exact path='/' component={HomeScreen} />
        <Route path='*' component={HomeScreen} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App
