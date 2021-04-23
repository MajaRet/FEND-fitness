import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, LabelList } from 'recharts';

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
];

function count(list, elem) {
  return list.reduce((acc, e) => (e === elem ? acc + 1 : acc), 0);
}

function removeAll(list, elem) {
  return list.filter((e) => e !== elem);
}

const ProgramChart = ({ className, id }) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const workoutCategories = testWorkouts.map((workout) => workout.category);
    let tempCategories = workoutCategories;
    const histogram = [];
    let currCategory;
    while (tempCategories.length !== 0) {
      currCategory = tempCategories[0];
      histogram.push({
        name: currCategory,
        value: count(tempCategories, currCategory),
      });
      tempCategories = removeAll(tempCategories, currCategory);
    }
    setCategories(histogram);
  }, []);

  console.log(categories);

  return (
    <div className={className}>
      <PieChart width={730} height={250}>
        <Pie
          data={categories}
          dataKey="value"
          nameKey="value"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
          label={(entry) => entry.name}
        />
      </PieChart>
    </div>
  );
};

export default styled(ProgramChart)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50vh;

  background-color: white;
`;
