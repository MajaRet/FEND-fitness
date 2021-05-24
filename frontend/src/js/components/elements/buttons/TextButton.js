import styled from 'styled-components';

// Color can be given as a comma-separated 3-tuple of RGB values,
// e.g. "250,40,12".
// size is given as a number and interpreted as pixels.
export default styled.button`
  padding: 0;
  font-size: ${(props) => props.size || 80}px;
  color: ${(props) =>
    props.rgb ? `rgb(${props.rgb})` : `rgb(${props.theme.fontColorDefault})`};

  &[disabled] {
    color: ${(props) =>
      props.rgb
        ? `rgba(${props.rgb},0.5)`
        : `rgba(${props.theme.fontColorDefault},0.5)`};
  }
`;
