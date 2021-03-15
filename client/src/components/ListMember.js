import styled from 'styled-components';
import { Pen } from '../icons/Pen';
import { Trashbin } from '../icons/Trashbin';

export default function ListMember({ member }) {
  return (
    <Member>
      {member.firstName} {member.lastName} <PenStyled /> <TrashbinStyled />
    </Member>
  );
}

const Member = styled.div`
  background: white;
  border-radius: 5px;
  margin: 0.3rem 0;
  padding: 1rem;
  position: relative;
`;

const PenStyled = styled(Pen)`
  color: var(--font);
  transform: scale(0.8);
  position: absolute;
  right: 2.7rem;
  bottom: 0.8rem;
`;

const TrashbinStyled = styled(Trashbin)`
  color: #bc1616;
  transform: scale(0.8);
  position: absolute;
  right: 1rem;
  bottom: 0.8rem;
`;
