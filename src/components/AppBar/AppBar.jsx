import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import AuthNav from "../AuthNav/AuthNav";
import css from './AppBar.module.css'
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";

const AppBar = () => {
  const isLogged = useSelector(selectIsLoggedIn);
  return (
    
      <div className={css.nav}>
        <Navigation />
        {isLogged ? <UserMenu /> : <AuthNav />}
      </div>
 
  );
};

export default AppBar;
