import styled from 'styled-components';
import logo from '../assets/remember-logo.png';

export default function Header({ isStatic }) {
  return (
    <StyledHeader isStatic={isStatic}>
      <Logo src={logo} alt="remember-logo" />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  background: var(--secondary);
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: ${(props) => (props.isStatic ? 'static' : 'fixed')};
  top: 0;
  right: 0;
  left: 0;
`;

const Logo = styled.img`
  height: auto;
  padding: 1rem;
  width: 12rem;
`;
