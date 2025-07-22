import { useState, useEffect } from "react";

import styles from "./TopPageButton.module.css";

import UpButton from "../../../assets/icons/upButton.png";

const TopPageButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 400) /* Show after 300px of scroll */
  };

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"})
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    isVisible && (
      <button
        className={styles["top-page-button"]}
        onClick={scrollToTop}
      >
        <img src={UpButton} alt="Top of page buton" />
      </button>
    )
  );
};

export default TopPageButton;
