import React, { Component } from 'react';
import './AdvertList.css';

import Advert from '../Advert/Advert'

class AdvertList extends Component {
  state = {
    adverts: []
  }

  constructor() {
    fetch('http://localhost:4000/adverts')
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          adverts: resJson
        });
      })
    
    super();
  }
  render() {
    const adverts = this.state.adverts;

    return (
      <div className="AdvertList">
        {adverts.map(a => <Advert advert={a} />)}
      </div>
    );
  }
}

export default AdvertList;
