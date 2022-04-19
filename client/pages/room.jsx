import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Ratio from 'react-bootstrap/Ratio';

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <Container>
        <Row className="justify-content-space-between mt-5">
          <Col hover xs={10} lg={10}>
            <h1>Hello</h1>
          </Col>
          <Col xs={2} lg={2}>
            <h1>Alex</h1>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xs={12} lg={8}>
            <Ratio aspectRatio="16x9">
              <iframe src="https://www.youtube.com/embed/pjGWGWG3rjo">
              </iframe>
            </Ratio>
          </Col>
        </Row>
      </Container>
    );
  }
}
