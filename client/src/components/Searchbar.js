export default function Searchbar({ findMember, searchValue, setSearchValue }) {
  function changeHandler(event) {
    setSearchValue(event.target.value);
    console.log('searchValue', searchValue);
    findMember(event.target.value);
  }

  return (
    <form>
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
    </form>
  );
}
