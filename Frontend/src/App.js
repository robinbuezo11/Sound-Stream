import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import User from './Components/User/User';

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
