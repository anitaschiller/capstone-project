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

  button {
    width: 100%;
  }

  div {
    grid-column: 1 / 3;
    width: 100%;
  }

  input {
    width: 100%;
  }

  select {
    width: 100%;
  }

  textarea {
    width: 100%;
  }
`;
