import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Navbar from '../../components/navbar/navbar.component.jsx';
import Tab from './components/tab/tab.component.jsx';
import Plate from './components/plate/plate.component.jsx';
import Footer from '../../components/footer/footer.component.jsx';

const Shop = () => (
  <React.Fragment>
    <Navbar/>
    <Container>
      <Row>
        <Col className='text-center'>
          <Tab/>
        </Col>
      </Row>
      <Row className="justify-content-md-center mb-5">
        <Col></Col>
        <Col>
          <Plate/>
        </Col>
        <Col></Col>
      </Row>
    </Container>
    <Footer/>
  </React.Fragment>
);

export default Shop;
