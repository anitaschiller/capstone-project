export default function Searchbar({ findMember, searchValue, setSearchValue }) {
  function changeHandler(event) {
    setSearchValue(event.target.value);
    findMember(event.target.value);
  }

  return (
    <>
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
    </>
  );
}
