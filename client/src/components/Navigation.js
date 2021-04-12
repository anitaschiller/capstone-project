import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { AddIcon } from '../icons/AddIcon';
import { UnfoldIcon } from '../icons/UnfoldIcon';
import { HomeIcon } from '../icons/HomeIcon';

export default function Navigation({
  isStatic,
  showHomeIcon,
  setShowHomeIcon,
}) {
  return (
    <footer>
      <Nav isStatic={isStatic}>
        <NavLinkStyled exact to="/">
          {showHomeIcon ? (
            <HomeIconStyled />
          ) : (
            <span onClick={() => setShowHomeIcon(true)}>
              <BackIcon />
            </span>
          )}
        </NavLinkStyled>
        <NavLinkStyled to="/add">
          <AddIconStyled />
        </NavLinkStyled>
      </Nav>
    </footer>
  );
}

const AddIconStyled = styled(AddIcon)`
  margin: 0.7rem;
`;

const BackIcon = styled(UnfoldIcon)`
  margin: 1.4rem 0;
  transform: scale(1.5) rotate(90deg);
`;

const Nav = styled.nav`
  background: var(--secondary);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: ${(props) => (props.isStatic ? 'static' : 'fixed')};
  bottom: 0;
  right: 0;
  left: 0;
`;

const NavLinkStyled = styled(NavLink)`
  color: var(--lightgrey);

  &.active {
    color: var(--primary);
  }
`;

const HomeIconStyled = styled(HomeIcon)`
  margin: 0.7rem;
`;

Navigation.propTypes = {
  isStatic: PropTypes.bool,
  showHomeIcon: PropTypes.bool,
  setShowHomeIcon: PropTypes.func,
};
