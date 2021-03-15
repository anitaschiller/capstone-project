import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useState } from 'react';

import { isValidMember } from '../lib/validateFunctions';

export default function Form({ submitFunction }) {
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
    } else {
      setIsError(true);
    }
  }

  return (
    <FormStyled>
      <div>
        <label htmlFor="first-name">First name*:</label>
        <input
          type="text"
          name="firstName"
          id="first-name"
          value={member.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="last-name">Last name*:</label>
        <input
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
        <select
          name="group"
          id="group"
          value={member.group}
          onChange={handleChange}
        >
          <option>Please select...</option>
          <option>School</option>
          <option>Work</option>
          <option>Neue Fische</option>
        </select>
      </div>

      {wasSuccessful && <Success>Member successfully added!</Success>}

      {isError && <Error>Please fill in all required fields!</Error>}
      <div>
        <button onClick={submitHandler}>SAVE</button>
      </div>
    </FormStyled>
  );
}

const Error = styled.span`
  border: 1px solid red;
  color: red;
  padding: 0.5rem;
`;

const FormStyled = styled.form`
  display: grid;
  grid-template-columns: 55% auto;
  grid-gap: 1rem;

  button {
    font-size: 14px;
    color: white;
    background: var(--primary);
    padding: 0.3rem;
    width: 100%;
  }

  div {
    grid-column: 1 / 3;
    width: 100%;
  }

  input {
    border: #a8a8a8 solid 1px;
    border-radius: 5px;
    height: 1.5rem;
    margin: 0.5rem 0;
    width: 100%;
  }

  label {
    color: var(--font);
  }

  select {
    border: #a8a8a8 solid 1px;
    border-radius: 5px;
    height: 1.5rem;
    margin: 0.5rem 0;
    width: 100%;
  }

  span {
    grid-column: 1 / 3;
    justify-self: center;
  }

  textarea {
    border: #a8a8a8 solid 1px;
    border-radius: 5px;
    margin: 0.5rem 0;
    width: 100%;
  }
`;

const Success = styled.span`
  border: 1px solid black;
  padding: 0.5rem;
`;

Form.propTypes = {
  submitFunction: PropTypes.func,
};
