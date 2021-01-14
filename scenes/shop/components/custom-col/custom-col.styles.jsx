import styled from 'styled-components';
import { Col } from 'react-bootstrap';

export const CustomCol = styled(Col)`
  &:hover{
    transform:scale(1);
    filter:blur(0px);
    opacity:1;
    box-shadow:0 8px 20px 0px rgba(0,0,0,0.125);
  }
`;