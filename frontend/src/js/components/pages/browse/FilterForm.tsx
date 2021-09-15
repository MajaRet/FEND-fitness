import React, { useState } from 'react';
import styled from 'styled-components';

import { Filter, DifficultyFilter } from '../../../types/BrowseTypes';

import display from '../../../util/naming';
import LabelButton from '../../elements/labels/LabelButton';

function handleFilterSubmit(
  setFilter: (filter: Filter) => void,
  filterTerm: string,
  minDurationFilter: string,
  maxDurationFilter: string,
  difficultyFilter: DifficultyFilter,
  favoriteFilter: boolean
) {
  const keyword = filterTerm ? `${filterTerm}` : '';
  const maxDuration = maxDurationFilter ? parseInt(maxDurationFilter, 10) : -1;
  const minDuration = minDurationFilter ? parseInt(minDurationFilter, 10) : -1;
  const difficulty = difficultyFilter || '';
  const favorite = favoriteFilter || false;

  const filter: Filter = {
    keyword,
    maxDuration,
    minDuration,
    difficulty,
    favorite,
  };

  setFilter(filter);
}

const StyledFilterForm = styled.div`
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

    .checkbox {
      display: flex;
      column-gap: 5px;
      align-items: center;
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

interface FilterFormProps {
  setFilter: (filter: Filter) => void;
}
const FilterForm = ({ setFilter }: FilterFormProps) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filterTerm, setFilterTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>('none');
  const [maxDurationFilter, setMaxDurationFilter] = useState('');
  const [minDurationFilter, setMinDurationFilter] = useState('');
  const [favoriteFilter, setFavoriteFilter] = useState(false);

  return (
    <StyledFilterForm>
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
              difficultyFilter,
              favoriteFilter
            );
          }}
        >
          <div className="inputs">
            <label htmlFor="filterTerm">Stichwort</label>
            <input
              type="text"
              id="filterTerm"
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
                setDifficultyFilter(e.target.value as DifficultyFilter);
              }}
              id="difficultySelection"
              name="difficultySelection"
            >
              <option value="all">Alle</option>
              <option value="beginner">{display('beginner')}</option>
              <option value="intermediate">{display('intermediate')}</option>
              <option value="hard">{display('hard')}</option>
            </select>
            <div className="checkbox favorite">
              <input
                id="favoriteCheckbox"
                name="favoriteCheckbox"
                type="checkbox"
                checked={favoriteFilter}
                onChange={(e) => {
                  setFavoriteFilter(e.target.checked);
                }}
              />
              <label htmlFor="favoriteCheckbox">Favorit</label>
            </div>
            <input type="submit" value="Filtern" />
          </div>
        </form>
      ) : null}
    </StyledFilterForm>
  );
};

export default FilterForm;
