import { useState } from 'react';

export default function Searchbar({ findMember }) {
  const [searchValue, setSearchValue] = useState('');

  function changeHandler(event) {
    setSearchValue(event.target.value);
    console.log('searchValue', searchValue);
    findMember(event.target.value);
  }

  return (
    <form>
      <label htmlFor="searchbar">
        <span>Search a person</span>
      </label>
      <input
        type="text"
        id="searchbar"
        placeholder="Search a name or description"
        name="searchbar"
        onChange={changeHandler}
      />
    </form>
  );
}
