import { useContext } from 'react';
import styled from 'styled-components';

import { ThemeToggleContext } from '../../../context';
import FrequencyPieChart from '../../elements/charts/FrequencyPieChart';

import display from '../../../util/naming';

const StyledProgramChart = styled.section`
  background-color: ${(props) => {
    return `rgb(${props.theme.backgroundDefault})`;
  }};
`;

interface ProgramChartProps {
  categories: string[];
}

/**
 * A component that shows a pie chart depicting the relative frequencies
 * of workout categories in the given category list.
 *
 * @param {[string]} categories A list of categories
 */
const ProgramChart = ({ categories }: ProgramChartProps) => {
  const { theme } = useContext(ThemeToggleContext);
  const displayedCategories = categories.map((cat) => display(cat));

  return (
    <StyledProgramChart>
      <h3>So ist das Programm aufgeteilt:</h3>
      <FrequencyPieChart
        elems={displayedCategories}
        startColor={
          theme === 'light'
            ? { r: 122, g: 135, b: 120 }
            : { r: 80, g: 70, b: 100 }
        }
        endColor={
          theme === 'light'
            ? { r: 210, g: 221, b: 208 }
            : { r: 150, g: 140, b: 190 }
        }
      />
    </StyledProgramChart>
  );
};

export default ProgramChart;
