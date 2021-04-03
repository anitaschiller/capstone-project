import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useState } from 'react';

import ErrorMessage from '../components/ErrorMessage';
import { isValidMember } from '../lib/validateFunctions';
import NewGroup from '../components/NewGroup';

export default function Form({ submitFunction, availableGroups, addGroup }) {
  const initialMember = {
    firstName: '',
    lastName: '',
    description: '',
    group: '',
  };

  const [member, setMember] = useState(initialMember);
  const [isError, setIsError] = useState(false);
  const [wasSuccessful, setWasSuccessful] = useState(false);

  function handleChange(event) {
    const field = event.target;
    const value = field.value;
    setMember({ ...member, [field.name]: value });
  }

  function submitHandler(event) {
    event.preventDefault();
    if (isValidMember(member)) {
      submitFunction(member);
      setMember(initialMember);

      setWasSuccessful(true);
      setIsError(false);
      setTimeout(function () {
        setWasSuccessful(false);
      }, 3000);
    } else {
      setIsError(true);

      setTimeout(function () {
        setIsError(false);
      }, 3000);
    }
  }

  return (
    <FormStyled>
      <div>
        <label htmlFor="first-name">First name*:</label>
        <Input
          type="text"
          name="firstName"
          id="first-name"
          value={member.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="last-name">Last name*:</label>
        <Input
          type="text"
          name="lastName"
          id="last-name"
          value={member.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          value={member.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="group">Group*:</label>
        <div>
          <select
            name="group"
            id="group"
            value={member.group}
            onChange={handleChange}
          >
            <option>Please select...</option>
            {availableGroups.map((group) => (
              <option>{group}</option>
            ))}
          </select>
          <NewGroup addGroup={addGroup} />
        </div>
      </div>

      {wasSuccessful && <Success>Member successfully added!</Success>}

      {isError && <ErrorMessage text="Please fill in all required fields!" />}
      <div>
        <Button onClick={submitHandler}>SAVE</Button>
      </div>
    </FormStyled>
  );
}

const Button = styled.button`
  font-size: 14px;
  color: var(--white);
  background: var(--primary);
  padding: 0.3rem;
  width: 100%;
`;

const FormStyled = styled.form`
  display: grid;
  grid-template-columns: 55% auto;
  grid-gap: 1rem;

  div {
    grid-column: 1 / 3;
    width: 100%;
  }

  label {
    color: var(--grey);
  }

  select {
    border: var(--grey) solid 1px;
    border-radius: 5px;
    height: 1.5rem;
    margin: 0.5rem 0;
    width: 88%;
  }

  span {
    grid-column: 1 / 3;
    justify-self: center;
  }

  textarea {
    border: var(--grey) solid 1px;
    border-radius: 5px;
    margin: 0.5rem 0;
    width: 100%;
  }
`;

const Input = styled.input`
  border: var(--grey) solid 1px;
  border-radius: 5px;
  height: 1.5rem;
  margin: 0.5rem 0;
  width: 100%;
`;

const Success = styled.span`
  border: 1px solid #000000;
  padding: 0.5rem;
`;

Form.propTypes = {
  submitFunction: PropTypes.func,
};
