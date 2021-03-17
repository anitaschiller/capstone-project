import styled from 'styled-components';
import { useState } from 'react';

export default function Details({ member }) {
  const initialEntry = {
    date: '',
    title: '',
    remember: [],
  };

  const [entry, setEntry] = useState(initialEntry);
  console.log(entry);

  function changeHandler(event) {
    const field = event.target;
    const value = field.value;
    setEntry({ ...entry, [field.name]: value });
  }

  return (
    <div>
      <h2>
        {member.firstName} {member.lastName}
      </h2>
      <p>{member.group}</p>
      <p>{member.description}</p>
      <h3>New Entry</h3>
      <FormStyled>
        <label htmlFor="date">Date</label>
        <input
          type="text"
          name="date"
          value={entry.date}
          onChange={changeHandler}
        />
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={entry.title}
          onChange={changeHandler}
        />
        <label htmlFor="remember">Remember</label>
        <input
          type="text"
          name="remember"
          value={entry.remember}
          onChange={changeHandler}
        />
      </FormStyled>
    </div>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

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
    font-size: small;
  }
`;
