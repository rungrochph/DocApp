import("../index.css");
import Logo from "../assets/images/newlogo.png";
import { useState } from "react";
import ("../assets/css/navbar.css")
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
   
<nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div
        className={`menu-items ${menuOpen ? "open" : ""}`}
        style={{ fontSize: "50px" }}
      >
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/home/#one">Features</a>
          </li>
          <li>
            <a style={{ marginRight: "900px" }} href="/">
              application
            </a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>{/* <a href="/login" onClick={handleLogout}>{status}</a> */}</li>
        </ul>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>
    </nav>
   
    
  );
};
export default Navbar;
