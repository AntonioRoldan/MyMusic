import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar/NavBar'
import AdvertList from './components/AdvertList/AdvertList';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="container">
            <Route path="/" exact component={AdvertList} />
            <Route path="/login" component={Login} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
