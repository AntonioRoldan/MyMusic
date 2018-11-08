import React, { Component } from 'react';
import './Signup.css';
import axios from 'axios'
import { setCookie } from '../../cookies'
import { FormGroup, FormControl, Button, Col, ControlLabel, Form } from 'react-bootstrap';


class Signup extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    signup = () => {
        axios.post('http://localhost:4000/register', {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirmpassword: this.state.confirmpassword
        }).then(res => {
            this.login()
        }).catch(err => {
            console.log(err)
        })
    }

    login = () => {
        axios.post('http://localhost:4000/login', {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            setCookie('session', res.data)
            this.props.update(true, this.state.email)
        }).catch(err => {
            console.error(err)
        })
    }
    render() {
        return (
            <Form horizontal>
                <FormGroup controlId="formHorizontalUsername">
                    <Col componentClass={ControlLabel} sm={2}>
                        Username
                </Col>
                    <Col sm={10}>
                        <FormControl type="text"
                         placeholder="Username"
                         name="username"
                         onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                </Col>
                    <Col sm={10}>
                        <FormControl type="email"
                            placeholder="Email"
                            name="email"
                            onChange={this.handleChange}
                        />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                </Col>
                    <Col sm={10}>
                        <FormControl type="password"
                            placeholder="Password"
                            name="password"
                            onChange={this.handleChange} />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalConfirmPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        Confirm password
                </Col>
                    <Col sm={10}>
                        <FormControl type="password"
                            placeholder="Password"
                            name="confirmpassword"
                            onChange={this.handleChange} />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button onClick={this.signup}>Sign up</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

export default Signup