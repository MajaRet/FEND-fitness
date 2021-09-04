import { CornerButton } from './CornerButton';
import { ReactComponent as BackIcon } from './../../../../img/svg/back.svg';

/**
 * A button shaped like a 'back' arrow. Positioned in the upper right corner
 * of the page by default.
 */
const BackButton = (props: any) => (
  <CornerButton {...props}>
    <BackIcon />
  </CornerButton>
);

export default BackButton;
