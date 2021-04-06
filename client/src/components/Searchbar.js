import PropTypes from 'prop-types';
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

  useEffect(() => {
    findMember(searchValue);
  }, [searchValue]);

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
        <span>Search person: </span>
      </label>
      <input
        type="text"
        id="searchbar"
        placeholder="Search a name or description"
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
  color: var(--grey);
  transform: scale(0.7);

  position: absolute;
  top: 0;
  right: 0;
`;

const FilterWrapper = styled.form`
  position: relative;
`;
