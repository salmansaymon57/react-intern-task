import { useState } from 'react'

import './App.css'
import CreateStore from './StoreSetup'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './Products'
import ProductDetails from './ProductDetails';

function App() {
  

  return (

    <>
    <div>
      
      
      <Router>
        <Routes>
          <Route path="" element={<CreateStore />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        
        </Routes>
      </Router>

    </div>

    </>
    
  )
}

export default App
