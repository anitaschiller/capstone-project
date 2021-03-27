import styled from 'styled-components';
import { StarIconEmpty } from '../icons/StarIconEmpty';
import { StarIconFilled } from '../icons/StarIconFilled';

export default function EntryCard({ entry, onDeleteEntry, onToggleNote }) {
  return (
    <CardWrapper>
      <DeleteIcon onClick={() => onDeleteEntry(entry.id)}>x</DeleteIcon>
      <Headline>
        {entry.date} · {entry.title}
      </Headline>
      {entry.remember.map((note) => (
        <NoteTag onClick={() => onToggleNote(note)} key={note.id}>
          {note.isSaved ? <StarFilledStyled /> : <StarEmptyStyled />}
          <Note>{note.noteTag}</Note>
        </NoteTag>
      ))}
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  background: var(--white);
  border-radius: 5px;
  margin: 0.3rem 0;
  padding: 0.8rem;
  position: relative;
`;

const DeleteIcon = styled.span`
  color: var(--signal);
  font-size: 1.3rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const Headline = styled.h2`
  color: var(--secondary);
  font-size: 0.9rem;
  font-weight: bold;
  width: 100%;
`;

const Note = styled.span`
  padding-left: 1.5rem;
`;

const StarEmptyStyled = styled(StarIconEmpty)`
  color: var(--primary);
  height: 1.1rem;
  width: auto;
  position: absolute;
  top: 5px;
`;

const StarFilledStyled = styled(StarIconFilled)`
  color: var(--primary);
  height: 1.1rem;
  width: auto;
  position: absolute;
  top: 5px;
`;

const NoteTag = styled.span`
  border: solid #a8a8a8 1px;
  border-radius: 5px;
  margin: 0 0.4rem 0.4rem 0;
  padding: 0.5rem;
  position: relative;
`;
