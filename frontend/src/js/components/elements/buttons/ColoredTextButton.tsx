import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const color = (props: any): string =>
  props.color
    ? typeof props.color === 'string'
      ? props.color
      : `rgb(${props.color})`
    : `rgb(${props.theme.fontColorDefault})`;

const styles = css<{ size?: number }>`
  padding: 0;
  color: ${color};
  font-size: ${(props) => (props.size ? `${props.size}px` : null)};

  svg * {
    stroke: ${color};
  }

  &[disabled] {
    opacity: 0.5;
  }
`;

export const ColoredTextButton = styled.button`
  ${styles}
`;
export const ColoredTextLink = styled(Link)`
  ${styles}
`;
