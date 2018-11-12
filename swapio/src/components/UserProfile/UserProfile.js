import React, { Component } from 'react';
import './UserProfile.css'

class UserProfile extends Component {
  render() {
    return (
        <div>
            <p>{this.props.match.params.id}</p>
        </div>
    )
  }
}

export default UserProfile;
