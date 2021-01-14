import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';

import Navbar from '../../../../components/navbar/navbar.component';
import Footer from '../../../../components/footer/footer.component.jsx';

const constants = {
  HEADING: 'Sorry, your payment was not successful.',
  SUBHEADING: 'Please try again later.',
  BUTTON: {
    text: 'GO HOME',
    url: '/'
  }
};

const Fail = () => (
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

export default Fail;
