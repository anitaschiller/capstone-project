import styled from 'styled-components/macro';
import { useState } from 'react';
import { PlusIcon } from '../icons/PlusIcon';

export default function NewGroup({ addGroup }) {
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [groupValue, setGroupValue] = useState('');

  function submitHandler(event) {
    event.preventDefault();
    addGroup(groupValue);
    setGroupValue('');
  }

  return (
    <Wrapper>
      <span onClick={() => setIsUnfolded(!isUnfolded)}>
        <PlusIconStyled />
      </span>

      {isUnfolded && (
        <StyledForm>
          {/*   <label>Add a new group:</label> */}
          <input
            type="text"
            name="new-group"
            placeholder=" New Group"
            value={groupValue}
            onChange={(event) => setGroupValue(event.target.value)}
          />
          <button onClick={submitHandler}>ADD</button>
        </StyledForm>
      )}
    </Wrapper>
  );
}

const PlusIconStyled = styled(PlusIcon)`
  color: var(--primary);
  transform: scale(0.7);
  position: absolute;
  top: -40px;
  right: -5px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  button {
    align-self: center;
    font-size: 0.8rem;
    width: 25%;
    height: 1.5rem;
    padding: 0;
  }

  input {
    border: var(--grey) solid 1px;
    border-radius: 5px;
    height: 1.5rem;
    margin: 0.5rem 0;
    width: 70%;
  }
`;
