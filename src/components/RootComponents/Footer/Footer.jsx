import { Link } from "react-router-dom";

import styles from "./Footer.module.css";

import { MdLocationOn, MdRateReview } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhoneAlt, FaRegClock } from "react-icons/fa";
import { BiCalendar } from "react-icons/bi";
import { AiOutlineInstagram, AiFillFacebook } from "react-icons/ai";

import InstagramLogo from "../../../assets/icons/instagram-icon.png";
import FacebookLogo from "../../../assets/icons/facebook-icon.png";

const FooterComponent = () => {
  const reviewsUrl =
    "https://www.google.com/search?q=figlets+construction&rlz=1C5CHFA_enUS943US944&oq=figlets+construction&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIQCAEQLhgKGBYYHhivARjHATIKCAIQABiABBiiBDIKCAMQABiiBBiJBTIKCAQQABiABBiiBDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDcwMzdqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#lrd=0xac9d5711bb0a4cc3:0xcff746874deb91b8,1,,,,";
  return (
    <footer className={styles["footer-container"]}>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57397.024674205655!2d-74.32853886777875!3d40.469511523450855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xac9d5711bb0a4cc3%3A0xcff746874deb91b8!2sFiglet&#39;s%20Construction%20LLC!5e0!3m2!1sen!2sus!4v1750309417872!5m2!1sen!2sus"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={styles.map}
        ></iframe>
      </div>
      <div>
        <h4>Contact Us!</h4>
        <ul>
          <li>
            <i>
              <MdLocationOn />
            </i>
            Parlin, NJ 08859
          </li>
          <li>
            <i>
              <HiOutlineMail />
            </i>
            chrisitan @figletsconstruction.com
          </li>
          <li>
            <i>
              <FaPhoneAlt />
            </i>
            732-486-9760
          </li>
          <li style={{ marginBottom: "-15px" }}>
            <i>
              <BiCalendar />
            </i>
            Monday - Friday
          </li>
          <li>
            <i>
              <FaRegClock />
            </i>
            8:00 am - 6:00 pm
          </li>
          {/* <li>
            <i>
              <BiCalendar />
            </i>
            Saturday
          </li>
          <li>
            <i>
              <FaRegClock />
            </i>
            8:00 am - 3:00 pm
          </li> */}
          <li>
            <a href={reviewsUrl} target="_blank">
              <i>
                <MdRateReview />
              </i>
              Leave A Review
            </a>
          </li>
          <div className={styles["footer-socials"]}>
            <li>
              <a
                href="https://www.instagram.com/figletsconstruction/"
                target="_blank"
              >
                {/* <img src={InstagramLogo} alt="Instagram logo" /> */}
                <AiOutlineInstagram className={styles["footer-social"]}/>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/figlets/" target="_blank">
                {/* <img src={FacebookLogo} alt="Facebook logo" /> */}
                <AiFillFacebook className={styles["footer-social"]}/>
              </a>
            </li>
            {/* <p className={styles["apply-now"]}>
              <Link to="/apply-now">Apply Now</Link>
            </p> */}
          </div>
        </ul>
      </div>
      {/* <p className={styles["apply-now"]}><Link to="/apply-now">Apply Now</Link></p> */}
    </footer>
  );
};

export default FooterComponent;
