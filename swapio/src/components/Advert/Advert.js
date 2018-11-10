import React, { Component } from 'react';
import './Advert.css';

import { Link } from 'react-router-dom';
import {Panel} from 'react-bootstrap';

class Advert extends Component {  
  render() {
    const advert = this.props.advert;

    return (
      <Link to={`/advert/${advert._id}`}>
        <Panel className="Advert" key={advert._id}>
          <img src={advert.imgurl || "https://via.placeholder.com/200x200"} alt="item"/>
          <div className="details">
            <h2>{advert.title}</h2>
            <p>Location: {advert.postcode}</p>
            <p>{advert.description}</p>
          </div>
        </Panel>
      </Link>
    );
  }
}

export default Advert;
