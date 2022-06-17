import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ChatContent from './chatContent';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.messageSend = this.messageSend.bind(this);
    this.onStamp = this.onStamp.bind(this);
  }

  handleMessageInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  messageSend(event) {
    event.preventDefault();
    const messageObj = {
      content: this.state.content,
      userId: this.props.userId,
      roomId: this.props.roomId
    };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageObj)
    };
    fetch('/api/message', req)
      .then(res => res.json())
      .then(result => {

        this.setState({
          content: ''
        });
      });
  }

  onStamp() {
    const totalSeconds = this.props.state.playedSeconds;
    const dateTime = new Date(null);
    dateTime.setSeconds(totalSeconds);
    const formattedTime = dateTime.toISOString().substr(11, 8);
    this.setState({
      content: formattedTime + ' ' + this.state.content
    });
  }

  render() {
    const messages = this.props.messages;
    return (
      <Card className="mb-5" style={{ height: '420px' }} bg="light">
        <Card.Header>
          <Button onClick={this.onStamp} variant="danger">Stamp</Button>
        </Card.Header>
        <Card.Body className="d-flex flex-column-reverse overflow-auto">
          <ChatContent messages={messages} />
        </Card.Body>
        <Card.Footer>
          <Form onSubmit={this.messageSend}>
            <Row className="justify-content-between">
              <Col xs={9}>
                <Form.Control
                  placeholder="Message"
                  name="content"
                  autoFocus
                  onChange={this.handleMessageInput}
                  value={this.state.content}
                ></Form.Control>
              </Col>
              <Col>
                <Button type="submit" variant="primary">Send</Button>
              </Col>
            </Row>
          </Form>
        </Card.Footer>
      </Card>
    );
  }
}
