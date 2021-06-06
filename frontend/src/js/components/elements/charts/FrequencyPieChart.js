import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

import Label from '../../elements/labels/Label';

import generateColors from '../../../util/color';
import { histogram } from '../../../util/histogram';

/**
 * A colored circle.
 */
const Circle = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

/**
 * A component that renders a legend consisting of labels associated with
 * colored circles.
 *
 * @param {[Object]} payload A list of label/color pairs to display.
 */
const CustomLegend = ({ className, payload }) => {
  const renderedLegend = payload.map(({ value, color }) => {
    return (
      <div key={value}>
        <Circle color={color} />
        <Label>{value}</Label>
      </div>
    );
  });
  return <div className={className}>{renderedLegend}</div>;
};

const StyledCustomLegend = styled(CustomLegend)`
  display: flex;
  flex-direction: column;
  row-gap: 15px;

  div {
    display: flex;
    column-gap: 12px;
  }
`;

/**
 * A component that renders a pie chart depicting the relative frequencies
 * of the elements in the given list.
 *
 * @param {[String]} elems A list of elements.
 */
const FrequencyPieChart = ({
  className,
  elems,
  startColor = { r: 0, g: 0, b: 0 },
  endColor = { r: 255, g: 255, b: 255 },
}) => {
  const elemCounts = Object.values(histogram(elems));
  const colors = generateColors(elemCounts.length, startColor, endColor);

  return (
    <div className={className}>
      {elemCounts ? (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={elemCounts}
              cx="30%"
              dataKey="value"
              outerRadius={80}
              fill="#8884d8"
            >
              {elemCounts?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <Legend
              layout="vertical"
              align="center"
              wrapperStyle={{ marginLeft: '100px' }}
              verticalAlign="middle"
              content={<StyledCustomLegend />}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        'Keine Daten verfügbar'
      )}
    </div>
  );
};

export default styled(FrequencyPieChart)`
  overflow-x: scroll;
`;
