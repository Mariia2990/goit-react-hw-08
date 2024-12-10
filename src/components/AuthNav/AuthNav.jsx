import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <header>
      <h2>
        Phone<span>book</span>
      </h2>
      <ul>
        <NavLink className={css.link} to="/">
          Home
        </NavLink>
        <NavLink className={css.link} to="/contacts">
          Contacts
        </NavLink>
        <NavLink className={css.link} to="/login">
          Login
        </NavLink>
        <NavLink className={css.link} to="/register">
          Register
        </NavLink>
      </ul>
    </header>
  );
};

export default AuthNav;
