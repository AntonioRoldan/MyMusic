import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, FormGroup, FormControl, Button } from 'react-bootstrap'
import UserBar from '../UserBar/UserBar'

import './NavBar.css'

class NavBar extends Component {
  state = {
    search: '',
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Link to="/">
            <Navbar.Brand>MyStuff</Navbar.Brand>
          </Link>
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="Search"
                name="search"
                onChange={this.handleChange}
              />
            </FormGroup>{' '}
            <Link to={`/search/${this.state.search}`}>
              <Button type="submit">Search</Button>
            </Link>
          </Navbar.Form>
          <Nav pullRight>
            <UserBar loggedIn={this.props.loggedIn} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavBar
