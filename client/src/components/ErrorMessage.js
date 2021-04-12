import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function ErrorMessage({ text }) {
  return <Error>{text}</Error>;
}

const Error = styled.span`
  align-self: center;
  border: 1px solid var(--signal);
  color: var(--signal);
  margin: 0.5rem 0;
  padding: 0.5rem;
  text-align: center;
`;

ErrorMessage.propTypes = {
  text: PropTypes.string,
};
