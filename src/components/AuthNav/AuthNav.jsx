import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';
import { Button } from '@mui/material';

const AuthNav = () => {
  return (
    <div className={css.boxAuthNav}>
      <ul>
        <NavLink to="/login">
          <Button className={css.btn} variant="text" color="white">
            Login
          </Button>
        </NavLink>
        <NavLink to="/register">
          <Button className={css.btn} variant="text" color="white">
            Register
          </Button>
        </NavLink>
      </ul>
    </div>
  );
};

export default AuthNav;
