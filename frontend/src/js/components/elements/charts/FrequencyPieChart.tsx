import React from 'react';
import styled from 'styled-components';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  LegendProps,
} from 'recharts';

import Label from '../labels/Label';

import { generateColors, RGB } from '../../../util/color';
import { createHistogram } from '../../../util/histogram';

/**
 * A colored circle.
 */
const Circle = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const StyledCustomLegend = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;

  div {
    display: flex;
    column-gap: 12px;
  }
`;

/**
 * A component that renders a legend consisting of labels associated with
 * colored circles.
 *
 * @param {[Object]} payload A list of label/color pairs to display.
 */
const CustomLegend = (props: LegendProps) => {
  const { payload } = props;
  if (payload === undefined) {
    return null;
  }
  const renderedLegend = payload.map(({ value, color }) => {
    return (
      <div key={value}>
        <Circle color={color} />
        <Label>{value}</Label>
      </div>
    );
  });
  return <StyledCustomLegend>{renderedLegend}</StyledCustomLegend>;
};

const StyledFrequencyPieChart = styled.div`
  overflow-x: scroll;
`;

interface FrequencyPieChartProps {
  elems: string[];
  startColor?: RGB;
  endColor?: RGB;
}

/**
 * A component that renders a pie chart depicting the relative frequencies
 * of the elements in the given list.
 *
 * @param {[String]} elems A list of elements.
 */
const FrequencyPieChart = ({
  elems,
  startColor = { r: 0, g: 0, b: 0 },
  endColor = { r: 255, g: 255, b: 255 },
}: FrequencyPieChartProps) => {
  const elemCounts = Object.values(createHistogram(elems));
  const colors = generateColors(elemCounts.length, startColor, endColor);

  return (
    <StyledFrequencyPieChart>
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
              {elemCounts?.map((keyValuePair, index) => (
                <Cell key={keyValuePair.name} fill={colors[index]} />
              ))}
            </Pie>
            <Legend
              layout="vertical"
              align="center"
              wrapperStyle={{ marginLeft: '100px' }}
              verticalAlign="middle"
              content={<CustomLegend />}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        'Keine Daten verfügbar'
      )}
    </StyledFrequencyPieChart>
  );
};

export default FrequencyPieChart;
