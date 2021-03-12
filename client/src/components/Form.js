import { useState } from 'react';
import styled from 'styled-components';

export default function Form() {
  const initialMember = {
    firstName: '',
    lastName: '',
    description: '',
    group: '',
  };

  const [member, setMember] = useState(initialMember);
  console.log(member);

  function handleChange(event) {
    const field = event.target;
    const value = field.value;
    setMember({ ...member, [field.name]: value });
  }

  return (
    <FormStyled>
      <div>
        <label htmlFor="first-name">First name:</label>
        <input
          type="text"
          name="firstName"
          id="first-name"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="last-name">Last name:</label>
        <input
          type="text"
          name="lastName"
          id="last-name"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea name="description" id="description" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="group">Group:</label>
        <select name="group" id="group" onChange={handleChange}>
          <option>School</option>
          <option>Work</option>
          <option>Neue Fische</option>
        </select>
      </div>
      <div>
        <h2>Member:</h2>
        <p>
          Name: {member.firstName} {member.lastName}
        </p>
        <p>Description: {member.description}</p>
        <p>Group: {member.group}</p>
      </div>
      <div>
        <button>Send</button>
      </div>
    </FormStyled>
  );
}

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
