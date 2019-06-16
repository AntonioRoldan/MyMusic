import React, { Component } from 'react'
import './PosterProfile.css'

class PosterProfile extends Component {
  render() {
    return (
      <div>
        <p>{this.props.match.params.id}</p>
      </div>
    )
  }
}

export default PosterProfile
