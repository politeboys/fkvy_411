const express = require('express');
const router = express.Router();
const { spotify } = require('../../services');

router.get('/', async (req, res) => {
  try {
    const { q } = req.query
    const apiRes = spotify.request(`https://api.spotify.com/v1/search?q=${q}&type=track&limit=10`)
    const apiResData = await apiRes.json();

    const usefulData = apiResData.tracks.items.map(data => {
      const { name: songName, album: { artists, images }} = data;
      const artistName = artists[0].name
      const coverImg = images[0].url
      return { songName, artistName, coverImg };
    });

    res.send({ error: false, data: usefulData });
  } catch(e) {
    res.send({ error: true, data: e.message });
  }
});

module.exports = router;
