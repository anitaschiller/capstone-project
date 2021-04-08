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
  const [renderedGroups, setRenderedGroups] = useState(availableGroups ?? []);
  console.log({ renderedGroups });
  const [renderedMembers, setRenderedMembers] = useState(orderedMembers ?? []);
  const renderedGroupNames = renderedGroups.map((group) => group.name);

  //const memberGroupNames = orderedMembers.map((member) => {member.group);
  //console.log('memberGroupNames', memberGroupNames);
  const groupNames = availableGroups.map((group) => group.name);
  console.log('groupNames', groupNames);
  let testArray1 = groupNames.slice();
  console.log(testArray1);

  const test = testArray1.map((group) => {
    orderedMembers.filter((member) => member.group === group);
    /*  .flatMap((member) => member); */
  });
  console.log('test', test);

  /* [
    {
      _id: 123
      members: [{ name: ''}]
    }
  ] */

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

  function findMember(searchValue) {
    const currentSearchValue = searchValue.toLowerCase();

    if (currentSearchValue !== '') {
      // 1. Schritt -> filteredGroups (alle Gruppen oder eine)
      // 2. Schritt -> Über alle filteredGroups iterien
      // 3. Schritt -> Search nach members wenn searchValue !== ''
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
      console.log('fittingMembers', fittingMembers);

      const fittingMemberGroups = fittingMembers.map((member) => member.group);
      console.log('fittingMemberGroups', fittingMemberGroups);

      const fittingGroups = fittingMemberGroups.filter((group) => {
        if (renderedGroupNames.includes(group)) {
          return group;
        }
      });

      /*  const fittingGroups = fittingMembers
        .map((member) => member.group)
        .filter((group) => {
          if (renderedGroups.includes(group)) {
            return group;
          }
        }); */
      console.log('fittingGroups', fittingGroups);

      const uniqueFittingGroups = [...new Set(fittingGroups)];
      console.log('uniqueFittingGroups', uniqueFittingGroups);
      /*     debugger; */
      setRenderedMembers(fittingMembers);
      //setRenderedGroups(uniqueFittingGroups);
    } else {
      setRenderedMembers(orderedMembers);
      //setRenderedGroups(availableGroups);
    }
  }

  return (
    <>
      <h2>Home</h2>
      <Searchbar
        findMember={findMember}
        availableGroups={availableGroups}
        setRenderedGroups={setRenderedGroups}
      />
      {renderedGroups.map((group, index) => (
        <GroupWrapper key={index}>
          <GroupHeadline>
            {group.name ?? group}
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
