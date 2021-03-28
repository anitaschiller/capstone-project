import styled from 'styled-components/macro';
import { useState } from 'react';

export default function NoteTags({ onCreateTag, tags, setTags, onDeleteTag }) {
  const [tagValue, setTagValue] = useState('');

  function handleChange(event) {
    setTagValue(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const memberTags = [...tags, tagValue];
      setTags(memberTags);
      onCreateTag(tagValue);
      setTagValue('');
    }
  }

  return (
    <>
      <label htmlFor="remember">Remember</label>
      <TagsWrapper>
        {tags.map((tag, index) => (
          <Tag key={index}>
            {tag} <i onClick={() => onDeleteTag(tag)}>&times;</i>
          </Tag>
        ))}
        <TagInput
          id="remember"
          type="text"
          name="remember"
          value={tagValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </TagsWrapper>
    </>
  );
}

const TagsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  background: var(--white);
  border: 1px solid var(--grey);
  border-radius: 5px;
  height: fit-content;
  margin: 0.5rem 0;
`;

const Tag = styled.span`
  background: var(--secondary);
  color: var(--white);
  margin: 0.1rem;
  padding: 0.3rem;
`;

const TagInput = styled.input`
  border: none;
  outline: none;
  height: 1.7rem;
`;
