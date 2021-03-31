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
  canDeleteGroup,
}) {
  console.log('availableGroups', availableGroups);
  const orderedMembers = members.slice().sort(compareFirstName);
  const [groupValue, setGroupValue] = useState('');
  console.log('groupValue', groupValue);
  const [renderedGroups, setRenderedGroups] = useState(availableGroups ?? []);
  const [renderedMembers, setRenderedMembers] = useState(orderedMembers ?? []);

  useEffect(() => {
    setRenderedMembers(members);
  }, [members]);

  useEffect(() => {
    setRenderedGroups(availableGroups);
  }, [availableGroups]);

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
    console.log('currentSearchValue', currentSearchValue);

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

      const fittingMembersGroups = fittingMembers.map((member) => member.group);

      const uniqueFittingMembersGroups = [...new Set(fittingMembersGroups)];
      console.log('uniquefittingMembersGroups', uniqueFittingMembersGroups);

      setRenderedMembers(fittingMembers);
      setRenderedGroups(uniqueFittingMembersGroups);
    } else {
      setRenderedMembers(orderedMembers);
      setRenderedGroups(availableGroups);
    }
  }

  return (
    <>
      <h2>Home</h2>
      <FilterSection>
        <Searchbar findMember={findMember} />
        <label>Filter group:</label>
        <select value={groupValue} onChange={filterGroups}>
          <option>Please select...</option>
          {availableGroups.map((group) => (
            <option>{group}</option>
          ))}
        </select>
        <FilterDeleteStyled />
      </FilterSection>
      {/* <span onClick={() => setRenderedGroups(availableGroups)}>&times;</span> */}
      {renderedGroups.map((group) => (
        <GroupWrapper>
          <GroupHeadline>
            {group}
            <Delete onClick={() => deleteGroup(group)}>&times;</Delete>
          </GroupHeadline>
          {!canDeleteGroup && (
            <ErrorMessage text="Please add the members below to other groups first!" />
          )}
          {renderedMembers
            .filter((member) => member.group === group)
            .map((member) => (
              <Member
                key={member.id}
                member={member}
                onOpenModal={() => onOpenModal(member.id)}
              />
            ))}
        </GroupWrapper>
      ))}
    </>
  );
}

const FilterDeleteStyled = styled(FilterDeleteIcon)`
  color: var(--grey);
  transform: scale(0.7);

  position: absolute;
  top: 0;
  right: 0;
`;

const FilterSection = styled.section`
  position: relative;
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
