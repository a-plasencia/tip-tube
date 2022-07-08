import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
      youtubeVideo: '',
      loading: false,
      submit: true,
      error: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  loadingSpinner() {
    if (this.state.loading === true) {
      return '';
    } else {
      return 'd-none';
    }
  }

  submitSpinner() {
    if (this.state.submit === true) {
      return 'Submit';
    } else {
      return '';
    }
  }

  error() {
    if (this.state.error === true) {
      return 'justify-content-center mt-4';
    } else {
      return 'd-none justify-content-center mt-4';
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      loading: true,
      submit: false
    });
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/create', req)
      .then(res => res.json())
      .then(result => {
        window.location.hash = `room?roomId=${result.roomId}`;
      })
      .catch(err => {
        this.setState({
          error: true
        });
        console.error('Fetch failed', err);
      });
  }

  render() {
    const loadingSpinner = this.loadingSpinner();
    const submit = this.submitSpinner();
    const error = this.error();
    return (
      <>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Row className="justify-content-center mt-5">
             <Col xs="12" lg="6">
                <Form.Label className="font-label">Room Name</Form.Label>
                <Form.Control onChange={this.handleInputChange} value={this.state.roomName} name="roomName" className="mb-4" type="text" required />
              </Col>
              <Col xs="12" lg="6">
                <Form.Label className="font-label">Insert Youtube Video</Form.Label>
                <Form.Control onChange={this.handleInputChange} value={this.state.youtubeVideo} name="youtubeVideo" className="mb-4" type="text" required />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button className="float-end mt-2 mb-2" variant="primary" type="submit">
                {submit}
                <Spinner
                className={`${loadingSpinner}`}
                as="span"
                animation="border"
                role="status"
                size="sm"
                aria-hidden="true"
                />
                </Button>
              </Col>
            </Row>
            <Row>
              <Alert variant="primary" className={`${error}`}>Sorry, there was an error connecting to the network! Please check your internet connection and try again.</Alert>
            </Row>
          </Form>
        </Container>
      </>
    );
  }
}
