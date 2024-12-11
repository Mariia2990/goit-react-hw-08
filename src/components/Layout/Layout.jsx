import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";

const Layout = () => {
    return (
      <div>
        <AppBar position="static" />
        <Outlet />
      </div>
    );
};

export default Layout