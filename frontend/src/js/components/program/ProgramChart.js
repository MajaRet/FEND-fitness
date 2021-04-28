import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import Label from './../labels/Label';

// Generates an array of @number colors between two fixed colors.
function generateColors(number) {
  const startColor = { r: 122, g: 135, b: 120 };

  if (number <= 1)
    return [`rgb(${startColor.r},${startColor.g},${startColor.b})`];

  const endColor = { r: 210, g: 221, b: 208 };
  const colors = [];
  const rStep = (endColor.r - startColor.r) / (number - 1);
  const gStep = (endColor.g - startColor.g) / (number - 1);
  const bStep = (endColor.b - startColor.b) / (number - 1);

  let r;
  let g;
  let b;
  for (let i = 0; i < number; i++) {
    r = startColor.r + i * rStep;
    g = startColor.g + i * gStep;
    b = startColor.b + i * bStep;
    colors.push(`rgb(${r},${g},${b})`);
  }
  return colors;
}

const Circle = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

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

// TODO remove
const testWorkouts = [
  {
    category: 'Krafttraining',
  },
  {
    category: 'Koordination',
  },
  {
    category: 'Beweglichkeit',
  },
  {
    category: 'Kardio',
  },
  {
    category: 'Krafttraining',
  },
  {
    category: 'Geschicklichkeit',
  },
  {
    category: 'Hand-Auge-Koordination',
  },
];

const ProgramChart = ({ className, id }) => {
  const [categories, setCategories] = useState(null);
  const [colors, setColors] = useState([]);

  // Construct a pie chart for the relative category occurrences.
  useEffect(() => {
    const workoutCategories = testWorkouts.map((workout) => workout.category);
    const histogram = {};
    workoutCategories.forEach((cat) => {
      histogram[cat] = {
        name: cat,
        value: histogram[cat] ? histogram[cat].value + 1 : 1,
      };
    });
    const vals = Object.values(histogram);
    setCategories(vals);
    setColors(generateColors(vals.length));
  }, []);

  return (
    <section className={className}>
      <h3>So ist das Programm aufgeteilt:</h3>
      {categories ? (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categories}
              cx="30%"
              dataKey="value"
              outerRadius={80}
              fill="#8884d8"
            >
              {categories?.map((entry, index) => (
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
    </section>
  );
};

export default styled(ProgramChart)`
  overflow-x: scroll;
  background-color: white;
`;
