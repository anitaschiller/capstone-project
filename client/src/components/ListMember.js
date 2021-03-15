import styled from 'styled-components';

export default function ListMember({ member }) {
  return (
    <Member>
      {member.firstName} {member.lastName}
    </Member>
  );
}

const Member = styled.div`
  padding: 1rem 0;
`;
