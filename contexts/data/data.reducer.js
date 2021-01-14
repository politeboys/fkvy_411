import { DataActionTypes } from './data.types';

const DataContextReducer = (state, action) => {
  switch(action.type) {
    case DataActionTypes.UPDATE_ORIGINAL_IMAGE: 
      return {
        ...state,
        originalImage: action.payload
      }
    case DataActionTypes.UPDATE_CROPPED_IMAGE:
      return {
        ...state,
        croppedImage: action.payload
      }
    case DataActionTypes.UPDATE_CROPPED_IMAGE_DIMENSIONS:
      return {
        ...state,
        croppedImageDimensions: action.payload
      }
    case DataActionTypes.UPDATE_SONG_NAME:
      return {
        ...state,
        songName: action.payload
      }
    case DataActionTypes.UPDATE_ARTIST_NAME:
      return {
        ...state,
        artistName: action.payload
      }
    case DataActionTypes.UPDATE_SIZE:
      return {
        ...state,
        size: action.payload
      }
    case DataActionTypes.UPDATE_FRAME:
      return {
        ...state,
        frame: action.payload
      }
    case DataActionTypes.UPDATE_QR_CODE:
      return {
        ...state,
        qrCode: action.payload
      }
    case DataActionTypes.UPDATE_SHIPPING_CHARGE:
      return {
        ...state,
        shippingCharge: action.payload
      }
    default: 
      return state;
  }
}

export default DataContextReducer;
