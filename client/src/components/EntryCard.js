import styled from 'styled-components';

export default function EntryCard({ entry }) {
  return (
    <CardWrapper>
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
`;

const Headline = styled.p`
  color: var(--secondary);
  font-weight: bold;
`;
