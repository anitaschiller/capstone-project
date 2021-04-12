import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { PlusIcon } from '../icons/PlusIcon';

export default function NewGroup({ addGroup, member, setMember, isStatic }) {
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [groupValue, setGroupValue] = useState('');

  function submitHandler(event) {
    event.preventDefault();
    addGroup(groupValue);
    setMember({ ...member, group: groupValue });
    setGroupValue('');
  }

  return (
    <Wrapper>
      <span onClick={() => setIsUnfolded(!isUnfolded)}>
        <PlusIconStyled isStatic={isStatic} />
      </span>

      {isUnfolded && (
        <InputWrapper>
          <GroupInput
            type="text"
            name="new-group"
            placeholder=" New Group"
            value={groupValue}
            onChange={(event) => setGroupValue(event.target.value)}
          />
          <GroupButton onClick={submitHandler}>ADD</GroupButton>
        </InputWrapper>
      )}
    </Wrapper>
  );
}

const PlusIconStyled = styled(PlusIcon)`
  color: var(--primary);
  transform: scale(0.7);
  position: ${(props) => (props.isStatic ? 'static' : 'absolute')};
  top: -40px;
  right: -5px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const GroupInput = styled.input`
  border: var(--grey) solid 1px;
  border-radius: 5px;
  height: 1.5rem;
  margin: 0.5rem 0;
  width: 70%;
`;

const GroupButton = styled.button`
  align-self: center;
  background: var(--primary);
  color: var(--white);
  font-size: 0.8rem;
  width: 25%;
  padding: 0.2rem;
`;

NewGroup.propTypes = {
  addGroup: PropTypes.func,
  member: PropTypes.object,
  setMember: PropTypes.func,
};
