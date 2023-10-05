import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard'; // Import your Dashboard component
import Login from './Login'; // Import your Login component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            {/* Redirect user to login or dashboard depending on authentication status */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
