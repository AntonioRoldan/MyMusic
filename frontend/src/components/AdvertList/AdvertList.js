import React, { Component } from 'react'
import './AdvertList.css'
import axios from 'axios'

import Advert from '../Advert/Advert'

class AdvertList extends Component {
  state = {
    adverts: [],
  }

  componentDidMount() {
    this.update()
  }
  componentWillReceiveProps() {
    this.update()
  }

  update() {
    setTimeout(() => {
      this.setState(
        {
          search: this.props.match.params.search,
        },
        this.getAdverts
      )
    }, 50)
  }

  getAdverts = () => {
    let url = 'http://localhost:4000/adverts'
    if (this.state.search) url += `/${this.state.search}`

    axios
      .get(url)
      .then(res => {
        this.setState({
          adverts: res.data,
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const adverts = this.state.adverts
    const search = this.state.search

    return (
      <div>
        {search ? (
          <h3>
            Searching for: <strong>{search}</strong>
          </h3>
        ) : (
          <h3>All items</h3>
        )}
        <div className="AdvertList">
          {adverts.map(a => (
            <Advert key={a._id} advert={a} />
          ))}
        </div>
      </div>
    )
  }
}

export default AdvertList
