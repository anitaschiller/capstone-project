import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useState } from 'react';
import { v4 as uuid4 } from 'uuid';

import { EditIcon } from '../icons/EditIcon';
import EntryCard from '../components/EntryCard';
import ErrorMessage from '../components/ErrorMessage';
import Form from '../components/Form';
import { isValidEntry } from '../lib/validateFunctions';
import NoteTags from '../components/NoteTags';
import { StarIconFilled } from '../icons/StarIconFilled';
import { UnfoldIcon } from '../icons/UnfoldIcon';

export default function Details({
  availableGroups,
  updateMember,
  member,
  addGroup,
}) {
  const initialEntry = {
    date: '',
    title: '',
    remember: [],
  };

  const [entry, setEntry] = useState(initialEntry);
  const [entries, setEntries] = useState(member.entries ?? []);
  const [isError, setIsError] = useState(false);
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [tags, setTags] = useState([]);
  const savedNotes = findSavedNotes() ?? [];
  const [openEditForm, setOpenEditForm] = useState(false);

  function findSavedNotes() {
    if (member.entries) {
      return member.entries
        .flatMap((entry) => entry.remember)
        .filter((note) => note.isSaved);
    }
  }

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
      setTags([]);

      updateMemberEntries(memberEntries);
    } else {
      setIsError(true);

      setTimeout(function () {
        setIsError(false);
      }, 3000);
    }
  }

  function deleteEntry(idToDelete) {
    const remainingEntries = member.entries.filter(
      (entry) => entry.id !== idToDelete
    );
    setEntries(remainingEntries);
    updateMemberEntries(remainingEntries);
  }

  function updateMemberEntries(updatedEntries) {
    const updatedMember = { ...member, entries: updatedEntries };
    updateMember(updatedMember);
  }

  function addTag(tagValue) {
    const memberTags = [...tags, tagValue];
    setTags(memberTags);

    const newNote = { noteContent: tagValue, isSaved: false, id: uuid4() };
    setEntry({
      ...entry,
      remember: [...entry.remember, newNote],
    });
  }

  function deleteTag(tagToDelete) {
    const remainingTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(remainingTags);
  }

  function toggleNote(noteToToggle) {
    const entryRemember = member.entries.map((entry) => entry.remember);

    entryRemember.map((entry) =>
      entry.forEach((note) => {
        if (note.noteContent === noteToToggle.noteContent) {
          note.isSaved = !note.isSaved;
        }
        return note;
      })
    );
    updateMemberEntries(member.entries);
  }

  return (
    <>
      <DetailsHeader data-testid="member-details">
        <DetailsHeadline>
          {member.firstName} {member.lastName}
          <span onClick={() => setOpenEditForm(!openEditForm)}>
            <EditIconStyled />
          </span>
        </DetailsHeadline>
        <DetailsGroup>{member.group}</DetailsGroup>
        <DetailsDescription>{member.description}</DetailsDescription>
        <SavedNoteWrapper>
          {savedNotes.map((note, index) => (
            <SavedNote key={index} onClick={() => toggleNote(note)}>
              <StarFilledStyled />
              <Note>{note.noteContent}</Note>
            </SavedNote>
          ))}
        </SavedNoteWrapper>
        <Portrait src={member.image} alt="" />
      </DetailsHeader>
      {openEditForm && (
        <EditFormWrapper>
          <Form
            availableGroups={availableGroups}
            currentMember={member}
            submitFunction={updateMember}
            openEditForm={openEditForm}
            setOpenEditForm={setOpenEditForm}
            addGroup={addGroup}
          />
        </EditFormWrapper>
      )}

      <EntryFormStyled>
        <h3 onClick={() => setIsUnfolded(!isUnfolded)}>
          New Entry {isUnfolded ? <FoldIconStyled /> : <UnfoldIconStyled />}
        </h3>
        {isUnfolded && (
          <>
            <label htmlFor="date">Date</label>
            <Input
              id="date"
              type="text"
              name="date"
              value={entry.date}
              onChange={changeHandler}
            />
            <label htmlFor="title">Title</label>
            <Input
              id="title"
              type="text"
              name="title"
              value={entry.title}
              onChange={changeHandler}
            />
            <NoteTags
              entry={entry}
              onCreateTag={addTag}
              tags={tags}
              setTags={setTags}
              onDeleteTag={deleteTag}
            />
            {isError && (
              <ErrorMessage text="Please check if all fields were filled correctly!" />
            )}
            <button onClick={submitHandler}>SAVE</button>
          </>
        )}
      </EntryFormStyled>
      <CardContainer>
        {member.entries &&
          member.entries.map((entry) => (
            <EntryCard
              entry={entry}
              onDeleteEntry={deleteEntry}
              key={entry.id}
              onToggleNote={toggleNote}
            />
          ))}
      </CardContainer>
    </>
  );
}

const CardContainer = styled.section`
  margin: 1rem 0 3rem 0;
`;

const DetailsDescription = styled.p`
  grid-column: 1 / 2;
`;

const DetailsHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr auto;
  gap: 0.3rem;

  border-bottom: var(--grey) solid 1px;
  padding: 0 0 0.5rem 0;
`;

const DetailsHeadline = styled.h2`
  grid-column: 1 / 3;
  margin: 0;
`;

const DetailsGroup = styled.p`
  color: var(--grey);
  grid-column: 1 / 2;
  font-style: italic;
  margin: 0.4rem 0;
`;

const EditFormWrapper = styled.div`
  background: var(--lightgrey);
  position: absolute;
  top: 90px;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 1rem;
  z-index: 200;
`;

const EditIconStyled = styled(EditIcon)`
  color: var(--secondary);
  margin: 0 1rem;
  transform: scale(0.8);
`;

const EntryFormStyled = styled.form`
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

  label {
    color: var(--grey);
    font-size: small;
  }
`;

const Input = styled.input`
  border: var(--grey) solid 1px;
  border-radius: 5px;
  height: 1.8rem;
  margin: 0.5rem 0;
  outline: none;
  width: 100%;
`;

const Note = styled.span`
  padding-left: 1.5rem;
`;

const Portrait = styled.img`
  border-radius: 50%;
  grid-column: 2 / 3;
  grid-row: 2 / 6;
  margin: 0 1rem 0.5rem 0;
  width: 6rem;
  height: auto;
`;

const StarFilledStyled = styled(StarIconFilled)`
  color: var(--primary);
  height: 1.1rem;
  width: auto;
  position: absolute;
  top: 5px;
`;

const SavedNote = styled.span`
  border: solid var(--grey) 1px;
  border-radius: 5px;
  margin: 0 0.4rem 0.4rem 0;
  padding: 0.5rem;
  position: relative;
`;

const SavedNoteWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0.5rem 0 0.5rem 0;
  height: fit-content;
`;

const UnfoldIconStyled = styled(UnfoldIcon)`
  color: var(--primary);
  transform: scale(0.8);
`;

const FoldIconStyled = styled(UnfoldIcon)`
  color: var(--primary);
  transform: scale(0.8) rotate(180deg);
`;

Details.propTypes = {
  availableGroups: PropTypes.array,
  updateMember: PropTypes.func,
  member: PropTypes.object,
  addGroup: PropTypes.func,
};
