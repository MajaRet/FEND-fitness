import { css } from 'styled-components';

const defaultUnlessSet = (propName) => (props) =>
  props[propName] || props.color || props.theme.fontColorDefault;

const iconColoring = css`
  stroke: ${defaultUnlessSet('strokeColor')};
  fill: ${defaultUnlessSet('fillColor')};

  path {
    stroke: ${defaultUnlessSet('strokeColor')};
    fill: ${defaultUnlessSet('fillColor')};
  }
`;

export default iconColoring;
