import React from 'react';
import { useRouter } from 'next/router';

import BinarySelection from '../../../../components/binary-selection/binary-selection.component.jsx';

const constants = {
  TITLE: 'Find a song or create your custom cover',
  OPTION_1: {
    text: 'Find a Song',
    url: '/shop/song'
  },
  OPTION_2: {
    text: 'Create Custom Cover',
    url: '/shop/custom'
  }
};

const Tab = ({ selection }) => {
  const router = useRouter();

  const onSelectOne = () => {
    router.push(constants.OPTION_1.url);
  };

  const onSelectTwo = () => {
    router.push(constants.OPTION_2.url);
  };

  return(
    <BinarySelection
      title={constants.TITLE}
      options={[
        {
          text: constants.OPTION_1.text,
          color: selection === 1 ? 'primary' : selection === 2 ? 'light' : 'secondary',
          onClick: onSelectOne
        },
        {
          text: constants.OPTION_2.text,
          color: selection === 1 ? 'light' : selection === 2 ? 'primary' : 'secondary',
          onClick: onSelectTwo
        }
      ]}
    />
  )
};

export default Tab;