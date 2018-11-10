import React, { Component } from 'react';

import axios from 'axios'

import './AdvertPage.css'

class AdvertPage extends Component {
  state = {
    id: "",
    advert: null,
    error: false
  }

  updateViews = () => {
    axios.post('http://localhost:4000/updateViews', {
        advertId: this.state.id
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(() => {
        this.setState({error:true})
      })
  }

  componentDidMount() {
    this.setState({
      id: this.props.match.params.id
    }, () => {
      this.updateViews()
      axios.get(`http://localhost:4000/getAdvert/${this.state.id}`)
        .then(res => {
          this.setState({
            advert: res.data
          })
        })
        .catch(() => {
          this.setState({error: true})
        })
    })
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h2>Error!</h2>
          <p>I'm afraid this advert has been misplaced</p>
        </div>
      )
    }

    const advert = this.state.advert

    if (this.state.advert) {
      const tradefor = advert.tradefor.join(', ')
      return (
        <div>
          <img src={advert.imgurl || "https://via.placeholder.com/200x200"} alt="item" class="advertimg"/>
          <div className="details">
            <h2>{advert.title}</h2>
            <p>Location: {advert.postcode}</p>
            <p>{advert.description}</p>
            <p>Category: {advert.category}</p>
            <p>Item condition: {advert.condition}</p>
            <p>Would trade for: {tradefor}</p>
            <p>Views: {advert.views}</p>
          </div>
        </div>
      );
    } else {
      return <p>loading...</p>
    }
  }
}

export default AdvertPage;
