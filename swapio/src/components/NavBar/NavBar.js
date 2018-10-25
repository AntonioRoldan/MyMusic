import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap';

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
        <Nav>
          <NavItem eventKey={1}><Link to="/login">Login</Link></NavItem>
        </Nav>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" />
            </FormGroup>{' '}
            <Button type="submit">Submit</Button>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
