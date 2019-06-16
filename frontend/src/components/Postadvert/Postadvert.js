import React, { Component } from 'react'
import './Postadvert.css'
import { FormGroup, FormControl, Button, Col, ControlLabel, Form } from 'react-bootstrap'
import axios from 'axios'

class Postadvert extends Component {
  state = {
    title: '',
    description: '',
    tradefor: [],
    category: '',
    postcode: '',
    condition: 0,
    imgurl: '',
  }

  postadvert = () => {
    const tradefor = this.state.tradefor.split(',').map(x => x.trim())

    const form = {
      email: this.props.email,
      title: this.state.title,
      description: this.state.description,
      tradefor: tradefor,
      category: this.state.category,
      postcode: this.state.postcode,
      condition: parseInt(this.state.condition),
      imgurl: this.state.imgurl,
    }

    axios
      .post('http://localhost:4000/postadvert', form)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalTitle">
          <ControlLabel>Title</ControlLabel>
          <FormControl
            type="text"
            placeholder="Give a title to your advert"
            name="title"
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="formHorizontalUrl">
          <ControlLabel>Image</ControlLabel>
          <FormControl
            type="text"
            placeholder="Give an image url"
            name="imgurl"
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="formControlsDescription">
          <ControlLabel>Description</ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="Write your description here"
            name="description"
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="formControlsCategory">
          <ControlLabel>Choose a category</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="Choose a category"
            name="category"
            onChange={this.handleChange}
          >
            <option value="KitchenItems">Kitchen items</option>
            <option value="GardenItems">Garden items</option>
            <option value="Beauty">Beauty</option>
            <option value="Technology">Technology</option>
            <option value="Furniture">Furniture</option>
            <option value="Clothing">Clothing</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Toys">Toys</option>
          </FormControl>
        </FormGroup>

        <FormGroup controlId="formControlsCondition">
          <ControlLabel>Item condition</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="Set item condition"
            name="condition"
            onChange={this.handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </FormControl>
        </FormGroup>

        <FormGroup controlId="formControlsTradefor">
          <ControlLabel>
            Items you would like to trade your item for separated by commas
          </ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="Write a list of objects you are willing to trade your item for"
            name="tradefor"
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="formHorizontalPostcode">
          <Col componentClass={ControlLabel} sm={2}>
            Postcode
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              placeholder="Type in your postcode"
              name="postcode"
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button onClick={this.postadvert}>Post advert</Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

export default Postadvert
