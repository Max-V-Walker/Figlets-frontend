import { NavLink } from "react-router";

import styles from "./About.module.css";

import FigletsIcon from "../../../assets/icons/figlets-icon.png";
import IGIcon from "../../../assets/icons/instagram-icon.png";
import FBIcon from "../../../assets/icons/facebook-icon.png";

const About = () => {
  return (
    <section className={styles["about-container"]}>
      <div className={styles["about-information"]}>
        <h2>Hardworking. Honest. Reliable.
            <br/>
            At the heart of everything we do.
        </h2>
        <img src={FigletsIcon} alt="Figlet's Icon" />
        <p>We're a fully licensed and insured construction company with over 15 years of experience delivering high-quality work to New Jersey.<span className={styles.spacer}></span>From kitchen and bathroom renovations to much more, we bring craftsmanship and integrity to every project.</p>
        <div className={styles["about-links-container"]}>
          <NavLink to="/about-us"> Learn More</NavLink>
          <div>
            <a href="https://www.instagram.com/figletsconstruction/" target="_blank">
              <img src={IGIcon} alt="Instagram Icon" className={styles["social-icon"]} />
            </a>
            <a href="https://www.facebook.com/figlets/" target="_blank">
              <img src={FBIcon} alt="Facebook Icon" className={styles["social-icon"]} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
