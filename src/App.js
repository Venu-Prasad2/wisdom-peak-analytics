import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserDetails from './components/UserDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user/:id" element={<UserDetails />} /> {/* Route for UserDetails */}
    </Routes>
  );
};

export default App;
