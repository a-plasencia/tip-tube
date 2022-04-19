import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Ratio from 'react-bootstrap/Ratio';

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null,
      youtubeVideo: '',
      roomName: ''
    };
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

  render() {
    return (
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
    );
  }
}
