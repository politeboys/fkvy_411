import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';

import Navbar from '../../../../components/navbar/navbar.component';
import Footer from '../../../../components/footer/footer.component.jsx';

const constants = {
  HEADING: 'Thank you, we have received your order and are processing it.',
  SUBHEADING: 'We have sent you an email regarding your order and shipping details.',
  BUTTON: {
    text: 'GO HOME',
    url: '/'
  }
};

const Success = () => (
  <div>
    <Navbar/>
    <Container>
      <Row>
        <Col className='text-center'>
          <h1 className='mt-5'>{constants.HEADING}</h1>
          <hr/>
          <h3 className='mt-5'>{constants.SUBHEADING}</h3>
          <Link href={constants.BUTTON.url}>
            <Button className='mt-5'>{constants.BUTTON.text}</Button>
          </Link>
        </Col>
      </Row>
    </Container>
    <Footer/>
  </div>
);

export default Success;
