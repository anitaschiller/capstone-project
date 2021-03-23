import styled from 'styled-components';

export default function EntryCard({ entry, onDeleteEntry }) {
  console.log('entryId', entry.id);
  return (
    <CardWrapper>
      <DeleteIcon onClick={() => onDeleteEntry(entry.id)}>x</DeleteIcon>
      <Headline>
        {entry.date} · {entry.title}
      </Headline>
      <p>{entry.remember}</p>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  background: white;
  border-radius: 5px;
  margin: 0.3rem 0;
  padding: 1rem;
  position: relative;
`;

const DeleteIcon = styled.span`
  color: red;
  font-size: 1.3rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const Headline = styled.p`
  color: var(--secondary);
  font-weight: bold;
`;
