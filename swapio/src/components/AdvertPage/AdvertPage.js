import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import './AdvertPage.css'
import cookies from '../../cookies'
class AdvertPage extends Component {
  state = {
    posterUsername: "",
    session: "",
    userEmail: "",
    advertId: "",
    advert: null,
    error: false,
    posterId: ""
  }

  getLoginInfo = () => {
    this.setState({
      session: cookies.getCookie('session')
    }, () => {
      axios.get('http://localhost:4000/who-am-i', {
        headers: {
          Authorization: this.state.session
        }
      }).then(res => {
        this.setState({
          userEmail: res.data
        })
      })
    })
  }

  updateViews = () => {
    axios.post('http://localhost:4000/updateViews', {
        advertId: this.state.advertId
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(() => {
        this.setState({error:true})
      })
  }

  getPosterId = (posterEmail) => {
    axios.get(`http://localhost:4000/poster-id/${posterEmail}`)
    .then(res => {
      this.setState({posterId: res.data})
    })
    .catch(() => {
      this.setState({error: true})
    })
  }

  getPosterUsername = (posterEmail) => {
    axios.get(`http://localhost:4000/poster-username/${posterEmail}`)
    .then(res => {
      this.setState({posterUsername: res.data})
    })
    .catch(() => {
      this.setState({error: true})
    })
  }

  componentDidMount() {
    this.setState({
      advertId: this.props.match.params.id
    }, () => {
      this.updateViews()
      axios.get(`http://localhost:4000/getAdvert/${this.state.advertId}`)
        .then(res => {
          this.setState({
            advert: res.data
          }, () => {
            this.getPosterUsername(this.state.advert.userEmail)
            this.getPosterId(this.state.advert.userEmail)
          })
        })
        .catch(() => {
          this.setState({error: true})
        })
    })
    this.getLoginInfo()
  }

  renderAdvert= (postedByUser, advert, tradefor) => { 
    if(postedByUser){
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
          <Button type="submit" id="favourite">Delete advert</Button>
        </div>
      );
    }
    return (
      <div>
        <img src={advert.imgurl || "https://via.placeholder.com/200x200"} alt="item" class="advertimg"/>
        <div className="details">
          <h2>{advert.title}</h2>
          <p>Posted by: <Link to={`/users/${this.state.posterId}`}>{this.state.posterUsername}</Link></p>
          <p>Location: {advert.postcode}</p>
          <p>{advert.description}</p>
          <p>Category: {advert.category}</p>
          <p>Item condition: {advert.condition}</p>
          <p>Would trade for: {tradefor}</p>
          <p>Views: {advert.views}</p>
        </div>
        <Button type="submit" id="contact"><Link to={`/users/${this.state.posterId}`}>See poster's profile</Link></Button>
        <Button type="submit" id="favourite">Add this advert to my favourites</Button>
      </div>
    );
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
      if(advert.userEmail == this.state.userEmail){
       return (this.renderAdvert(true, advert, tradefor))
      } else {
        return (this.renderAdvert(false, advert, tradefor))
      }    
    } else {
      return <p>loading...</p>
    }
  }
}

export default AdvertPage;
