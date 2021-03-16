import styled from 'styled-components';
import { EditIcon } from '../icons/EditIcon';
import { DeleteIcon } from '../icons/DeleteIcon';

export default function Member({ member }) {
  return (
    <MemberStyled>
      {member.firstName} {member.lastName} <EditIconStyled />{' '}
      <DeleteIconStyled />
    </MemberStyled>
  );
}

const MemberStyled = styled.div`
  background: white;
  border-radius: 5px;
  margin: 0.3rem 0;
  padding: 1rem;
  position: relative;
`;

const EditIconStyled = styled(EditIcon)`
  color: var(--font);
  transform: scale(0.8);
  position: absolute;
  right: 2.7rem;
  bottom: 0.8rem;
`;

const DeleteIconStyled = styled(DeleteIcon)`
  color: #bc1616;
  transform: scale(0.8);
  position: absolute;
  right: 1rem;
  bottom: 0.8rem;
`;
