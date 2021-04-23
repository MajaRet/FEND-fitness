import React, { useState } from 'react';
import styled from 'styled-components';
import LabelButton from './../labels/LabelButton';

const FilterForm = ({ className, setFilter }) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filterTerm, setFilterTerm] = useState('');
  const [newIsChecked, setNewChecked] = useState(false);
  const [startedIsChecked, setStartedChecked] = useState(false);
  const [favoriteIsChecked, setFavoriteChecked] = useState(false);

  return (
    <div className={className}>
      <LabelButton onClick={() => setFiltersVisible(!filtersVisible)}>
        Filter
      </LabelButton>
      {filtersVisible ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setFilter({
              filterTerm,
              newIsChecked,
              startedIsChecked,
              favoriteIsChecked,
            });
          }}
        >
          <div className="inputs">
            <input
              type="text"
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
            />
            <div className="checkboxes">
              <div className="checkbox">
                <label htmlFor="new">Neu</label>
                <input
                  type="checkbox"
                  checked={newIsChecked}
                  name="new"
                  id="new"
                  onChange={() => setNewChecked(!newIsChecked)}
                />
              </div>
              <div className="checkbox">
                <label htmlFor="started">Gestartet</label>
                <input
                  type="checkbox"
                  checked={startedIsChecked}
                  name="started"
                  id="started"
                  onChange={() => setStartedChecked(!startedIsChecked)}
                />
              </div>
              <div className="checkbox">
                <label htmlFor="favorite">Favorit</label>
                <input
                  type="checkbox"
                  checked={favoriteIsChecked}
                  name="favorite"
                  id="favorite"
                  onChange={() => setFavoriteChecked(!favoriteIsChecked)}
                />
              </div>
            </div>
          </div>
          <input type="submit" value="Filtern" />
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

      background-color: ${(props) => props.theme.backgroundSecondary};
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
