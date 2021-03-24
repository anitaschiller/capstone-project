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

  const [entry, setEntry] = useState(initialEntry);
  const [entries, setEntries] = useState(member.entries ?? []);
  const [isError, setIsError] = useState(false);
  const [isUnfolded, setIsUnfolded] = useState(false);

  const newMember = members.filter((newMember) => newMember.id === member.id);

  function changeHandler(event) {
    const field = event.target;
    const value = field.value;
    setEntry({ ...entry, [field.name]: value });
  }

  function submitHandler(event) {
    event.preventDefault();

    if (isValidEntry(entry)) {
      const newEntry = { ...entry, id: uuid4() };
      const memberEntries = [...entries, newEntry];
      setEntries(memberEntries);
      setEntry(initialEntry);

      const updatedMember = { ...member, entries: memberEntries };
      updateMember(updatedMember);
    } else {
      setIsError(true);
    }
  }

  function unfoldForm() {
    setIsUnfolded(!isUnfolded);
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
        {newMember[0].entries &&
          newMember[0].entries.map((entry) => (
            <EntryCard entry={entry} key={newMember.id} />
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

const UnfoldIconStyled = styled(UnfoldIcon)`
  color: var(--primary);
  transform: scale(0.8);
`;

const FoldIconStyled = styled(UnfoldIcon)`
  color: var(--primary);
  transform: scale(0.8) rotate(180deg);
`;
