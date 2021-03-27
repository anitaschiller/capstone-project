import styled from 'styled-components';
import { StarIconEmpty } from '../icons/StarIconEmpty';

export default function NoteTag({ saveNote, note }) {
  <Tag onClick={() => saveNote(note)}>
    <StarEmptyStyled />
    <Note>{note}</Note>
  </Tag>;
}

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

const Tag = styled.span`
  border: solid #a8a8a8 1px;
  border-radius: 5px;
  margin: 0 0.4rem 0.4rem 0;
  padding: 0.5rem;
  position: relative;
`;
