import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar'
import AdvertList from './components/AdvertList/AdvertList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="container">
          <AdvertList />
        </div>
      </div>
    );
  }
}

export default App;
