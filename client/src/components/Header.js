import styled from 'styled-components';
import logo from '../assets/remember-logo.png';

export default function Header() {
  return (
    <StyledHeader>
      <Logo src={logo} alt="remember-logo" />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  background: var(--secondary);
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Logo = styled.img`
  height: auto;
  padding: 1rem;
  width: 12rem;
`;
