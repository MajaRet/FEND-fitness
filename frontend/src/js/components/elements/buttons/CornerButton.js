import styled from 'styled-components';

import ColoredTextButton from './ColoredTextButton';

/**
 * A button that sits in the upper right corner of the page.
 */
export default styled(ColoredTextButton)`
  position: absolute;
  top: var(--standard-padding-vertical);
  right: var(--standard-padding-horizontal);
  z-index: 2;

  padding: 0 !important;
`;
