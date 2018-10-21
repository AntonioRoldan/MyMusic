import React, { Component } from 'react';
import './Advert.css';

import {Panel} from 'react-bootstrap';

class Advert extends Component {  
  render() {
    const advert = this.props.advert;

    return (
      <Panel className="Advert" key={advert._id}>
        <img src="https://via.placeholder.com/200x200" alt="item"/>
        <div className="details">
          <h2>{advert.title}</h2>
          <p>Location: {advert.location}</p>
          <p>{advert.description}</p>
        </div>
      </Panel>
    );
  }
}

export default Advert;
