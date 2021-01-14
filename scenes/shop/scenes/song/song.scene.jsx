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

import Navbar from "../../../../components/navbar/navbar.component.jsx";
import Tab from "../../components/tab/tab.component.jsx";
import BinarySelection from "../../../../components/binary-selection/binary-selection.component.jsx";
import Plate from "../../components/plate/plate.component.jsx";
import Checkout from "../../components/checkout/checkout.component.jsx";
import RenderOptions from "./scenes/render-options/render-options.scene.jsx";
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

import {
  searchForSong as searchForSongApi,
  stripeSession,
} from "../../../../api";

const constants = {
  CHOOSE_SIZE: {
    title: "Choose Size",
    option1: "8 x 10 Inches - $24.99",
    option2: "16 x 20 Inches - $37.99 ",
  },
  CUSTOMIZE: {
    title: "Search for song",
    input1: "Song or Album Name",
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

const Song = () => {
  const { state, dispatch } = useContext(DataContext);
  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchForSong = async (song) => {
    dispatch(updateSongName(song));
    if (/[a-zA-Z]/.test(song) || /\d/.test(song)) {
      const items = await searchForSongApi(song);
      setOptions(items);
      setShowOptions(true);
    } else {
      setOptions([]);
      setShowOptions(false);
    }
  };

  const processSelection = () => {
    setTimeout(() => {
      setShowOptions(false);
    }, 100);
  };

  const onCheckout = async () => {
    setLoading(true);
    const res = await stripeSession({
      type: "original",
      albumCover: state.originalImage,
      songName: state.songName,
      artistName: state.artistName,
      size: state.size,
      frame: state.frame,
      qrCode: state.qrCode,
      shippingCharge: state.shippingCharge,
    });
    try {
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
            <Col lg={12} xl={10}>
              <InputGroup
                className="m-5"
                style={{
                  borderRadius: "50px",
                  border: "2px solid #FD9564",
                  boxSizing: "borderBox",
                  width: "80%",
                  maxWidth: "550px",
                }}
              >
                <FormControl
                  placeholder="Enter email"
                  aria-label="email"
                  id="inlineFormInputGroup"
                  value={state.songName}
                  onChange={(e) => searchForSong(e.target.value)}
                  onBlur={processSelection}
                  placeholder={constants.CUSTOMIZE.input1}
                  style={{
                    background: "transparent",
                    border: "none",
                    borderRadius: "50px",
                  }}
                />
                <InputGroup.Append>
                  <InputGroup.Text
                    style={{
                      borderRadius: "50px",
                      background: "#FD9564",
                      border: "none",
                      fontSize: "22px",
                      fontWeight: "500",
                    }}
                  >
                    <FaMusic style={{ color: "white" }} />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
              {/* ********************************************************* */}
              {/* <InputGroup className="p-5">
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      style={{backgroundColor: '#007bff', color: 'white', borderRadius: '15px 0px 0px 15px'}}
                    ><FaMusic/></InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl 
                    id="inlineFormInputGroup"
                    value={state.songName}
                    onChange={e => searchForSong(e.target.value)}
                    onBlur={processSelection}
                    placeholder={constants.CUSTOMIZE.input1}
                    style={{borderRadius: '0px 15px 15px 0px'}}
                  />
                </InputGroup> */}
              {showOptions && (
                <div
                  style={{
                    width: "80%",
                    margin: "0 auto",
                    position: "relative",
                  }}
                >
                  <RenderOptions options={options} />
                </div>
              )}
            </Col>
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
          </Row>
          <Row>
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
          <Row style={{ maxWidth: "580px !important" }}>
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

export default Song;
