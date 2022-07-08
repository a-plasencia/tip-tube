import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Chat from '../components/chat';
import { io } from 'socket.io-client';
import ReactPlayer from 'react-player';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

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
      content: '',
      messages: [],
      state: {},
      getLoading: false,
      loading: false,
      confirm: true,
      error: false,
      video: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.messageSend = this.messageSend.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleTimeStamp = this.handleTimeStamp.bind(this);
    this.ref = this.ref.bind(this);
  }

  componentDidMount() {

    this.socket = io('/room', {
      query: {
        roomId: this.props.roomId
      }
    });

    this.socket.on('chatMessage', data => {
      this.setState({
        messages: this.state.messages.concat(data)
      });
    });

    fetch(`/api/room/${this.props.roomId}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          youtubeVideo: result.youtubeVideo,
          roomName: result.roomName,
          messages: result.messages,
          getLoading: true
        });
        if (ReactPlayer.canPlay(this.state.youtubeVideo) !== true) {
          this.setState({
            video: false
          });
        }
      })
      .catch(err => {
        this.setState({
          error: true
        });
        console.error('Fetch failed', err);
      });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  handleUsernameInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
    this.props.handleUsernameInput(event.target.value);
  }

  handleMessageInput(event) {
  }

  messageSend(event) {
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      loading: true,
      confirm: false
    });
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
      })
      .catch(err => {
        this.setState({
          error: true
        });
        console.error('Fetch failed', err);
      });
  }

  handleProgress(state) {
    if (!this.state.seeking) {
      this.setState({ state });
    }
  }

  ref(player) {
    this.player = player;
  }

  handleTimeStamp(timeStamp) {
    this.player.seekTo(timeStamp, 'seconds');
  }

  render() {
    const roomId = this.props.roomId;
    const userId = this.state.userId;
    const messages = this.state.messages;
    const state = this.state.state;
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
              {this.state.confirm ? 'Confirm' : ''}
              <Spinner
              className={this.state.loading ? '' : 'd-none'}
              as="span"
              animation="border"
              role="status"
              size="sm"
              aria-hidden="true"
              />
            </Button>
            <Alert variant="primary" className={this.state.error ? '' : 'd-none'}>
              Sorry there was an error connecting to the network! Please check your internet connection and try again.
            </Alert>
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
              <div className='player-wrapper'>
                <ReactPlayer
                ref={this.ref}
                className="react-player"
                url={this.state.youtubeVideo}
                controls={true}
                width='100%'
                height='100%'
                onProgress={this.handleProgress}
                onSeek={this.handleTimeStamp}
                />
                <Spinner
                style={{ width: '4rem', height: '4rem' }}
                className={this.state.getLoading ? 'd-none' : ''}
                as="span"
                animation="border"
                role="status"
                aria-hidden="true"
                />
              </div>
              <Alert variant ="primary" className={this.state.video ? 'd-none' : ''}>
                Sorry the video linked is not a valid youtube video.  Please try again
              </Alert>
            </Col>
            <Col s={12} lg={5}>
              <Chat handleTimeStamp={this.handleTimeStamp} state={state} messages={messages} userId={userId} roomId={roomId} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
