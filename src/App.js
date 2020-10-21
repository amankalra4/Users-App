import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import User from './Containers/AllUsers/User';
import UserData from './Containers/SingleUser/UserData';

function App() {
  return (
    <div className = 'App'>
      <h2>USERS</h2>
      <Route path = '/:userId' exact component = {UserData} />
      <Route path = '/' exact component = {User} />
    </div>
  );
}

export default App;
