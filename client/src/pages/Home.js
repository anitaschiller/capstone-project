import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useState, useEffect } from 'react';

import ErrorMessage from '../components/ErrorMessage';
import Member from '../components/Member';
import Searchbar from '../components/Searchbar';

export default function Home({
  members,
  onOpenModal,
  availableGroups,
  deleteGroup,
  setShowHomeIcon,
  undeletableGroup,
}) {
  const orderedMembers = members.slice().sort(compareFirstName);
  const availableGroupNames = availableGroups.map((group) => group.name);
  const [renderedGroups, setRenderedGroups] = useState(
    availableGroupNames ?? []
  );
  const [renderedMembers, setRenderedMembers] = useState(orderedMembers ?? []);

  useEffect(() => {
    setRenderedMembers(members);
  }, [members]);

  useEffect(() => {
    setRenderedGroups(availableGroupNames);
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
      setRenderedGroups(availableGroupNames);
    }
  }

  return (
    <>
      <h2>Home</h2>
      <Searchbar
        findMember={findMember}
        availableGroupNames={availableGroupNames}
        setRenderedGroups={setRenderedGroups}
        setRenderedMembers={setRenderedMembers}
        orderedMembers={orderedMembers}
      />
      {renderedGroups.map((group, index) => (
        <GroupWrapper key={index}>
          <GroupHeadline data-testid="group-headline">
            {group}
            <Delete onClick={() => deleteGroup(group)}>&times;</Delete>
          </GroupHeadline>
          {undeletableGroup === group && (
            <ErrorMessage text="Please add remaining members to other groups first!" />
          )}
          {renderedMembers
            .filter((member) => member.group === group)
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
  availableGroups: PropTypes.array,
  deleteGroup: PropTypes.func,
  setShowHomeIcon: PropTypes.func,
  undeletableGroup: PropTypes.string,
};
