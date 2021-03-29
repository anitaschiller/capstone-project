import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import ErrorMessage from '../components/ErrorMessage';
import Member from '../components/Member';

export default function Home({
  members,
  onOpenModal,
  availableGroups,
  deleteGroup,
  canDeleteGroup,
}) {
  const orderedMembers = members.slice().sort(compareFirstName);

  function compareFirstName(a, b) {
    if (a.firstName === b.firstName) {
      return 0;
    } else if (a.firstName < b.firstName) {
      return -1;
    } else {
      return 1;
    }
  }

  return (
    <>
      <h2>Home</h2>
      {availableGroups.map((group) => (
        <GroupWrapper>
          <GroupHeadline>
            {group}
            <Delete onClick={() => deleteGroup(group)}>&times;</Delete>
          </GroupHeadline>
          {!canDeleteGroup && (
            <ErrorMessage text="Please add the members below to other groups first!" />
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
