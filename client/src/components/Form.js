import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useState } from 'react';

import { isValidMember } from '../lib/validateFunctions';

export default function Form({ submitFunction }) {
  //Variables
  const initialMember = {
    firstName: '',
    lastName: '',
    description: '',
    group: '',
  };

  const [member, setMember] = useState(initialMember);
  console.log(member);

  const [isError, setIsError] = useState(false);
  const [wasSuccessful, setWasSuccessful] = useState(false);

  //Functions
  function handleChange(event) {
    const field = event.target;
    const value = field.value;
    setMember({ ...member, [field.name]: value });
  }

  function clickHandler(event) {
    event.preventDefault();
    if (isValidMember(member)) {
      submitFunction(member);
      setMember(initialMember);
      setWasSuccessful(true);
    } else {
      setIsError(true);
    }
  }

  //JSX
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
      <div>
        {wasSuccessful && <Success>Member successfully added!</Success>}
      </div>
      <div>{isError && <Error>Please fill in all required fields!</Error>}</div>
      <div>
        <h2>Member:</h2>
        <p>
          Name: {member.firstName} {member.lastName}
        </p>
        <p>Description: {member.description}</p>
        <p>Group: {member.group}</p>
      </div>
      <div>
        <button onClick={clickHandler}>Send</button>
      </div>
    </FormStyled>
  );
}

//Styled-components
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
    width: 100%;
    background: var(--primary);
  }

  div {
    grid-column: 1 / 3;
    width: 100%;
  }

  input {
    margin: 0.5rem 0;
    width: 100%;
  }

  select {
    height: 2rem;
    margin: 0.5rem 0;
    width: 100%;
  }

  textarea {
    margin: 0.5rem 0;
    width: 100%;
  }
`;

const Success = styled.span`
  grid-column: 1 / 3;
  border: 1px solid black;
  padding: 0.5rem;
`;

//Prop-Types
Form.propTypes = {
  submitFunction: PropTypes.func,
};
