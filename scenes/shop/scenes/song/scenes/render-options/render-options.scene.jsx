import React, { useContext } from 'react';

import { DropDownItem } from './render-options.styles.jsx';

import { DataContext } from '../../../../../../contexts/data/data.context';
import { 
  updateOriginalImage,
  updateCroppedImage,
  updateSongName,
  updateArtistName,
} from '../../../../../../contexts/data/data.actions';

const RenderOptions = ({ options }) => {
  const { dispatch } = useContext(DataContext);
  return options && options.length ? (
    <div
      className="ml-3"
      style={{
        width: '100%',
        position: 'absolute',
        zIndex: '1',
        border: '1px solid #007bff',
        borderRadius: '15px',
        backgroundColor: 'white',
        top: '-45px',
        left: '0px'
      }}
    >
      {
        options.map(({ songName, artistName, coverImg }, id) => {
          return (
            <DropDownItem
              key={songName+id}
              onClick={() => {
                console.log('Click', songName, artistName, coverImg);
                dispatch(updateSongName(songName));
                dispatch(updateArtistName(artistName));
                dispatch(updateOriginalImage(coverImg));
                dispatch(updateCroppedImage(coverImg));
              }}
            >
              {songName} - {artistName}
            </DropDownItem>
          )
        })
      }
    </div>
  ) : null;
};

export default RenderOptions;
