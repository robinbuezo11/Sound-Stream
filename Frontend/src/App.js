import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import User from './Pages/User/User';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = (status) => {
      setIsAuthenticated(status);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/User" element={isAuthenticated ? <User /> : <Login onLogin={handleLogin} />} />
        {/* <Route path="/User" element={<User />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
