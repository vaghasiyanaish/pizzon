import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Components/Header/Header';
import Footer from './Components/Common/Footer';

import Home from './Components/Home/Home';
import ProductDetails from './Components/Product/ProductDetails';
import ProductList from './Components/Product/ProductList';
import ProductForm from './Components/Product/ProductForm';
import Cart from './Components/Cart/Cart';
import Wishlist from './Components/Wishlist/Wishlist';
import Profile from './Components/Profile/Profile';
import Orders from './Components/Orders/Orders';
import Checkout from './Components/Product/Checkout';
import CategoriesPage from './Components/CategoriesPage/CategoriesPage';

import Login from './Components/Auth/SignIn';
import Register from './Components/Auth/SignUp';

import './App.css';

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-product" element={<ProductForm />} />
          <Route path="/edit-product/:id" element={<ProductForm />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="/categories" element={<CategoriesPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
