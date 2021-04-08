import styled from 'styled-components/macro';
import { useState, useEffect } from 'react';

import { FilterDeleteIcon } from '../icons/FilterDeleteIcon';

export default function Searchbar({
  findMember,
  availableGroups,
  setRenderedGroups,
}) {
  const [groupValue, setGroupValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  /* useEffect(() => {
    findMember(searchValue);
  }, [searchValue]); */

  function changeHandler(event) {
    setSearchValue(event.target.value);
    findMember(event.target.value);
  }

  function filterGroups(event) {
    setGroupValue(event.target.value);
    event.preventDefault();
    if (event.target.value === 'Please select...') {
      setRenderedGroups(availableGroups);
    } else {
      const searchedGroup = availableGroups.filter(
        (group) => group.name === event.target.value
      );
      console.log('searchedGroup', searchedGroup);
      setRenderedGroups(searchedGroup);
    }
  }

  function removeFilters() {
    setSearchValue('');
    setGroupValue('');
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
      />
      <label>Filter group:</label>
      <select value={groupValue} onChange={filterGroups}>
        <option>Please select...</option>
        {availableGroups.map((group) => (
          <option key={group._id}>{group.name}</option>
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
