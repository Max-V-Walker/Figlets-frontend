import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import ReactGA from "react-ga4";

import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineInstagram, AiFillFacebook } from "react-icons/ai";

import styles from "./Banner.module.css";

const Banner = () => {
  const [isShowBanner, setIsShowBanner] = useState(null);
  const location = useLocation();

  const closeBannerHandler = () => {
    setIsShowBanner(false);

    ReactGA.event({
      category: "CTA",
      action: "Click",
      label: "Banner → Close Banner",
    });
  };

  useEffect(() => {
    setTimeout(() => setIsShowBanner(true), 500);
  }, [location.pathname]);

  return (
    <section
      className={`${styles["promo-banner-container"]} ${
        isShowBanner ? styles["show-banner"] : styles["hide-banner"]
      }`}
    >
      <p>
        <span>
          <HiOutlineMail />
        </span>
        chrisitan @figletsconstruction.com
      </p>

      <p>
        <Link
          to="/contact-us"
          onClick={() => {
            ReactGA.event({
              category: "CTA",
              action: "Click",
              label: "Banner → Free Estimate",
            });
          }}
        >
          Contact Today For A Free Estimate!
        </Link>
      </p>

      <div>
        <a
          href="https://www.instagram.com/figletsconstruction/"
          target="_blank"
          onClick={() => {
            ReactGA.event({
              category: "CTA",
              action: "Click",
              label: "Banner → IG",
            });
          }}
        >
          <AiOutlineInstagram className={styles["banner-socials"]} />
        </a>
        <a
          href="https://www.facebook.com/figlets/"
          target="_blank"
          onClick={() => {
            ReactGA.event({
              category: "CTA",
              action: "Click",
              label: "Banner → FB",
            });
          }}
        >
          <AiFillFacebook className={styles["banner-socials"]} />
        </a>
      </div>

      <button onClick={closeBannerHandler}>X</button>
    </section>
  );
};

export default Banner;
