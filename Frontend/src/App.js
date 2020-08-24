import React from 'react';
import './App.css';
import Home from "./components/Home";
import ProfilePage from "./components/ProfilePage";
import Header from "./components/Header";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/profile" component={ProfilePage}/>
      </Switch>
    </Router>
  );
}
