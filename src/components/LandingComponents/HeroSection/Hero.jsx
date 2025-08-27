import { Link } from "react-router-dom";
import ReactGA from "react-ga4";

import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles["hero-container"]}>
      <div className={styles["hero-content"]}>
        <h1>NJ's Go-To Home Improvement Contractor</h1>
        <h3 className={styles.insured}>Fully Licensed & Insured <br/><span>Lic. #13VH11648000</span></h3>
        <p className={styles["estimate-button"]}>
          <Link
            to="/book-now"
            onClick={() => {
              ReactGA.event("cta_click", {
                section: "Hero",
                button_text: "Schedule My Estimate",
              });
            }}
          >
            Schedule My Estimate
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Hero;
