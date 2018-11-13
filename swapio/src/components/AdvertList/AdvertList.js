import React, { Component } from 'react';
import './AdvertList.css';
import axios from 'axios'

import Advert from '../Advert/Advert'

class AdvertList extends Component {
  state = {
    adverts: []
  }

  constructor() {
    axios.get('http://localhost:4000/adverts')
      .then(res => {
        this.setState({
          adverts: res.data
        });
      })
      .catch(error => {
        console.log(error)
      })
    
    super()
  }
  render() {
    const adverts = this.state.adverts;

    return (
      <div className='AdvertList'>
        {adverts.map(a => <Advert key={a._id} advert={a} />)}
      </div>
    )
  }
}

export default AdvertList;
