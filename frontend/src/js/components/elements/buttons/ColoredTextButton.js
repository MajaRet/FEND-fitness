import styled from 'styled-components';

const color = (props) =>
  props.color
    ? typeof props.color === 'string'
      ? props.color
      : `rgb(${props.rgb})`
    : `rgb(${props.theme.fontColorDefault})`;
// Color can be given as a comma-separated 3-tuple of RGB values,
// e.g. "250,40,12".
// size is given as a number and interpreted as pixels.
/**
 * A button
 */
export default styled.button`
  padding: 0;
  color: ${color};
  stroke: ${color};
  fill: ${color};
  font-size: ${(props) => (props.size ? `${props.size}px` : null)};

  &[disabled] {
    opacity: 0.5;
  }
`;
