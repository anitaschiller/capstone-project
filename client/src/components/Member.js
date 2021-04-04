import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { EditIcon } from '../icons/EditIcon';
import { DeleteIcon } from '../icons/DeleteIcon';

export default function Member({ member, onOpenModal, setShowHomeIcon }) {
  const firstName = `${member.firstName}`;
  const firstNameLowerCase = firstName.toLowerCase();
  const lastName = `${member.lastName}`;
  const lastNameLowerCase = lastName.toLowerCase();
  const fullName = `${firstNameLowerCase}${lastNameLowerCase}`;

  let { url } = useRouteMatch();

  return (
    <>
      <MemberStyled>
        <Portrait src={member.image} alt="" />
        <MemberName>
          {member.firstName} {member.lastName}
        </MemberName>
        <Link
          to={{
            pathname: url + `${fullName}`,
            state: { member },
          }}
          onClick={() => setShowHomeIcon(false)}
        >
          <EditIconStyled />
        </Link>

        <span onClick={onOpenModal}>
          <DeleteIconStyled />
        </span>
      </MemberStyled>
    </>
  );
}

const MemberStyled = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: row;
  background: var(--white);
  border-radius: 5px;
  margin: 0.3rem 0;
  padding: 1rem;
  position: relative;
`;

const MemberName = styled.span`
  align-self: center;
`;

const EditIconStyled = styled(EditIcon)`
  color: var(--grey);
  transform: scale(0.8);
  position: absolute;
  right: 2.7rem;
  bottom: 1.5rem;
`;

const DeleteIconStyled = styled(DeleteIcon)`
  color: var(--signal);
  transform: scale(0.8);
  position: absolute;
  right: 1rem;
  bottom: 1.5rem;
`;

const Portrait = styled.img`
  border-radius: 50%;
  width: 2.3rem;
  height: auto;
`;

Member.propTypes = {
  member: PropTypes.object,
  onOpenModal: PropTypes.func,
};
