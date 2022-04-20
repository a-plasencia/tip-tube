import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Ratio from 'react-bootstrap/Ratio';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      roomId: null,
      youtubeVideo: '',
      roomName: '',
      modal: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(this.state.username);
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
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
              onChange={this.handleInputChange}
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
          <Row className="mt-5">
            <Col xs={12} lg={8}>
              <Ratio aspectRatio="16x9">
                <iframe src={this.state.youtubeVideo}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write;
                encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
              </Ratio>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
