import styled from 'styled-components';
import { useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import { isValidEntry } from '../lib/validateFunctions';

import EntryCard from '../components/EntryCard';
import NoteTags from '../components/NoteTags';
import { UnfoldIcon } from '../icons/UnfoldIcon';

export default function Details({ member, updateMember, members }) {
  const initialEntry = {
    date: '',
    title: '',
    remember: [],
  };

  //Takes current state of the member out of the members Array.
  const [newMember, setNewMember] = useState(
    members.find((newMember) => newMember.id === member.id)
  );
  console.log('newMember', newMember);

  const [entry, setEntry] = useState(initialEntry);
  console.log('entry', entry);
  const [entries, setEntries] = useState(newMember.entries ?? []);
  console.log('entries', entries);
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
    //Search for idToDelete and remove it in the remainingEntries Array
    const remainingEntries = newMember.entries.filter(
      (entry) => entry.id !== idToDelete
    );
    setEntries(remainingEntries);
    console.log('remainingEntries', remainingEntries);

    //Update the newMember with the reduced entries and send it to App.js
    const updatedMember = { ...newMember, entries: remainingEntries };
    console.log('updatedMember', updatedMember);
    setNewMember(updatedMember);
    updateMember(updatedMember);
  }

  function addTag(noteTags) {
    setEntry({
      ...entry,
      remember: [...entry.remember, noteTags],
    });
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
            <Input
              type="text"
              name="date"
              value={entry.date}
              onChange={changeHandler}
            />
            <label htmlFor="title">Title</label>
            <Input
              type="text"
              name="title"
              value={entry.title}
              onChange={changeHandler}
            />
            <NoteTags
              entry={entry}
              //handleChange={changeHandler}
              onCreateTag={addTag}
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

const Error = styled.span`
  border: 1px solid red;
  color: red;
  margin-top: 0.5rem;
  padding: 0.5rem;
`;

const FormStyled = styled.form`
  display: flex;
  border-bottom: var(--font) solid 1px;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem 0;

  button {
    font-size: 14px;
    color: white;
    background: var(--primary);
    margin: 0.5rem 0;
    padding: 0.3rem;
    width: 100%;
  }

  div {
    grid-column: 1 / 3;
    width: 100%;
  }

  label {
    color: var(--font);
    font-size: small;
  }
`;

const Input = styled.input`
  border: #a8a8a8 solid 1px;
  border-radius: 5px;
  height: 1.8rem;
  margin: 0.5rem 0;
  outline: none;
  width: 100%;
`;

const UnfoldIconStyled = styled(UnfoldIcon)`
  color: var(--primary);
  transform: scale(0.8);
`;

const FoldIconStyled = styled(UnfoldIcon)`
  color: var(--primary);
  transform: scale(0.8) rotate(180deg);
`;
