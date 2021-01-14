import React, { useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FaMusic } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { loadStripe } from "@stripe/stripe-js";

import ImageUpload from "./scenes/image-upload/image-upload.scene.jsx";

import Navbar from "../../../../components/navbar/navbar.component.jsx";
import Tab from "../../components/tab/tab.component.jsx";
import BinarySelection from "../../../../components/binary-selection/binary-selection.component.jsx";
import Plate from "../../components/plate/plate.component.jsx";
import Checkout from "../../components/checkout/checkout.component.jsx";
import CustomCol from "../../components/custom-col/custom-col.component";
import Footer from "../../../../components/footer/footer.component.jsx";

import { DataContext } from "../../../../contexts/data/data.context";
import {
  updateOriginalImage,
  updateCroppedImage,
  updateSongName,
  updateArtistName,
  updateSize,
  updateFrame,
  updateQRcode,
  updateShippingCharge,
} from "../../../../contexts/data/data.actions";

import { stripeSession } from "../../../../api";

const constants = {
  CHOOSE_SIZE: {
    title: "Choose Size",
    option1: "8 x 10 Inches - $24.99",
    option2: "16 x 20 Inches - $37.99 ",
  },
  CUSTOMIZE: {
    title: "Customize Your Album",
    input1: "Song Name",
    input2: "Artist Name",
  },
  ADD_FRAME: {
    title: "Add A Frame?",
    option1: "Yes - $10.00",
    option2: "No Thanks",
  },
  SHIPPING: {
    title: "Are you located outside of Canada or U.S.?",
    option1: "Yes",
    option2: "No",
  },
  ADD_QR_CODE: {
    title: "Add A Spotify QR Code?",
    option1: "Yes - $0",
    option2: "No Thanks",
  },
  SAMPLE_EFFECT: {
    heading: "Sample Effect:",
    subheading:
      "The QR code displayed is for display only. Finalized version will match your selected song.",
  },
};

