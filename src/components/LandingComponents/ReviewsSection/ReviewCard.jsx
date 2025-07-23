import { useState } from "react";
import ReactGA from "react-ga4";

import styles from "./ReviewCard.module.css";

import GoogleIcon from "../../../assets/icons/google-icon.svg";

import { AiFillStar } from "react-icons/ai";
import GoogleProfileImg from "../../../assets/icons/google-profile-img.png";

const ReviewCard = ({
  author_name,
  text,
  profile_photo_url,
  rating,
  relative_time_description,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img
          className={styles.avatar}
          src={profile_photo_url}
          alt={author_name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = GoogleProfileImg;
          }}
        />
        <div>
          <strong>{author_name}</strong>
          <div className={styles.date}>{relative_time_description}</div>
        </div>
        <img src={GoogleIcon} alt="Google" className={styles.googleIcon} />
      </div>
      <div className={styles.stars}>
        {Array.from({ length: rating }, (_, i) => (
          <AiFillStar key={i} />
        ))}
      </div>
      <p className={`${styles.text} ${isExpanded ? styles.expanded : ""}`}>
        {text}
      </p>
      <p
        className={styles["read-more"]}
        onClick={() => {
          setIsExpanded((preVal) => !preVal);
          ReactGA.event({
            category: "CTA",
            action: "Click",
            label: "Reviews → Read more",
          });
        }}
      >
        {isExpanded ? "Show Less" : "Read More"}
      </p>
    </div>
  );
};

export default ReviewCard;
