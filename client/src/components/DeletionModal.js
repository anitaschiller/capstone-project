import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

export default function DeletionModal({
  isStatic,
  denyDeletion,
  confirmDeletion,
}) {
  return (
    <ModalWrapper isStatic={isStatic}>
      <Message>Are you sure you want to delete this entry?</Message>
      <DenyButton onClick={denyDeletion}>Cancel</DenyButton>
      <ConfirmButton onClick={confirmDeletion}>Delete</ConfirmButton>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.3rem;
  justify-content: space-around;

  position: ${(props) => (props.isStatic ? 'static' : 'absolute')};
  bottom: 4rem;
  right: 1rem;
  left: 1rem;

  background: var(--white);
  border: var(--signal) solid 2px;
  padding: 1rem;
`;

const Message = styled.p`
  width: 100%;
`;

const DenyButton = styled.button`
  border: none;
  font-size: 0.8rem;
  padding: 0.3rem;
  width: 4rem;
`;

const ConfirmButton = styled(DenyButton)`
  color: var(--signal);
`;

DeletionModal.propTypes = {
  denyDeletion: PropTypes.func,
  confirmDeletion: PropTypes.func,
};
