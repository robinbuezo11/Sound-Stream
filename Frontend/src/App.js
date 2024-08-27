import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import User from './Pages/User/User';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      const storedUserName = localStorage.getItem('userName');
      setIsAuthenticated(authStatus);
      setUserName(storedUserName || '');
  }, []);

  const handleLogin = (status, name = '') => {
      setIsAuthenticated(status);
      setUserName(name);
      localStorage.setItem('isAuthenticated', status);
      localStorage.setItem('userName', name);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/User" element={isAuthenticated ? <User userName={userName} /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
