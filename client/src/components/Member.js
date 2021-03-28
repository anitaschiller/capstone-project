import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components/macro';

import { EditIcon } from '../icons/EditIcon';
import { DeleteIcon } from '../icons/DeleteIcon';

export default function Member({ member, onOpenModal }) {
  const firstName = `${member.firstName}`;
  const firstNameLowerCase = firstName.toLowerCase();
  const lastName = `${member.lastName}`;
  const lastNameLowerCase = lastName.toLowerCase();
  const fullName = `${firstNameLowerCase}${lastNameLowerCase}`;

  let { url } = useRouteMatch();

  return (
    <>
      <MemberStyled>
        {member.firstName} {member.lastName}
        {
          <Link
            to={{
              pathname: url + `${fullName}`,
              state: { member },
            }}
          >
            <EditIconStyled />
          </Link>
        }
        <span onClick={onOpenModal}>
          <DeleteIconStyled />
        </span>
      </MemberStyled>
    </>
  );
}

const MemberStyled = styled.div`
  background: var(--white);
  border-radius: 5px;
  margin: 0.3rem 0;
  padding: 1rem;
  position: relative;
`;

const EditIconStyled = styled(EditIcon)`
  color: var(--grey);
  transform: scale(0.8);
  position: absolute;
  right: 2.7rem;
  bottom: 0.8rem;
`;

const DeleteIconStyled = styled(DeleteIcon)`
  color: var(--signal);
  transform: scale(0.8);
  position: absolute;
  right: 1rem;
  bottom: 0.8rem;
`;
