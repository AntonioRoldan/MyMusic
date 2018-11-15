import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css'
import NavBar from './components/NavBar/NavBar'
import AdvertList from './components/AdvertList/AdvertList'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Postadvert from './components/Postadvert/Postadvert'
import AdvertPage from './components/AdvertPage/AdvertPage'
import PosterProfile from './components/PosterProfile/PosterProfile'
import UserProfile from './components/UserProfile/UserProfile'
import ContactPoster from './components/ContactPoster/ContactPoster'

import cookies from './cookies'
import axios from 'axios'

class App extends Component {
  state = {
  	loggedIn: false,
  	email: '',
  	session: ''
  }

  componentDidMount = () => {
  	this.getLoginInfo()
  }

  update = (loggedIn) => {
  	this.setState({loggedIn: loggedIn
  	})
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
  				email: res.data
  			})
  		})
  	})
  }

  render() {
  	return (
  		<Router>
  			<div className='App'>
  				<NavBar loggedIn={this.state.loggedIn}/>
  				<div className='container'>
  					<Route path='/' exact component={AdvertList} />
  					<Route path='/login' component={() => <Login update={this.update} />} />
  					<Route path='/register' component={() => <Signup update={this.update}/>} />
  					<Route path='/postadvert' exact component={() => <Postadvert email={this.state.email}/>} />
  					<Route path='/advert/:id' exact component={AdvertPage} />
  					<Route path='/users/:id' exact component={PosterProfile}/>
  					<Route path='/myprofile/:id' exact component={UserProfile}/>
  					<Route path='/contact/:id' exact component={ContactPoster}/>
  				</div>
  			</div>
  		</Router>
  	)
  }
}

export default App
