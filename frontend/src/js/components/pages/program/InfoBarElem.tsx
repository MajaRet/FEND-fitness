import styled from 'styled-components';

import CapitalLabel from '../../elements/labels/CapitalLabel';

const StyledInfoBarElem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 4px;

  .circle {
    width: 25px;
    height: 25px;
    border-radius: 50%;

    background-color: ${(props) => `rgb(${props.theme.backgroundPrimary})`};
  }
`;

interface InfoBarElemProps {
  text: string;
}

const InfoBarElem = ({ text }: InfoBarElemProps) => {
  return (
    <StyledInfoBarElem>
      <div className="circle"></div>
      <CapitalLabel>{text}</CapitalLabel>
    </StyledInfoBarElem>
  );
};

export default InfoBarElem;
