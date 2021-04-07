import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useState } from 'react';

import ErrorMessage from '../components/ErrorMessage';
import ImageCropper from './ImageCropper';
import { isValidMember } from '../lib/validateFunctions';
import NewGroup from '../components/NewGroup';

export default function Form({
  submitFunction,
  availableGroups,
  addGroup,
  currentMember,
  openEditForm,
  setOpenEditForm,
}) {
  /* export default function Form({ submitFunction, availableGroups, addGroup }) { */
  const PLACEHOLDER_URL =
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

  const initialMember = {
    firstName: '',
    lastName: '',
    image: PLACEHOLDER_URL,
    description: '',
    group: '',
  };

  const [member, setMember] = useState(currentMember ?? initialMember);
  console.log('member', member);
  const [isError, setIsError] = useState(false);
  const [wasSuccessful, setWasSuccessful] = useState(false);
  const [selectedFileURL, setSelectedFileURL] = useState(
    currentMember ? currentMember.image : PLACEHOLDER_URL
  );
  const [openImageCropper, setOpenImageCropper] = useState(false);

  function handleChange(event) {
    const field = event.target;
    const value = field.value;
    setMember({ ...member, [field.name]: value });
  }

  function submitHandler(event) {
    event.preventDefault();
    if (isValidMember(member)) {
      const memberWithImage = { ...member, image: selectedFileURL };
      submitFunction(memberWithImage);
      setMember(initialMember);
      setSelectedFileURL(PLACEHOLDER_URL);

      setWasSuccessful(true);
      setIsError(false);
      setTimeout(function () {
        setWasSuccessful(false);
      }, 3000);

      if (openEditForm !== undefined) {
        setOpenEditForm(false);
      }
    } else {
      setIsError(true);

      setTimeout(function () {
        setIsError(false);
      }, 3000);
    }
  }

  return (
    <>
      <FormStyled>
        <Name>
          <label htmlFor="first-name">First name*:</label>
          <TextInput
            type="text"
            name="firstName"
            id="first-name"
            value={member.firstName}
            onChange={handleChange}
          />
        </Name>
        <Name>
          <label htmlFor="last-name">Last name*:</label>
          <TextInput
            type="text"
            name="lastName"
            id="last-name"
            value={member.lastName}
            onChange={handleChange}
          />
        </Name>
        <ImagePreview src={selectedFileURL} alt="" />
        <Image>
          <label htmlFor="image">Image:</label>
          <FileInput
            type="file"
            name="image"
            id="image"
            onChange={(event) => {
              setSelectedFileURL(URL.createObjectURL(event.target.files[0]));
              setOpenImageCropper(true);
            }}
          />
        </Image>
        <Description>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            value={member.description}
            onChange={handleChange}
          />
        </Description>
        <Group>
          <label htmlFor="group">Group*:</label>
          <div>
            <select
              name="group"
              id="group"
              value={member.group}
              onChange={handleChange}
            >
              <option>Please select...</option>
              {availableGroups.map((group) => (
                <option key={group._id}>{group.name}</option>
              ))}
            </select>
            <NewGroup addGroup={addGroup} />
          </div>
        </Group>

        {wasSuccessful && <Success>Member successfully added!</Success>}
        {isError && <ErrorMessage text="Please fill in all required fields!" />}

        <Button onClick={submitHandler}>SAVE</Button>
      </FormStyled>
      {openImageCropper && (
        <ImageCropper
          setOpenImageCropper={setOpenImageCropper}
          selectedFileURL={selectedFileURL}
          setSelectedFileURL={setSelectedFileURL}
          setMember={setMember}
          member={member}
        />
      )}
    </>
  );
}

const Button = styled.button`
  grid-column: 1 / 3;
  font-size: 14px;
  color: var(--white);
  background: var(--primary);
  padding: 0.3rem;
  width: 100%;
`;

const Description = styled.div`
  grid-column: 1 / 3;
  width: 100%;
`;

const FileInput = styled.input`
  border: none;
  height: 1.5rem;
  margin: 0.5rem 0;
  width: 100%;
`;

const FormStyled = styled.form`
  display: grid;
  grid-template-columns: 55% auto;
  grid-gap: 1rem;
  label {
    color: var(--grey);
  }
  select {
    border: var(--grey) solid 1px;
    border-radius: 5px;
    height: 1.5rem;
    margin: 0.5rem 0;
    width: 88%;
  }
  span {
    grid-column: 1 / 3;
    justify-self: center;
  }
  textarea {
    border: var(--grey) solid 1px;
    border-radius: 5px;
    margin: 0.5rem 0;
    width: 100%;
  }
`;

const Group = styled.div`
  grid-column: 1 / 3;
  width: 100%;
`;

const Image = styled.div`
  grid-column: 1 / 3;
`;

const ImagePreview = styled.img`
  align-self: flex-end;
  justify-self: center;
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  border-radius: 50%;
  margin: 0 0 0.5rem 0;
  width: 128px;
  height: auto;
`;

const Name = styled.div`
  grid-column: 1 / 2;
`;

const Success = styled.span`
  border: 1px solid #000000;
  padding: 0.5rem;
`;

const TextInput = styled.input`
  border: var(--grey) solid 1px;
  border-radius: 5px;
  height: 1.5rem;
  margin: 0.5rem 0;
  width: 100%;
`;

Form.propTypes = {
  submitFunction: PropTypes.func,
};
