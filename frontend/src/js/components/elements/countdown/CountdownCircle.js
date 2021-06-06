import React, { useRef } from 'react';
import styled from 'styled-components';

import CircularProgressBar from './CircularProgressBar';

const CountdownCircle = ({
  className,
  time,
  timeLeft,
  unit,
  fillColor,
  emptyColor,
}) => {
  const radius = 175;

  const prevOffset = useRef(0);

  const progressOffset =
    (1 - Math.max(timeLeft - 1, 0) / time) * 2 * Math.PI * radius;

  console.log(prevOffset.current, progressOffset);
  const res = (
    <CircularProgressBar
      className={className}
      radius={radius}
      progress={progressOffset}
      slice={(radius * 2 * Math.PI) / time}
      prevOffset={prevOffset.current}
      thickness={20}
      centerText={`${timeLeft}${unit}`}
      filledColor={(props) =>
        fillColor || `rgb(${props.theme.fontColorDefault})`
      }
      emptyColor={(props) =>
        emptyColor || `rgba(${props.theme.fontColorDefault},0.3)`
      }
    />
  );

  prevOffset.current = progressOffset;
  return res;
};

export default styled(CountdownCircle)`
  height: fit-content;
`;
