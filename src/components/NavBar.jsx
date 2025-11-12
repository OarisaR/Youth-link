import React from "react";
import "./LandingNavbar.css";

const NavBar = () => {
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="yl-header">
      <nav className="yl-nav" aria-label="Main navigation">
        <div
          className="yl-brand"
          onClick={() => handleScroll("home")}
          tabIndex={0}
          role="button"
          aria-label="Go to home"
        >
          <span className="yl-logo">YOUTH</span>
          <span className="yl-link">LINK</span>
        </div>

        <ul className="yl-links">
          <li>
            <button onClick={() => handleScroll("home")}>Home</button>
          </li>
          <li>
            <button onClick={() => handleScroll("about")}>About</button>
          </li>
          <li>
            <button onClick={() => handleScroll("contact")}>Contact</button>
          </li>
          <li>
            <a className="yl-cta" href="/signin">Sign In</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
