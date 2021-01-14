import React from "react";
import Link from "next/link";
import { Row, Col, Image, Button } from "react-bootstrap";

const Layout = ({ imagePos, img, textArr, button }) => (
  <Row className="mt-5 align-items-center justify-content-between">
    <Col md={{ span: 5, order: imagePos }}>
      <Image src={img} className="w-100 mb-5" />
    </Col>
    <Col md={{ span: 6, order: imagePos === 1 ? 2 : 1 }}>
      {textArr.map((text) => (
        <h4 key={text} className="mb-5 text-left">
          {text}
        </h4>
      ))}
      <Link href={button.url}>
        <Button
          style={{
            width: "190px",
            height: "70px",
            borderRadius: "50px",
            background: "#FD9564",
            border: "none",
            fontSize: "22px",
            fontWeight: "500",
          }}
        >
          {button.text}
        </Button>
      </Link>
    </Col>
  </Row>
);

export default Layout;
