import { DataActionTypes } from './data.types';

export const updateOriginalImage = image => ({
  type: DataActionTypes.UPDATE_ORIGINAL_IMAGE,
  payload: image
});

export const updateCroppedImage = image => ({
  type: DataActionTypes.UPDATE_CROPPED_IMAGE,
  payload: image
});

export const updateCroppedImageDimensions = arr => ({
  type: DataActionTypes.UPDATE_CROPPED_IMAGE_DIMENSIONS,
  payload: arr
})

export const updateSongName = name => ({
  type: DataActionTypes.UPDATE_SONG_NAME,
  payload: name
});

export const updateArtistName = name => ({
  type: DataActionTypes.UPDATE_ARTIST_NAME,
  payload: name
});

export const updateSize = size => ({
  type: DataActionTypes.UPDATE_SIZE,
  payload: size
});

export const updateFrame = frame => ({
  type: DataActionTypes.UPDATE_FRAME,
  payload: frame
});

export const updateQRcode = code => ({
  type: DataActionTypes.UPDATE_QR_CODE,
  payload: code
});

export const updateShippingCharge = bool => ({
  type: DataActionTypes.UPDATE_SHIPPING_CHARGE,
  payload: bool
});
