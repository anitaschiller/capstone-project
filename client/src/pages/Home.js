import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useState } from 'react';

import ErrorMessage from '../components/ErrorMessage';
import { FilterDeleteIcon } from '../icons/FilterDeleteIcon';
import Member from '../components/Member';
import Searchbar from '../components/Searchbar';
import { useEffect } from 'react';

export default function Home({
  members,
  onOpenModal,
  availableGroups,
  deleteGroup,
  /* canDeleteGroup, */
  setShowHomeIcon,
  undeletableGroup,
}) {
  const orderedMembers = members.slice().sort(compareFirstName);
  const [groupValue, setGroupValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [renderedGroups, setRenderedGroups] = useState(availableGroups ?? []);
  const [renderedMembers, setRenderedMembers] = useState(orderedMembers ?? []);

  useEffect(() => {
    setRenderedMembers(members);
  }, [members]);

  useEffect(() => {
    setRenderedGroups(availableGroups);
  }, [availableGroups]);

  useEffect(() => {
    findMember(searchValue);
  }, [searchValue]);

  function compareFirstName(a, b) {
    if (a.firstName === b.firstName) {
      return 0;
    } else if (a.firstName < b.firstName) {
      return -1;
    } else {
      return 1;
    }
  }

  function filterGroups(event) {
    setGroupValue(event.target.value);
    event.preventDefault();
    if (event.target.value === 'Please select...') {
      setRenderedGroups(availableGroups);
    } else {
      const searchedGroup = availableGroups.filter(
        (group) => group === event.target.value
      );
      setRenderedGroups(searchedGroup);
    }
  }

  function findMember(searchValue) {
    const currentSearchValue = searchValue.toLowerCase();

    if (currentSearchValue !== '') {
      const fittingMembers = orderedMembers.filter((member) => {
        const memberFirstName = member.firstName.toLowerCase();
        const memberLastName = member.lastName.toLowerCase();
        const memberDescription = member.description.toLowerCase();
        if (
          memberFirstName.includes(currentSearchValue) ||
          memberLastName.includes(currentSearchValue) ||
          memberDescription.includes(currentSearchValue)
        ) {
          return member;
        }
      });

      const fittingGroups = fittingMembers
        .map((member) => member.group)
        .filter((group) => {
          if (renderedGroups.includes(group)) {
            return group;
          }
        });

      const uniqueFittingGroups = [...new Set(fittingGroups)];

      setRenderedMembers(fittingMembers);
      setRenderedGroups(uniqueFittingGroups);
    } else {
      setRenderedMembers(orderedMembers);
      setRenderedGroups(availableGroups);
    }
  }

  function removeFilters() {
    setSearchValue('');
    setGroupValue('');
  }

  return (
    <>
      <h2>Home</h2>
      <FilterSection>
        <Searchbar
          findMember={findMember}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
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
      </FilterSection>
      {renderedGroups.map((group, index) => (
        <GroupWrapper key={index}>
          <GroupHeadline>
            {group.name}
            <Delete onClick={() => deleteGroup(group)}>&times;</Delete>
          </GroupHeadline>
          {undeletableGroup === group && (
            <ErrorMessage text="Please add remaining members to other groups first!" />
          )}
          {renderedMembers
            .filter((member) => member.group === group.name)
            .map((member) => (
              <Member
                key={member._id}
                member={member}
                onOpenModal={() => onOpenModal(member._id)}
                setShowHomeIcon={setShowHomeIcon}
              />
            ))}
        </GroupWrapper>
      ))}
    </>
  );
}

const FilterDeleteStyled = styled(FilterDeleteIcon)`
  color: #000000;
  transform: scale(0.7);
  position: absolute;
  top: 25%;
  right: 3%;
`;

const FilterSection = styled.form`
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

const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const GroupHeadline = styled.h3`
  color: var(--secondary);
  margin: 0.5rem 0;
`;

const Delete = styled.span`
  color: var(--signal);
  margin-left: 1rem;
`;

Home.propTypes = {
  members: PropTypes.array,
  onOpenModal: PropTypes.func,
};
