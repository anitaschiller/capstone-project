import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useState } from 'react';

import { FilterDeleteIcon } from '../icons/FilterDeleteIcon';

export default function Searchbar({
  findMember,
  availableGroupNames,
  setRenderedGroups,
  setRenderedMembers,
  orderedMembers,
}) {
  const [groupValue, setGroupValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  function changeHandler(event) {
    setSearchValue(event.target.value);
    findMember(event.target.value);
  }

  function filterGroups(event) {
    setGroupValue(event.target.value);
    event.preventDefault();
    if (event.target.value === 'Please select...') {
      setRenderedGroups(availableGroupNames);
    } else {
      const searchedGroup = availableGroupNames.filter(
        (group) => group === event.target.value
      );
      setRenderedGroups(searchedGroup);
    }
  }

  function removeFilters() {
    setGroupValue('');
    setRenderedGroups(availableGroupNames);
    setSearchValue('');
    setRenderedMembers(orderedMembers);
  }

  return (
    <FilterWrapper>
      <label htmlFor="searchbar">
        <span>Search member: </span>
      </label>
      <input
        type="text"
        id="searchbar"
        placeholder=" Search for a name or description..."
        name="searchbar"
        onChange={changeHandler}
        value={searchValue}
        data-testid="searchbar-input"
      />
      <label>Filter group:</label>
      <select
        data-testid="groupfilter-select"
        value={groupValue}
        onChange={filterGroups}
      >
        <option>Please select...</option>
        {availableGroupNames.map((group, index) => (
          <option key={index}>{group}</option>
        ))}
      </select>
      <span onClick={removeFilters}>
        <FilterDeleteStyled />
      </span>
    </FilterWrapper>
  );
}

const FilterDeleteStyled = styled(FilterDeleteIcon)`
  color: #000000;
  transform: scale(0.7);
  position: absolute;
  top: 25%;
  right: 3%;
`;

const FilterWrapper = styled.form`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 0.7rem;
  background: #b1bded;
  border-radius: 5px;
  margin: 2rem 0;
  padding: 1rem 1rem 0.6rem 1rem;
  label {
    font-size: 12px;
    align-self: center;
    font-weight: bold;
  }
  input,
  select {
    border: solid 1px var(--grey);
    border-radius: 5px;
    height: 1.5rem;
    width: 80%;
  }
`;

Searchbar.propTypes = {
  findMember: PropTypes.func,
  availableGroupNames: PropTypes.array,
  setRenderedGroups: PropTypes.func,
  setRenderedMembers: PropTypes.func,
  orderedMembers: PropTypes.array,
};
