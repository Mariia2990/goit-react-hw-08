import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { RiContactsBook3Line } from 'react-icons/ri';

const Navigation = () => {
  const isLogged = useSelector(selectIsLoggedIn);
  const nav = ({ isActive }) => {
    return clsx(isActive && css.active);
  };
  return (
    <nav>
  <RiContactsBook3Line className={css.logoIcon} to="/" />
     <NavLink className={nav} to="/">
        Home
      </NavLink>

      {isLogged && (
        <NavLink className={nav} to="contacts">
          Contacts
        </NavLink>
      )}
  </nav>
  );
};

export default Navigation
