import React, { Component } from 'react'
import axios from 'axios'
import cookies from '../../cookies'
import {
  ListGroup,
  ListGroupItem,
  FormGroup,
  Form,
  Col,
  ControlLabel,
  FormControl,
  Button,
  Glyphicon,
} from 'react-bootstrap'

import './ContactPoster.css'

class ContactPoster extends Component {
  state = {
    otherUserId: '',
    session: cookies.getCookie('session'),
    messages: [],
    message: '',
  }

  componentDidMount() {
    this.setState({ otherUserId: this.props.match.params.id }, () => {
      this.getMessages()
      setInterval(() => this.getMessages(), 5000)
    })
  }

  sortMessages = messages => {
    const processMessage = (message, type) => {
      message.date = new Date(message.date)
      message.type = type
      return message
    }

    messages.sent = messages.sent.map(m => processMessage(m, 'sent'))
    messages.recieved = messages.recieved.map(m => processMessage(m, 'recieved'))

    const unsorted = messages.sent.concat(messages.recieved)
    const sorted = unsorted.sort((a, b) => a.date - b.date)

    this.setState({ messages: sorted })
  }

  getMessages() {
    axios
      .get(`http://localhost:4000/chats/${this.state.otherUserId}`, {
        headers: { Authorization: this.state.session },
      })
      .then(res => {
        this.sortMessages(res.data)
      })
      .catch(err => {
        console.error('err :', err)
      })
  }

  sendMessage = () => {
    axios
      .post(
        'http://localhost:4000/chats/send',
        {
          to: this.state.otherUserId,
          message: this.state.message,
        },
        {
          headers: {
            Authorization: this.state.session,
          },
        }
      )
      .then(res => {
        this.sortMessages(res.data)
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.state.messages.map(m => (
            <ListGroupItem key={m._id} className={m.type}>
              <p className="message">{m.message}</p>
              <p className="date">{m.date.toUTCString()}</p>
            </ListGroupItem>
          ))}
        </ListGroup>

        <Form horizontal>
          <FormGroup controlId="messageForm">
            <Col componentClass={ControlLabel} sm={2}>
              Send message
            </Col>
            <Col sm={8}>
              <FormControl
                type="text"
                placeholder="text"
                name="message"
                onChange={this.handleChange}
              />
            </Col>
            <Col sm={2}>
              <Button onClick={this.sendMessage}>
                Send <Glyphicon glyph="send" />
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default ContactPoster
