import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <footer>
      <nav>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/add">Add</NavLink>
      </nav>
    </footer>
  );
}
