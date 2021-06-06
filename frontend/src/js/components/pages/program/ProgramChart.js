import React from 'react';
import styled from 'styled-components';

import FrequencyPieChart from '../../elements/charts/FrequencyPieChart';

import display from '../../../util/naming';

/**
 * A component that shows a pie chart depicting the relative frequencies
 * of workout categories in the given category list.
 *
 * @param {[String]} categories A list of categories
 */
const ProgramChart = ({ className, categories }) => {
  const displayedCategories = categories.map((cat) => display(cat));

  return (
    <section className={className}>
      <h3>So ist das Programm aufgeteilt:</h3>
      <FrequencyPieChart
        elems={displayedCategories}
        startColor={{ r: 122, g: 135, b: 120 }}
        endColor={{ r: 210, g: 221, b: 208 }}
      />
    </section>
  );
};

export default styled(ProgramChart)`
  background-color: white;
`;
