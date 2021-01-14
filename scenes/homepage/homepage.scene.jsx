import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

import Navbar from "../../components/navbar/navbar.component.jsx";
import Layout from "./components/layout/layout.component";
import GetStarted from "./scenes/get-started/get-started.scene.jsx";
import SecondSection from "./scenes/second-section/SecondSection.scene.jsx";
import Footer from "../../components/footer/footer.component.jsx";

import sedona from "../../assets/sedona.png";
import cherry from "../../assets/cherry.png";
import wwy from "../../assets/wwy.png";

const constants = {
  SECTIONS: [
    {
      title: "A Great Gift for Anyone",
      imagePos: 1,
      img: sedona,
      textArr: [
        " ''Music is life Itself'' -Louis Armustrong ",
      ],
      // textArr: [
      //   "Choose your favorite song that captures the perfect moment. Alternatively, get creative with our custom building tool to make the poster look however you want!",
      // ],
      button: {
        text: "CREATE MINE",
        url: "/shop/song",
      },
    },
    {
      title: "The Highest Quality Materials",
      imagePos: 2,
      img: cherry,
      textArr: [
        "We hand-picked our materials: heavyweight 1/16 inch plexiglass, with a smoothed surface.",
        "We then laser print directly onto the plexiglass to create a scratch-resisiting surface to ensure the best quality.",
        "We promise your poster will last a long time, or we’ll replace it FOR FREE!",
      ],
      button: {
        text: "CREATE MINE",
        url: "/shop/song",
      },
    },
    {
      title: "We’re Here to Help You 24/7",
      imagePos: 1,
      img: wwy,
      textArr: [
        "We want to make sure you are happy with your album cover. If you have any questions, we’ll get back to you usually as fast as we can.",
        "Most of our team members are here around the clock. Don't hesitate to get in touch if you have any questions.",
      ],
      button: {
        text: "CREATE MINE",
        url: "/shop/song",
      },
    },
  ],
};

const Homepage = () => (
  <div>
    <Navbar />
    <GetStarted />
    <SecondSection />
    <Container>
      <Row className="mt-4">
        {constants.SECTIONS.map(
          ({ title, imagePos, img, textArr, button }, id) => (
            <Layout
              key={title + id}
              imagePos={imagePos}
              img={img}
              textArr={textArr}
              button={button}
            />
          )
        )}
      </Row>
    </Container>
    <Footer />
  </div>
);

export default Homepage;
