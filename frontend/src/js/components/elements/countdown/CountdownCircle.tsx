import React from 'react';
import { useRef } from 'react';

import CircularProgressBar from './CircularProgressBar';

// TODO Replace 'any' type
interface CountdownCircleProps {
  time: number;
  timeLeft: number;
  unit: string;
  fillColor?: string | ((props: any) => string);
  emptyColor?: string | ((props: any) => string);
}

const CountdownCircle = ({
  time,
  timeLeft,
  unit,
  fillColor,
  emptyColor,
}: CountdownCircleProps) => {
  const prevOffset = useRef(0);

  const radius = 150;
  const progressOffset =
    (1 - Math.max(timeLeft - 1, 0) / time) * 2 * Math.PI * radius;

  const res = (
    <CircularProgressBar
      radius={radius}
      progress={progressOffset}
      prevOffset={prevOffset.current}
      thickness={20}
      centerText={`${timeLeft}${unit}`}
      filledColor={(props) =>
        !fillColor
          ? `rgb(${props.theme.fontColorDefault})`
          : typeof fillColor === 'string'
          ? fillColor
          : fillColor(props)
      }
      emptyColor={(props) =>
        !emptyColor
          ? `rgba(${props.theme.fontColorDefault},0.3)`
          : typeof emptyColor === 'string'
          ? emptyColor
          : emptyColor(props)
      }
    />
  );

  prevOffset.current = progressOffset;
  return res;
};

export default CountdownCircle;
