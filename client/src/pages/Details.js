import styled from 'styled-components';
import { useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import { isValidEntry } from '../lib/validateFunctions';

import EntryCard from '../components/EntryCard';
import { UnfoldIcon } from '../icons/UnfoldIcon';

export default function Details({ member, updateMember, members }) {
  const initialEntry = {
    date: '',
    title: '',
    remember: '',
  };

  const [newMember, setNewMember] = useState(
    members.find((newMember) => newMember.id === member.id)
  );

  const [entry, setEntry] = useState(initialEntry);
  const [entries, setEntries] = useState(newMember.entries ?? []);
  const [isError, setIsError] = useState(false);
  const [isUnfolded, setIsUnfolded] = useState(false);

  function changeHandler(event) {
    const field = event.target;
    const value = field.value;
    setEntry({ ...entry, [field.name]: value });
  }

  function submitHandler(event) {
    event.preventDefault();

    if (isValidEntry(entry)) {
      //Add valid entry to entries array and set entry to initial state afterwards
      const newEntry = { ...entry, id: uuid4() };
      const memberEntries = [...entries, newEntry];
      setEntries(memberEntries);
      setEntry(initialEntry);

      //Update the newMember with the new entries and send the updatedMember to App.js
      const updatedMember = { ...newMember, entries: memberEntries };
      setNewMember(updatedMember);
      updateMember(updatedMember);
    } else {
      setIsError(true);
    }
  }

  function unfoldForm() {
    setIsUnfolded(!isUnfolded);
  }

  function deleteEntry(idToDelete) {
    const remainingEntries = newMember.entries.filter(
      (entry) => entry.id !== idToDelete
    );
    setEntries(remainingEntries);

    const updatedMember = { ...newMember, entries: remainingEntries };
    setNewMember(updatedMember);
    updateMember(updatedMember);
  }

  return (
    <>
      <DetailsHeader>
        <DetailsHeadline>
          {newMember.firstName} {newMember.lastName}
        </DetailsHeadline>
        <DetailsGroup>{newMember.group}</DetailsGroup>
        <p>{newMember.description}</p>
      </DetailsHeader>
      <FormStyled>
        <h3 onClick={unfoldForm}>
          New Entry {isUnfolded ? <FoldIconStyled /> : <UnfoldIconStyled />}
        </h3>
        {isUnfolded && (
          <>
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
          </>
        )}
        {isError && (
          <Error>Please check if all fields were filled correctly!</Error>
        )}
      </FormStyled>
      <CardContainer>
        {newMember.entries &&
          newMember.entries.map((entry) => (
            <EntryCard
              entry={entry}
              onDeleteEntry={deleteEntry}
              key={entry.id}
            />
          ))}
      </CardContainer>
    </>
  );
}

const CardContainer = styled.section`
  margin: 1rem 0 3rem 0;
`;

const DetailsHeader = styled.div`
  border-bottom: var(--grey) solid 1px;
  padding: 0 0 0.5rem 0;
`;

const DetailsHeadline = styled.h2`
  margin: 0;
`;

const DetailsGroup = styled.p`
  color: var(--grey);
  font-style: italic;
  margin: 0.4rem 0;
`;

const Error = styled.span`
  border: 1px solid var(--signal);
  color: var(--signal);
  margin-top: 0.5rem;
  padding: 0.5rem;
`;

const FormStyled = styled.form`
  display: flex;
  border-bottom: var(--grey) solid 1px;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem 0;

  button {
    font-size: 14px;
    color: var(--white);
    background: var(--primary);
    margin: 0.5rem 0;
    padding: 0.3rem;
    width: 100%;
  }

  div {
    grid-column: 1 / 3;
    width: 100%;
  }

  input {
    border: var(--grey) solid 1px;
    border-radius: 5px;
    height: 1.5rem;
    margin: 0.5rem 0;
    width: 100%;
  }

  label {
    color: var(--grey);
    font-size: small;
  }
`;

const UnfoldIconStyled = styled(UnfoldIcon)`
  color: var(--primary);
  transform: scale(0.8);
`;

const FoldIconStyled = styled(UnfoldIcon)`
  color: var(--primary);
  transform: scale(0.8) rotate(180deg);
`;
