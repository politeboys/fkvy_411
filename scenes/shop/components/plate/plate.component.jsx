import React, { useContext, useEffect, useState } from "react";
import { Image } from "react-bootstrap";

import plateImg from "../../../../assets/emptyPlate.png";

import { DataContext } from "../../../../contexts/data/data.context";

const Plate = () => {
  const {
    state: { croppedImage, songName, artistName, frame },
  } = useContext(DataContext);

  const [plateWidth, setPlateWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [cropDim, setCropDim] = useState({});
  const [textDim, setTextDim] = useState({});

  useEffect(() => {
    setPlateWidth(window.screen.width < 483 ? "250px" : "500px");
    setHeight(
      window.screen.width < 483
        ? 250 / 0.63527758257 + "px"
        : 500 / 0.63527758257 + "px"
    );
    setCropDim(
      window.screen.width < 483
        ? {
            left: "43px",
            top: "47px",
            width: "156px",
          }
        : {
            left: "86px",
            top: "94px",
            width: "311px",
          }
    );
    setTextDim(
      window.screen.width < 483
        ? {
            top: "215px",
            left: "48px",
            fontSize: "10px",
          }
        : {
            top: "409px",
            left: "95px",
            fontSize: "20px",
          }
    );
  }, []);

  const addBorder = frame.includes("Yes");

  return (
    <div
      style={{
        width: plateWidth,
        height: height,
        margin: "0 auto",
        position: "relative",
      }}
    >
      <Image
        src={plateImg}
        style={
          addBorder
            ? {
                width: plateWidth,
                position: "absolute",
                left: "0px",
                right: "0px",
                border: "10px solid black",
                boxShadow: "inset 0px 0px 0px 10px red",
                boxSizing: "border-box",
              }
            : {
                width: plateWidth,
                position: "absolute",
                left: "0px",
                right: "0px",
              }
        }
      />
      <Image
        src={croppedImage}
        style={{
          position: "absolute",
          zIndex: "1",
          left: cropDim.left,
          top: cropDim.top,
          width: cropDim.width,
        }}
      />
      <div
        className="text-left"
        style={{
          color: "black",
          position: "absolute",
          fontSize: textDim.fontSize,
          top: textDim.top,
          left: textDim.left,
        }}
      >
        {songName}
        <br />
        {artistName}
      </div>
    </div>
  );
};

export default Plate;
