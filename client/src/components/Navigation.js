import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { AddIcon } from '../icons/AddIcon';
import { HomeIcon } from '../icons/HomeIcon';

export default function Navigation() {
  return (
    <footer>
      <Nav>
        <NavLinkStyled exact to="/">
          <HomeIconStyled />
        </NavLinkStyled>
        <NavLinkStyled to="/add">
          <AddIconStyled />
        </NavLinkStyled>
      </Nav>
    </footer>
  );
}

const Nav = styled.nav`
  background: var(--secondary);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
`;

const NavLinkStyled = styled(NavLink)`
  color: var(--nav-inact);

  &.active {
    color: var(--primary);
  }
`;

const HomeIconStyled = styled(HomeIcon)`
  margin: 0.7rem;
`;

const AddIconStyled = styled(AddIcon)`
  margin: 0.7rem;
`;
