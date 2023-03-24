import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Panel from './Components/Panel/Panel';
import Test from './Test/Test';

function App() {
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <div className="page">
        <Routes>
          <Route path='/*' element={<Panel/>} />
          <Route path='/test/*' element={<Test/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
