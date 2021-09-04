/**
 * A button that sits in the upper right corner of the container.
 */
import styled, { css } from 'styled-components';

import { ColoredTextButton, ColoredTextLink } from './ColoredTextButton';

const styles = css`
  position: absolute;
  top: var(--standard-padding-vertical);
  right: var(--standard-padding-horizontal);
  z-index: 2;

  padding: 0 !important;
`;

export const CornerButton = styled(ColoredTextButton)`
  ${styles}
`;
export const CornerLink = styled(ColoredTextLink)`
  ${styles}
`;
