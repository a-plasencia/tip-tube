import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      userId: null,
      roomId: null
    };
    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.messageSend = this.messageSend.bind(this);
  }

  handleMessageInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      userId: this.props.userId,
      roomId: this.props.roomId
    });
  }

  messageSend(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/message', req)
      .then(res => res.json())
      .then(result => {
        // eslint-disable-next-line no-console
        console.log(result);
        this.setState({
          content: ''
        });
      });
  }

  render() {
    return (
      <Card className="mb-5" style={{ height: '420px' }} bg="light">
        <Card.Body>
          <Card.Text>
            Hello
          </Card.Text>
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
