import React, { useState } from 'react';
import styled from 'styled-components';
import display from '../../naming';
import LabelButton from './../labels/LabelButton';

function handleFilterSubmit(
  setFilter,
  filterTerm,
  minDurationFilter,
  maxDurationFilter,
  difficultyFilter
) {
  const filter = {};
  if (filterTerm) {
    filter.title = { matches: `*${filterTerm}*` };
  }
  if (minDurationFilter || maxDurationFilter) {
    filter.duration = {};
    if (minDurationFilter) {
      filter.duration.gte = parseInt(minDurationFilter, 10) || 0;
    }
    if (maxDurationFilter) {
      filter.duration.lte =
        parseInt(maxDurationFilter, 10) || Number.MAX_SAFE_INTEGER;
    }
  }
  if (difficultyFilter !== 'none') {
    filter.difficulty = { eq: difficultyFilter };
  }

  setFilter(filter);
}

const FilterForm = ({ className, setFilter }) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filterTerm, setFilterTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('none');
  const [maxDurationFilter, setMaxDurationFilter] = useState('');
  const [minDurationFilter, setMinDurationFilter] = useState('');

  return (
    <div className={className}>
      <LabelButton onClick={() => setFiltersVisible(!filtersVisible)}>
        Filter
      </LabelButton>
      {filtersVisible ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFilterSubmit(
              setFilter,
              filterTerm,
              minDurationFilter,
              maxDurationFilter,
              difficultyFilter
            );
          }}
        >
          <div className="inputs">
            <input
              type="text"
              value={filterTerm}
              onChange={(e) => {
                setFilterTerm(e.target.value);
              }}
            />
            <label htmlFor="minDuration">Minimale Dauer</label>

            <input
              type="number"
              id="minDuration"
              name="minDuration"
              min="0"
              value={minDurationFilter}
              onChange={(e) => setMinDurationFilter(e.target.value)}
            ></input>
            <label htmlFor="maxDuration">Maximale Dauer</label>

            <input
              type="number"
              id="maxDuration"
              name="maxDuration"
              min="0"
              value={maxDurationFilter}
              onChange={(e) => setMaxDurationFilter(e.target.value)}
            ></input>
            <label htmlFor="difficultySelection">Schwierigkeitsgrad</label>
            <select
              value={difficultyFilter}
              onChange={(e) => {
                setDifficultyFilter(e.target.value);
              }}
              id="difficultySelection"
              name="difficultySelection"
            >
              <option value="none">Alle</option>
              <option value="beginner">${display('beginner')}</option>
              <option value="intermediate">${display('intermediate')}</option>
              <option value="hard">${display('hard')}</option>
            </select>
            <input type="submit" value="Filtern" />
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default styled(FilterForm)`
  form {
    display: flex;
    column-gap: 30px;
    align-items: center;

    margin-top: 10px;

    input[type='submit'] {
      border: none;
      border-radius: 5px;
      height: fit-content;
      padding: 10px 20px;

      background-color: ${(props) => `rgb(${props.theme.backgroundSecondary})`};
    }

    .checkboxes {
      display: flex;
      column-gap: 10px;
    }

    .checkbox label {
      margin-right: 5px;
    }

    .inputs {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
    }
  }
`;
