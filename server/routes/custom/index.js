const express = require('express');
const router = express.Router();
const multer  = require('multer');
const { cloudinary } = require('../../services');

const upload = multer({
  dest: 'server/uploads/',
  limits: { fieldSize: 25 * 1024 * 1024 }
});

router.post('/', upload.single('cover'), async (req, res) => {
  try {
    const { x, y, width, height } = req.query;
    const imgData = req.body.file;
    let base64Image = imgData.split(';base64,').pop()
    require("fs").writeFile("server/uploads/out.png", base64Image, { encoding: 'base64' }, err => {
      if (err) {
        throw 'Image failed to upload.';
      }
      cloudinary.v2.uploader.upload("server/uploads/out.png", {
        eager: [{
          x: parseInt(x),
          y: parseInt(y),
          width: parseInt(width),
          height: parseInt(height),
          crop:'crop'
        }]
      }, (err, result) => {
        if (err) {
          console.log(result)
          throw err;
        }
        res.send({error: false, data: result.eager[0].url})
      });
    });
  } catch(e) {
    console.log(e.message);
    res.send({ error: true, data: e.message });
  }
});

module.exports = router;
