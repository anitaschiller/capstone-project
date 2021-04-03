import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useState } from 'react';

import ErrorMessage from '../components/ErrorMessage';
import Member from '../components/Member';

export default function Home({
  members,
  onOpenModal,
  availableGroups,
  deleteGroup,
  cantDeleteGroup,
}) {
  const orderedMembers = members.slice().sort(compareFirstName);
  const [groupValue, setGroupValue] = useState('');
  const [renderedGroups, setRenderedGroups] = useState(availableGroups ?? []);

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
    const fieldValue = event.target.value;
    setGroupValue(fieldValue);
    const searchedGroup = availableGroups.filter(
      (group) => group === fieldValue
    );
    setRenderedGroups(searchedGroup);
  }

  return (
    <>
      <h2>Home</h2>
      <GroupFilter>
        <label htmlFor="group">Filter group:</label>
        <select id="group" value={groupValue} onChange={filterGroups}>
          <option>Please select...</option>
          {availableGroups.map((group) => (
            <option>{group}</option>
          ))}
        </select>
        <span onClick={() => setRenderedGroups(availableGroups)}>&times;</span>
      </GroupFilter>
      {renderedGroups.map((group) => (
        <GroupWrapper>
          <GroupHeadline>
            {group}
            <Delete onClick={() => deleteGroup(group)}>&times;</Delete>
          </GroupHeadline>
          {cantDeleteGroup === group && (
            <ErrorMessage text="Please add remaining members to other groups first!" />
          )}
          {orderedMembers
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

const GroupFilter = styled.form`
  margin: 1rem 0;

  label {
    color: var(--grey);
    margin-right: 0.5rem;
    font-size: 1.1rem;
  }

  select {
    border: var(--grey) solid 1px;
    border-radius: 5px;
    height: 1.3rem;
    margin: 0 0.5rem 0 0;
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
