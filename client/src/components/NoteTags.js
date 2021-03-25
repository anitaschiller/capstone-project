import styled from 'styled-components';
import { useState } from 'react';

export default function NoteTags({ onCreateTag }) {
  const [tagValue, setTagValue] = useState('');
  const [tags, setTags] = useState([]);
  console.log('tagValue', tagValue);
  console.log('tags', tags);

  function handleChange(event) {
    setTagValue(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const memberTags = [...tags, tagValue];
      setTags(memberTags);
      onCreateTag(tagValue);
      setTagValue([]);
    }
  }

  return (
    <>
      <label htmlFor="remember">Remember</label>
      <TagsWrapper>
        {tags.map((tag, index) => (
          <Tag key={index}>
            {tag} <i /* onClick={() => onDeleteTag(tag)} */>&times;</i>
          </Tag>
        ))}
        <TagInput
          type="text"
          name="remember"
          /* value={entry.remember} */
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

  background: white;
  border: 1px solid #a8a8a8;
  border-radius: 5px;
  height: fit-content;
  margin: 0.5rem 0;
`;

const Tag = styled.span`
  background: var(--secondary);
  color: white;
  margin: 0.1rem;
  padding: 0.3rem;
`;

const TagInput = styled.input`
  border: none;
  outline: none;
  height: 1.7rem;
`;
