import React, {useContext, useState, useCallback, useRef, useEffect } from 'react';
import { Form, Modal, Button, Row, Col } from 'react-bootstrap';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { DataContext } from '../../../../../../contexts/data/data.context';
import { 
  updateCroppedImage,
  updateOriginalImage,
  updateCroppedImageDimensions
} from '../../../../../../contexts/data/data.actions';

const pixelRatio = 1;

const ImageUpload = () => {
  const { dispatch } = useContext(DataContext);

  const [upImg, setUpImg] = useState();
  const [upImgDim, setUpImgDim] = useState({}); 
  const [displayImgDim, setDisplayImgDim] = useState({});
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [showMod, setShowMod] = useState(false);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 9 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const getResizedCanvas = (canvas, newWidth, newHeight) => {
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = newWidth;
    tmpCanvas.height = newHeight;

    const ctx = tmpCanvas.getContext("2d");
    ctx.drawImage(
      canvas,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      newWidth,
      newHeight
    );

    return tmpCanvas;
  }

  const generateDownload = (previewCanvas, crop) => {
    if (!crop || !previewCanvas) {
      return;
    }
    const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);
    const image = canvas.toDataURL("image/png");
    dispatch(updateCroppedImage(image));
    dispatch(updateOriginalImage(upImg));
    const actualToDisplayWidth = upImgDim.width/displayImgDim.width
    const actualToDisplayHeight = upImgDim.height/displayImgDim.height
    const updatedDimensions = [
      actualToDisplayWidth*completedCrop.x,
      actualToDisplayHeight*completedCrop.y,
      actualToDisplayWidth*completedCrop.width,
      actualToDisplayHeight*completedCrop.height
    ];
    dispatch(updateCroppedImageDimensions(updatedDimensions));
  }

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", function(){
        setUpImg(reader.result);
        const image = new Image();
        image.src = reader.result;
        image.onload = function(){
          setUpImgDim({
            width: this.width,
            height: this.height
          })
        }
      });
      reader.readAsDataURL(e.target.files[0]);
      setShowMod(true)
    }
  };

  const onLoad = useCallback(img => {
    imgRef.current = img;
    setDisplayImgDim({
      width: img.width,
      height: img.height
    })
  }, []);

  const finishedCrop = () => {
    setShowMod(false);
    console.log(upImgDim);
    console.log(displayImgDim);
    generateDownload(previewCanvasRef.current, completedCrop);
  };

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  return (
    <div className='m-5 text-center'> 
      <h4>Upload Image</h4>
      <Form style={{width: '250px'}} className="mx-auto">
        <Form.Group>
          <Form.File
            id="uploadImageControl"
            className="m-2"
            onChange={onSelectFile}
            accept="image/x-png,image/jpeg"
          />
        </Form.Group>
      </Form>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showMod}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Crop image to your liking.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <ReactCrop
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={c => setCrop(c)}
                onComplete={c => setCompletedCrop(c)}
              />
            </Col>
            <Col className="text-center">
              <canvas
                ref={previewCanvasRef}
                style={{
                  width: completedCrop?.width ?? 0,
                  height: completedCrop?.height ?? 0
                }}
            />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={finishedCrop}>Done</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
};

export default ImageUpload;