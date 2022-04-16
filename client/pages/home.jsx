import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Home extends React.Component {
  // constructor(props) {

  // }

  render() {
    return (
      <>
        <Container>
          <Form>
           <Row className="justify-content-center mt-5">
             <Col xs="12" lg="4">
                <Form.Label className="font-label">Room Name</Form.Label>
                <Form.Control className="mb-4" type="text" required />
              </Col>
              <Col xs="12" lg="4">
                <Form.Label className="font-label">Username</Form.Label>
                <Form.Control className="mb-4" type="text" required />
             </Col>
              <Col xs="12" lg="4">
                <Form.Label className="font-label">Insert Youtube Video</Form.Label>
                <Form.Control className="mb-4" type="text" required />
              </Col>
            </Row>
           <Button className="float-end mt-2" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}
