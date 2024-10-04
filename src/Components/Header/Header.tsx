import { ReactElement } from "react";
import "./Header.css"; // Ensure this points to the correct CSS file
import logo from "../../assets/Cognita logo.png";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../Hooks";

export function Header(): ReactElement {
  const { logout, tokens } = useAuthContext();

  return (
    <nav className="navbar">
      <a className="navbar-brand" href="#">
        <img src={logo} alt="Cognita logo" className="navbar-logo" />
      </a>
      <div className="navbar-links">
        <Link className="nav-link" to={"/"}>
          Home
        </Link>
        {tokens?.role === "Admin" && (
          <Link className="nav-link" to={"/user-management"}>
            User management
          </Link>
        )}
        <a onClick={logout} className="nav-link">
          Logout
        </a>
      </div>
    </nav>
  );
}
