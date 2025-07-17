import { Link } from "react-router-dom";
import ReactGA from "react-ga4";

import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles["hero-container"]}>
      <div className={styles["hero-content"]}>
        <h1>NJ's Go-To Home Improvement Contractor</h1>
        <p className={styles["estimate-button"]}>
          <Link
            to="/contact-us"
            onClick={() => {
              ReactGA.event({
                category: "CTA",
                action: "Click",
                label: "Hero → Free Estimate",
              });
            }}
          >
            Get A Free Estimate
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Hero;
