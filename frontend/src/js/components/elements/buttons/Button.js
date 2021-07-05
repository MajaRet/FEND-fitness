import styled from 'styled-components';

export default styled.button`
  padding: 12px 25px;
  border: none;
  border-radius: 50px;
  background-color: ${(props) =>
    props.color || `rgb(${props.theme.buttonColor})`};
  color: ${(props) => props.textColor || `rgb(${props.theme.buttonTextColor})`};
`;
