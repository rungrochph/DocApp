import("../index.css");
import Logo from "../assets/images/newlogo.png";
import { useState, useEffect } from "react";
import("../assets/css/navbar.css");
const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fname");
    window.location = "./login";
  };
  const [status, setStatus] = useState("Login");
  useEffect(() => {
    const fname = localStorage.getItem("fname");
    if (fname == null) {
      setStatus("Login");
    } else {
      setStatus("LogOut");
    }
  }, [setStatus]);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className="navbar">
      <div className="logo mt-8" style={{ width: "120px" }}>
        <a href="/">
          {" "}
          <img src={Logo} alt="Logo" />{" "}
        </a>
      </div>
      <div
        className={`menu-items ${menuOpen ? "open" : ""}`}
        style={{ fontSize: "50px" }}
      >
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a style={{ marginRight: "900px" }} href="/">
              application
            </a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/login" onClick={handleLogout}>
              {status}
            </a>
          </li>
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
