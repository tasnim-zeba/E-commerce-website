import './App.css';
import Header from './component/layout/Header/Header.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import React, {use, useEffect} from 'react';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import Search from './component/Product/Search.js';
import LoginSignUp from './component/User/LoginSignUp.js';
import store from './store';
import { loadUser } from './actions/userAction.js';
import UserOptions from './component/layout/Header/UserOptions.js';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile.js';
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import Cart from './component/Cart/Cart.js';
import Shipping from './component/Cart/Shipping.js';
import OrderConfirm from './component/Cart/OrderConfirm.js';
import OrderSuccess from './component/Cart/OrderSuccess.js';
import MyOrders from './component/Order/MyOrders.js';
import OrderDetails from './component/Order/OrderDetails.js';


function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);


  useEffect(() => {           // ✅ Now inside the component
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
  }, []);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails/>} />
        <Route exact path="/products" element={<Products/>} />
        <Route path="/products/:keyword" element={<Products/>} />
        <Route exact path="/Search" element={<Search/>} />
        <Route exact path="/login" element={<LoginSignUp/>} />
        <Route exact path="/Cart" element={<Cart/>} />
        <Route element={<ProtectedRoute />}>
            <Route exact path="/account" element={<Profile/>} />
            <Route exact path="/me/update" element={<UpdateProfile/>} />
            <Route exact path="/password/change" element={<UpdatePassword/>} />
            <Route exact path="/login/shipping" element={<Shipping/>} />
            <Route exact path="/order/confirm" element={<OrderConfirm/>} />
            <Route exact path="/success" element={<OrderSuccess/>} />
            <Route exact path="/orders/me" element={<MyOrders/>} />
            {/* <Route exact path="/orders" element={<AllOrders/>} /> */}
            <Route exact path="/order/:id" element={<OrderDetails/>} />
        </Route>
        <Route exact path="/password/forgot" element={<ForgotPassword/>} />
      </Routes>
      
      <Footer/>
    </Router>
  );
}

export default App;