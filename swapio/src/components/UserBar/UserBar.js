import React, { Component } from 'react'
import './UserBar.css'

import { Link } from 'react-router-dom'
import { NavDropdown, NavItem, MenuItem, Glyphicon } from 'react-bootstrap'

import {getCookie} from '../../cookies'

import axios from 'axios'

class UserBar extends Component {
  state = { session: getCookie('session') }

  componentWillReceiveProps = () => this.checkSession() //This method is called whenever the props have been updated

  deleteSessionData = () => {
  	document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  	this.setState({session: null})
  }

  checkSession = () => {
  	const session = getCookie('session')
  	this.setState({session: session})

  	axios.post('http://localhost:4000/check-session', {
  		session: session
  	}).then(res => {
  		if (!res.data) {
  			this.deleteSessionData()
  		}
  	})
  }

  logout = () => {
  	axios.post('http://localhost:4000/logout', {
  		session: this.state.session
  	}).then(res => {
  		console.log(res.data)
  		this.deleteSessionData()
  	})
  }

  render() {
  	if (this.state.session) {
  		return (
  			<NavDropdown id='1' title={<Glyphicon glyph='user'/>}>
  				<MenuItem onClick={this.logout}>Logout</MenuItem>
  				<MenuItem>
  					<Link to='/postadvert'>Post advert</Link>
  				</MenuItem>
  			</NavDropdown>
  		)
  	} else {
  		return (
  			<NavItem eventKey={1}>
  				<Link to='/login'>Login</Link>{'     '}
  				<Link to='/register'>Register</Link>
  			</NavItem>
  		)
  	}
  }
}

export default UserBar
