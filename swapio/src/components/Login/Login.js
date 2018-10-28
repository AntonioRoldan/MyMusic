import React, { Component } from 'react';
import './Login.css';
import { FormGroup, FormControl, Button, Col, ControlLabel, Form } from 'react-bootstrap';
import axios from 'axios'
import { setCookie } from '../../cookies'

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  state = {
    email: '',
    password: ''
  };

  login() {
    axios.post('http://localhost:4000/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then(res => {
        console.log(res)
        setCookie('session', res.data)
        // set session cookie
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl
              type="email"
              placeholder="Email"
              name="email"
              onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button onClick={this.login}>Sign in</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default Login;
