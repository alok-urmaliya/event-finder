import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Favorites from './pages/Favorites';
import Search from './pages/Search';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Search/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; 
