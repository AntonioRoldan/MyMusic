import React, { Component } from 'react';
import './UserBar.css';

import { Link } from 'react-router-dom';
import { NavDropdown, NavItem, MenuItem, Glyphicon } from 'react-bootstrap';

import {getCookie} from '../../cookies'

class UserBar extends Component {
  state = { session: getCookie('session') }

  logout = () => {

  }

  render() {
    if (this.state.session) {
      return (
        <NavDropdown title={<Glyphicon glyph="user"/>}>
          <MenuItem onClick={}>Logout</MenuItem>
        </NavDropdown>
      );  
    } else {
      return (
        <NavItem eventKey={1}>
          <Link to="/login">Login</Link>
        </NavItem>
      )
    }
  }
}

export default UserBar;