const Custom = () => {
  const { state, dispatch } = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  // onCheckout and disableCheckout should be in the checkout component

  const onCheckout = async () => {
    try {
      setLoading(true);
      const res = await stripeSession({
        type: "custom",
        albumCover: state.originalImage,
        dimensions: state.croppedImageDimensions,
        songName: state.songName,
        artistName: state.artistName,
        size: state.size,
        frame: state.frame,
        qrCode: state.qrCode,
        shippingCharge: state.shippingCharge,
      });
      const stripe = await loadStripe(process.env.STRIPE_PK);
      const { error } = await stripe.redirectToCheckout({
        sessionId: res.data.id,
      });
      if (error) throw error.message;
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const disableCheckout = () => {
    return (
      loading ||
      !(
        state.originalImage &&
        state.croppedImageDimensions &&
        state.songName &&
        state.artistName &&
        state.size &&
        state.frame
      )
    );
  };

  return (
    <React.Fragment>
      <Navbar />
      <Row className="mb-5">
        <Col xl={6} className="text-center">
          <div className="mx-auto" style={{ position: "relative" }}>
            <Plate />
          </div>
        </Col>
        <Col lg={12} xl={6} className="mt-5">
          <Row>
            <CustomCol light lg={6} xl={5}>
              <ImageUpload />
            </CustomCol>
            <CustomCol lg={6} xl={5}>
              <div className="m-5">
                <h4>{constants.CUSTOMIZE.title}</h4>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        borderRadius: "15px 0px 0px 0px",
                      }}
                    >
                      <FaMusic />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="inlineFormInputGroup"
                    value={state.songName}
                    onChange={(e) => dispatch(updateSongName(e.target.value))}
                    placeholder={constants.CUSTOMIZE.input1}
                    style={{ borderRadius: "0px 15px 0px 0px" }}
                  />
                </InputGroup>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        borderRadius: "0px 0px 0px 15px",
                      }}
                    >
                      <BsFillPersonFill />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="inlineFormInputGroup"
                    value={state.artistName}
                    onChange={(e) => dispatch(updateArtistName(e.target.value))}
                    placeholder={constants.CUSTOMIZE.input2}
                    style={{ borderRadius: "0px 0px 15px 0px" }}
                  />
                </InputGroup>
              </div>
            </CustomCol>
          </Row>
          <Row>
            <BinarySelection
              title={constants.CHOOSE_SIZE.title}
              titleSize="h4"
              options={[
                {
                  text: constants.CHOOSE_SIZE.option1,
                  color:
                    state.size === constants.CHOOSE_SIZE.option1
                      ? "primary"
                      : state.size === constants.CHOOSE_SIZE.option2
                      ? "light"
                      : "secondary",
                  onClick: () =>
                    dispatch(updateSize(constants.CHOOSE_SIZE.option1)),
                },
                {
                  text: constants.CHOOSE_SIZE.option2,
                  color:
                    state.size === constants.CHOOSE_SIZE.option1
                      ? "light"
                      : state.size === constants.CHOOSE_SIZE.option2
                      ? "primary"
                      : "secondary",
                  onClick: () =>
                    dispatch(updateSize(constants.CHOOSE_SIZE.option2)),
                },
              ]}
            />
            <BinarySelection
              title={constants.ADD_FRAME.title}
              titleSize="h4"
              options={[
                {
                  text: constants.ADD_FRAME.option1,
                  color:
                    state.frame === constants.ADD_FRAME.option1
                      ? "primary"
                      : state.frame === constants.ADD_FRAME.option2
                      ? "light"
                      : "secondary",
                  onClick: () =>
                    dispatch(updateFrame(constants.ADD_FRAME.option1)),
                },
                {
                  text: constants.ADD_FRAME.option2,
                  color:
                    state.frame === constants.ADD_FRAME.option1
                      ? "light"
                      : state.frame === constants.ADD_FRAME.option2
                      ? "primary"
                      : "secondary",
                  onClick: () =>
                    dispatch(updateFrame(constants.ADD_FRAME.option2)),
                },
              ]}
            />
          </Row>
          <Row>
            <BinarySelection
              title={constants.SHIPPING.title}
              titleSize="h5"
              options={[
                {
                  text: constants.SHIPPING.option1,
                  color:
                    state.shippingCharge === constants.SHIPPING.option1
                      ? "primary"
                      : state.shippingCharge === constants.SHIPPING.option2
                      ? "light"
                      : "secondary",
                  onClick: () =>
                    dispatch(updateShippingCharge(constants.SHIPPING.option1)),
                },
                {
                  text: constants.SHIPPING.option2,
                  color:
                    state.shippingCharge === constants.SHIPPING.option1
                      ? "light"
                      : state.shippingCharge === constants.SHIPPING.option2
                      ? "primary"
                      : "secondary",
                  onClick: () =>
                    dispatch(updateShippingCharge(constants.SHIPPING.option2)),
                },
              ]}
            />
          </Row>
          {
            // <Row className="mb-5">
            //   <CustomCol light lg={6} xl={5}>
            //     <BinarySelection
            //       title={constants.ADD_QR_CODE.title}
            //       titleSize='h4'
            //       options={[
            //         {
            //           text: constants.ADD_QR_CODE.option1,
            //           color: state.qrCode ===  constants.ADD_QR_CODE.option1 ? 'primary' : state.qrCode ===  constants.ADD_QR_CODE.option2 ? 'light' : 'secondary',
            //           onClick: () => dispatch(updateQRcode(constants.ADD_QR_CODE.option1))
            //         },
            //         {
            //           text: constants.ADD_QR_CODE.option2,
            //           color: state.qrCode ===  constants.ADD_QR_CODE.option1 ? 'light' : state.qrCode ===  constants.ADD_QR_CODE.option2 ? 'primary' : 'secondary',
            //           onClick: () => dispatch(updateQRcode(constants.ADD_QR_CODE.option2))
            //         }
            //       ]}
            //     />
            //   </CustomCol>
            //   <CustomCol lg={6} xl={5}>
            //     <div className="m-5 w-75 mx-auto">
            //       <h4>{constants.SAMPLE_EFFECT.heading}</h4>
            //       <p>{constants.SAMPLE_EFFECT.subheading}</p>
            //     </div>
            //   </CustomCol>
            // </Row>
          }
          <Row>
            <Col className="text-center mt-5" lg={12} xl={10}>
              <Checkout
                onClick={onCheckout}
                disabled={disableCheckout()}
                loading={loading}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Footer />
    </React.Fragment>
  );
};

export default Custom;
