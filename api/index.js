export const searchForSong = async (song) => {
  const res = await fetch(`${process.env.BACKEND_URL}/spotify?q=${song}`);
  const data = await res.json();
  if (data.error) {
    return [];
  }
  return data.data;
};

export const stripeSession = async (data) => {
  const {
    type,
    albumCover,
    dimensions,
    songName,
    artistName,
    size,
    frame,
    qrCode,
    shippingCharge,
  } = data;

  let imgUrl;
  if (type === "custom") {
    const formData = new FormData();
    formData.append("file", albumCover);
    const [x, y, width, height] = dimensions;
    const imgResponse = await fetch(
      `${process.env.BACKEND_URL}/custom?x=${x}&y=${y}&width=${width}&height=${height}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const imgResponseData = await imgResponse.json();
    imgUrl = imgResponseData.data;
  } else {
    imgUrl = albumCover;
  }

  const res = await fetch(`${process.env.BACKEND_URL}/stripe/session`, {
    method: "POST",
    body: JSON.stringify({
      albumCover: imgUrl,
      songName: String.raw`${songName}`,
      artistName: String.raw`${artistName}`,
      size: size,
      frame: frame.includes("Yes"),
      qrCode: qrCode.includes("Yes"),
      shippingCharge: shippingCharge.includes("Yes"),
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
  return await res.json();
};
