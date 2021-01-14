import React from "react";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Selection } from "./binary-selection.styles";

const BinarySelection = ({ title, titleSize, options }) => {
  return (
    <Selection className="p-4">
      <h1
        style={{ paddingLeft: "40px", marginBottom: "20px" }}
        className={titleSize}
      >
        {title}
      </h1>
      <Row className="justify-content-around">
        {options.map((data, id) => {
          const { text, color, onClick } = data;
          return (
            <Col key={text + id} md={5}>
              <Button
                variant={color}
                onClick={onClick}
                style={{
                  width: "250px",
                  height: "50px",
                  borderRadius: "80px",
                  bachground: "transparent",
                }}
                className="m-2"
              >
                {text}
              </Button>
            </Col>
          );
        })}
      </Row>
    </Selection>
  );
};

export default BinarySelection;
