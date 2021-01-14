import React, { useReducer } from 'react';
import DataContextReducer from './data.reducer';

const DataContext = React.createContext();

const DataContextProvider = ({ children }) => {  
  const initialState = {
    originalImage: '',
    croppedImage: '',
    croppedImageDimensions: [],
    songName: '',
    artistName: '',
    size: '',
    frame: '',
    qrCode: '',
    shippingCharge: ''
  };
  const [state, dispatch] = useReducer(DataContextReducer, initialState);
  return(
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataContextProvider };
