import { useState } from "react";
import { Link  } from "react-router-dom";

import styles from "./Nav.module.css";

import BurgerIcon from "./../../../assets/icons/burger-icon.svg";

import FigletsIcon from "../../../assets/icons/figlets-icon.png";

const Nav = () => {
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);

  const hamburgerClickHandler = () => setIsBurgerClicked(true);

  const burgerMenu = (
    <div
      className={`${styles["burger-menu"]} ${
        isBurgerClicked ? styles["show"] : ""
      }`}
    >
      <button onClick={() => setIsBurgerClicked(false)}>X</button>
      <Link to="/about-us" onClick={() => setIsBurgerClicked(false)}>
        About
      </Link>
      <a href="#reviews" onClick={() => setIsBurgerClicked(false)}>
        Reviews
      </a>
      <Link to="/our-services" onClick={() => setIsBurgerClicked(false)}>
        Services
      </Link>
      <Link to="/contact-us" onClick={() => setIsBurgerClicked(false)}>
        Contact
      </Link>
      <Link to="/apply-now" onClick={() => setIsBurgerClicked(false)}>
        Apply Now
      </Link>
      <Link to="/contact-us">Get A Quote</Link>
    </div>
  );

  const desktopNav = (
    <div className={styles["desktop-nav-container"]}>
      <Link to="/about-us">About</Link>
      <a href="#reviews">Reviews</a>
      <Link to="/our-services">Services</Link>
      <Link to="/contact-us">Contact</Link>
      <Link to="/apply-now" className={styles["apply-now"]}>
        Apply Now
      </Link>
    </div>
  );

  return (
    <header className={styles["header-container"]}>
      <nav className={styles["nav-container"]}>
        {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}
        <Link to="/">
          <div>
            <img
              src={FigletsIcon}
              alt="Figlets Construction LLC Icon"
              className={styles["nav-icon"]}
            />
            <p>Figlet's</p>
          </div>
        </Link>
        {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}
        {desktopNav}
        {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}
        <Link to="/contact-us" id={styles["quote-button"]}>
          Get A Quote
        </Link>

        <img
          src={BurgerIcon}
          alt="Menu Icon"
          className={styles["burger-icon"]}
          onClick={hamburgerClickHandler}
        />
      </nav>
      {burgerMenu}
    </header>
  );
};

export default Nav;
