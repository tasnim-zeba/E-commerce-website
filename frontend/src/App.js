import './App.css';
import Header from './component/layout/Header/Header.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import React, {useEffect} from 'react';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js';
import Loader from './component/layout/Loader/Loader.js';

function App() {
  useEffect(() => {           // ✅ Now inside the component
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
  }, []);

  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Loader />

      <Footer/>
    </Router>
  );
}

export default App;