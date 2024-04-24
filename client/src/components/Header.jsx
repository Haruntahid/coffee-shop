import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <Link to={"/"}>Home</Link>
      <Link to={"/users"}>Users</Link>
      <Link to={"/register"}>Register</Link>
      <Link to={"/login"}>Log in</Link>
    </>
  );
}

export default Header;
