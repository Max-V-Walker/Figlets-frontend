import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";

import styles from "./Nav.module.css";

import BurgerIcon from "./../../../assets/icons/burger-icon.svg";

import FigletsIcon from "../../../assets/icons/figlets-icon.png";

const Nav = () => {
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);

  const hamburgerClickHandler = () => setIsBurgerClicked(true);

  useEffect(() => {
    if (isBurgerClicked) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.setProperty(
        "overflow",
        "hidden",
        "important"
      );
    } else {
      document.body.style.overflow = "visible";
      document.documentElement.style.setProperty(
        "overflow",
        "auto",
        "important"
      );
    }

    return () => {
      // Cleanup: always reset overflow when component unmounts
      document.body.style.overflow = "visible";
      document.documentElement.style.setProperty(
        "overflow",
        "auto",
        "important"
      );
    };
  }, [isBurgerClicked]);

  const burgerMenu = (
    <div
      className={`${styles["burger-menu"]} ${
        isBurgerClicked ? styles["show"] : ""
      }`}
    >
      <button onClick={() => setIsBurgerClicked(false)}>X</button>
      <Link
        to="/about-us"
        onClick={() => {
          setIsBurgerClicked(false);

          ReactGA.event({
            category: "CTA",
            action: "Click",
            label: "Nav → About Us",
          });
        }}
      >
        About
      </Link>
      <a
        href="#reviews"
        onClick={() => {
          setIsBurgerClicked(false);

          ReactGA.event({
            category: "CTA",
            action: "Click",
            label: "Nav → Reviews",
          });
        }}
      >
        Reviews
      </a>
      <Link
        to="/our-services"
        onClick={() => {
          setIsBurgerClicked(false);

          ReactGA.event({
            category: "CTA",
            action: "Click",
            label: "Nav → Services",
          });
        }}
      >
        Services
      </Link>
      <Link
        to="/contact-us"
        onClick={() => {
          setIsBurgerClicked(false);

          ReactGA.event({
            category: "CTA",
            action: "Click",
            label: "Nav → Contact Us",
          });
        }}
      >
        Contact
      </Link>
      <Link
        to="/apply-now"
        onClick={() => {
          setIsBurgerClicked(false);

          ReactGA.event({
            category: "CTA",
            action: "Click",
            label: "Nav → Apply Now",
          });
        }}
      >
        Apply Now
      </Link>
      <Link
        to="/contact-us"
        onClick={() => {
          setIsBurgerClicked(false);

          ReactGA.event({
            category: "CTA",
            action: "Click",
            label: "Nav → Get A Quote",
          });
        }}
      >
        Get A Quote
      </Link>
    </div>
  );

  const desktopNav = (
    <div className={styles["desktop-nav-container"]}>
      <Link
        to="/about-us"
        onClick={() => {
          ReactGA.event({
            category: "CTA",
            action: "Click",
            label: "Nav → About Us",
          });
        }}
      >
        About
      </Link>
      <a
        href="#reviews"
        onClick={() => {
          ReactGA.event({
            category: "CTA",
            action: "Click",
            label: "Nav → Reviews",
          });
        }}
      >
        Reviews
      </a>
      <Link
        to="/our-services"
        onClick={() => {
          ReactGA.event({
            category: "CTA",
            action: "Click",
            label: "Nav → Services",
          });
        }}
      >
        Services
      </Link>
      <Link
        to="/contact-us"
        onClick={() => {
          ReactGA.event({
            category: "CTA",
            action: "Click",
            label: "Nav → Contact Us",
          });
        }}
      >
        Contact
      </Link>
      <Link
        to="/apply-now"
        className={styles["apply-now"]}
        onClick={() => {
          ReactGA.event({
            category: "CTA",
            action: "Click",
            label: "Nav → Apply Now",
          });
        }}
      >
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
        <Link
          to="/contact-us"
          id={styles["quote-button"]}
          onClick={() => {
            ReactGA.event({
              category: "CTA",
              action: "Click",
              label: "Nav → Get A Quote",
            });
          }}
        >
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
