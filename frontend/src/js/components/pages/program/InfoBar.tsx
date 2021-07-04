import styled from 'styled-components';

import display from '../../../util/naming';
import { Difficulty } from '../../../types/ProgramTypes';

import InfoBarElem from './InfoBarElem';

const StyledInfoBar = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: var(--standard-padding-vertical) var(--standard-padding-horizontal);
`;

interface InfoBarProps {
  type: string;
  difficulty: Difficulty;
  duration: number;
}

const InfoBar = ({ type, difficulty, duration }: InfoBarProps) => {
  return (
    <StyledInfoBar className="info-bar">
      <InfoBarElem text={display(type)} />
      <InfoBarElem text={display(difficulty)} />
      <InfoBarElem text={`${duration} Wochen`} />
    </StyledInfoBar>
  );
};

export default InfoBar;
