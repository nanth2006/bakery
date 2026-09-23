import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './home.jsx';
import About from './about.jsx';
import Login from './login.jsx';
import Register from './register.jsx';
import Checkout from './checkout.jsx';
import OrderSuccess from './ordersuccess.jsx';
import Orders from './orders.jsx';
import AdminDashboard from './admindas.jsx';
import { CartProvider } from './context/cartcontext.jsx';

function Bakery() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sweets" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Checkout />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-sucess" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </CartProvider>
  );
}

export default Bakery;