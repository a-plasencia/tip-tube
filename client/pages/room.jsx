import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Ratio from 'react-bootstrap/Ratio';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      roomId: null,
      userId: null,
      youtubeVideo: '',
      roomName: '',
      modal: true,
      content: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.messageSend = this.messageSend.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleMessageInput = this.handleMessageInput.bind(this);
  }

  componentDidMount() {
    fetch(`/api/room/${this.props.roomId}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          youtubeVideo: result.youtubeVideo,
          roomName: result.roomName
        });
      });
  }

  handleUsernameInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
    this.props.handleUsernameInput(event.target.value);
  }

  handleMessageInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  messageSend(event) {
    // eslint-disable-next-line no-console
    console.log(this.state);
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

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/user/username', req)
      .then(res => res.json())
      .then(result => {
        this.setState({
          username: result.username,
          userId: result.userId,
          modal: false,
          roomId: this.props.roomId
        });
      });
  }

  render() {
    return (
      <>
        <Modal show={this.state.modal}>
          <Form onSubmit={this.handleSubmit}>
          <Modal.Header>
            <Modal.Title>Create a username</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Control
              onChange={this.handleUsernameInput}
              value={this.state.username}
              autoFocus
              required
              id="username"
              name="username"
              type="text"
              />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Confirm
            </Button>
          </Modal.Footer>
          </Form>
        </Modal>
        <Container>
          <Row className="justify-content-space-between mt-5">
            <Col xs={10} lg={10}>
              <h1>{this.state.roomName}</h1>
            </Col>
            <Col xs={2} lg={2}>
            </Col>
          </Row>
          <Row className="mt-5 align-content-stretch">
            <Col className="mb-sm-5 mb-lg-0" xs={12} lg={7}>
              <Ratio aspectRatio="16x9">
                <iframe src={this.state.youtubeVideo}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write;
                encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
              </Ratio>
            </Col>
            <Col xs={12} lg={5}>
              <Card style={{ height: '100%' }} bg="light">
                <Card.Body>
                  <Card.Text>
                    Hello
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Form onSubmit={this.messageSend}>
                    <Row className="justify-content-center">
                      <Col xs={10} lg={9}>
                        <Form.Control
                        placeholder="Message"
                        name="content"
                        autoFocus
                        onChange={this.handleMessageInput}
                        value={this.state.content}
                        ></Form.Control>
                      </Col>
                      <Col xs={2} lg={3}>
                        <Button type="submit" variant="primary">Send</Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
