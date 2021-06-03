import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

// TODO Don't hardcode color
const LoadingSpinner = () => {
  return <ClipLoader color="#1d2a73" css={override} size={50} />;
};

export default LoadingSpinner;
