import Label from './Label';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LabelLink = Label.withComponent(Link);

export default styled(LabelLink)`
  text-decoration: none;
`;
