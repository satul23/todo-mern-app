import logo from './logo.svg';
import Headers from './components/partials/Headers.jsx';
import {BrowserRouter, Routes, Route, useSearchParams} from 'react-router-dom';
import Home from './components/Home.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import { useState } from 'react';

function App() {

  return (
    <>
       <BrowserRouter>
       {/* <Headers /> */}
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login />}/>
       </Routes>
       </BrowserRouter>
       </>
  );
}

export default App;
