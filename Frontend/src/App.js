import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import IndexPage from './components/IndexPage';
import RegisterPage from './components/RegisterPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={IndexPage} />
        <Route path='/register' exact component={RegisterPage} />
        <Route path='/home' exact component={HomePage} />
        <Route path='/profile' component={ProfilePage} />
      </Switch>
    </Router>
  );
}
