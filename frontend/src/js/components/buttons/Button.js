import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 12px 25px;
  border: none;
  border-radius: 50px;
  background-color: var(--dark-blue);
  color: white;
`;

const Button = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
