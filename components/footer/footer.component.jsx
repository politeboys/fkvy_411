import React from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Image,
} from "react-bootstrap";
import fb from "../../assets/fb.png";
import ig from "../../assets/ig.png";
import tw from "../../assets/tw.png";
import whiteLogo from "../../assets/whiteLogo.png";

const constants = {
  HEADING: "Product",
  LINKS: [
    {
      text: "FAQs",
      url: "https://docs.mymusicplate.com/frequently-asked-questionse",
    },
    {
      text: "Shipping",
      url: "https://docs.mymusicplate.com/shipping-policies",
    },
  ],
};

const Footer = () => {
  return (
    <Container
      fluid
      className="text-light mt-5"
      style={{ backgroundColor: "#1C2743", padding: "75px 0 75px 0" }}
    >
      <Row style={{ width: "100%" }} className="text-center" sm={12}>
        <Col md={4}>
          <Row className="justify-content-md-center" id="social">
            <a href="https://www.facebook.com/mymusicplate">
              <img src={fb} style={{}} alt="facebook" />
            </a>
            {/* <a href="https://www.instagram.com/music_plates"> */}
            <a href="https://www.instagram.com/mysongplates/">
              <img src={ig} style={{ marginLeft: "30px" }} alt="logo" />
            </a>
            {/* <a href="https://twitter.com/musicplates"> */}
            <a href="https://twitter.com/songplates">
              <img src={tw} style={{ marginLeft: "30px" }} alt="logo" />
            </a>
          </Row>
        </Col>
        <Col md={4} style={{ paddingLeft: "125px" }}>
          <div
            id="faqs"
            style={{
              textAlign: "start",
              maxWidth: "100px",
            }}
          >
            <h1 style={{ fontSize: "22px", fontWeight: "600" }}>
              {constants.HEADING}
            </h1>
            {constants.LINKS.map(({ text, url }, id) => (
              <h4
                style={{
                  fontSize: "22px",
                  fontWeight: "400",
                  color: "#FFFFFF",
                }}
                key={text + id}
                className="mt-4 mb-4"
              >
                <a
                  href={url}
                  style={{ color: "#FFFFFF" }}
                  className="text-decoration-none"
                >
                  {text}
                </a>
              </h4>
            ))}
          </div>
        </Col>
        <Col md={4}>
          {/* <Col>
            <p
              style={{
                textAlign: "start",
                fontSize: "22px",
                fontWeight: "600",
              }}
            >
              SUBSCRIBE TO OUR UPDATES
            </p>
          </Col> */}
          {/* <Col style={{ maxWidth: "420px" }}> */}
          {/* <InputGroup
              style={{ borderRadius: "50px", border: "2px solid #FD9564" }}
            >
              <FormControl
                placeholder="Enter email"
                aria-label="email"
                style={{
                  background: "transparent",
                  border: "none",
                  height: "70px",
                  borderRadius: "50px",
                }}
              />
              <InputGroup.Append>
                <Button
                  style={{
                    width: "180px",
                    height: "70px",
                    borderRadius: "50px",
                    background: "#FD9564",
                    border: "none",
                    fontSize: "22px",
                    fontWeight: "500",
                  }}
                >
                  Subscribe
                </Button>
              </InputGroup.Append>
            </InputGroup> */}
          <a href="https://www.tiktok.com/@songplates">
            <img
              id="whiteLogo"
              src={whiteLogo}
              style={{ width: "350px" }}
              alt="logo"
            />
          </a>
          {/* </Col> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
