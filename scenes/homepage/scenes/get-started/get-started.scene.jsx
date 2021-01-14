import React from "react";
import Link from "next/link";
import heroImg from "../../../../assets/heroImg.png";
import tunes from "../../../../assets/tunes.png";
import groupImage from "../../../../assets/group.png";
import mainButtonArrow from "../../../../assets/mainButtonArrow.png";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

const constants = {
  TITLE: "Your Song On A Plate",
  SUBTITLE:
    "Make your very own custom album cover poster in under two minutes.",
  BUTTON_TEXT: "CREATE COVER",
  // PRIVACY_POLICY: {
  /* <p className="m-4 w-75 mx-auto">
      By clicking on “SHOP NOW”, you agree MyMusicPlate.com’s{" "}
      <a href="https://juneyoung9913.gitbook.io/mymusicplate/privacy-policy">
        privacy policy
      </a>{" "}
      and{" "}
      <a href="https://juneyoung9913.gitbook.io/mymusicplate/">
        terms of service
      </a>
      .
    </p> */
  // },
};

const GetStarted = ({}) => {
  return (
    <Container>
      <Row>
        <Col md={8}>
          <Col id="heroText" style={{ paddingTop: "120px" }}>
            <h1 style={{ fontSize: "50px" }}>{constants.TITLE}</h1>
            <h4
              className="mt-4 mb-4"
              style={{
                fontSize: "24px",
                lineHeight: "42px",
                maxWidth: "490px",
              }}
            >
              {constants.SUBTITLE}
            </h4>
            <Link href="/shop">
              <Button
                variant="primary"
                className="mb-4"
                style={{
                  width: "274px",
                  height: "90px",
                  borderRadius: "50px",
                  background: "#FD9564",
                  border: "none",
                  fontSize: "22px",
                  fontWeight: "500",
                }}
              >
                {constants.BUTTON_TEXT}
                <img
                  style={{ marginLeft: "15px" }}
                  src={mainButtonArrow}
                  alt="mainButtonArrow"
                />
              </Button>
            </Link>
            <Image
              id="tunes"
              src={tunes}
              style={{ width: "100vh", maxWidth: "486px", marginTop: "50px" }}
            />
          </Col>
        </Col>
        <Col md={4}>
          <Image
            id="heroImg"
            src={heroImg}
            style={{
              width: "100vh",
              maxWidth: "540px",
              marginLeft: "-110px",
              marginTop: "-40px",
            }}
          />
        </Col>
      </Row>
      {/* <Row>
        <Col className="text-center">{constants.PRIVACY_POLICY}</Col>
      </Row> */}
    </Container>
  );
};

export default GetStarted;
