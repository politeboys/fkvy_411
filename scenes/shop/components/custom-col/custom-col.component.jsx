import React from 'react';
import { CustomCol } from './custom-col.styles';

const ColComponent = ({ children, lg, xl, light }) => (
  <CustomCol className={`text-center ${light ? 'bg-light' : ''}`} lg={lg} xl={xl}>
    {children}
  </CustomCol>
);

export default ColComponent;