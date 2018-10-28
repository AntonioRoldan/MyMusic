import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import UserBar from '../UserBar/UserBar'

import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Link to="/">
            <Navbar.Brand>Swapio</Navbar.Brand>
          </Link>
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" />
            </FormGroup>{' '}
            <Button type="submit">Submit</Button>
          </Navbar.Form>
          <Nav pullRight>
            <UserBar/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
