import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard'; // Import your Dashboard component
import Login from './components/Login'; // Import your Login component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<></>} />
          {/* Redirect user to login or dashboard depending on authentication status */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
