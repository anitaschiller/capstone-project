import styled from 'styled-components';
import { useState } from 'react';
import { v4 as uuid4 } from 'uuid';
export default function Details({ member, updateMember, members }) {
  console.log('member', member); //"alter" Wert nach dem Generieren

  const initialEntry = {
    date: '',
    title: '',
    remember: '',
  };

  const [entry, setEntry] = useState(initialEntry);

  const [entries, setEntries] = useState([]);

  const newMember = members.filter((newMember) => newMember.id === member.id); //das aktualisierte Members Array wird gefiltert und das aktuelle Member herausgesucht; diese Daten werden unten verwendet, um die Entry Karten zu generieren
  console.log('newMember', newMember);
  console.log('entries', newMember[0].entries);

  function changeHandler(event) {
    const field = event.target;
    const value = field.value;
    setEntry({ ...entry, [field.name]: value });
  }

  function submitHandler(event) {
    event.preventDefault();

    const newEntry = { ...entry, id: uuid4() }; //create id to each entry
    setEntries([...entries, newEntry]); //push entry in entries Array
    setEntry(initialEntry); //reset entry

    const updatedMember = { ...member, entries: entries }; //add entries to member
    console.log('updatedMember', updatedMember);
    updateMember(updatedMember); //schickt den updatedMember an die App js, dort wird dieser member im members Array ausgetauscht --> weiter geht es mit newMember
  }

  return (
    <>
      <DetailsHeader>
        <DetailsHeadline>
          {member.firstName} {member.lastName}
        </DetailsHeadline>
        <DetailsGroup>{member.group}</DetailsGroup>
        <p>{member.description}</p>
      </DetailsHeader>
      <FormStyled>
        <h3>New Entry</h3>
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
        <button onClick={submitHandler}>SAVE</button>
      </FormStyled>
      {newMember[0].entries &&
        newMember[0].entries.map((entry) => <div>{entry.title}</div>)}
    </>
  );
}

const DetailsHeader = styled.div`
  border-bottom: var(--font) solid 1px;
  padding: 0 0 0.5rem 0;
`;

const DetailsHeadline = styled.h2`
  margin: 0;
`;

const DetailsGroup = styled.p`
  color: #a8a8a8;
  font-style: italic;
  margin: 0.4rem 0;
`;

const FormStyled = styled.form`
  display: flex;
  border-bottom: var(--font) solid 1px;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem 0 1.5rem 0;

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
