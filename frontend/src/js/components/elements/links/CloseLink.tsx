import { CornerLink } from '../buttons/CornerButton';
import { ReactComponent as CloseIcon } from './../../../../img/svg/close.svg';

/**
 * A link shaped like a closing x. Positioned in the upper right corner
 * of the page by default.
 */
const CloseLink = (props: any) => (
  <CornerLink {...props}>
    <CloseIcon />
  </CornerLink>
);

export default CloseLink;
