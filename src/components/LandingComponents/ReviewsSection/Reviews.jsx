import { useEffect, useState } from "react";

import ReviewsCarousel from "./ReviewsCarousel";

import styles from "./Reviews.module.css";

import GoogleLogo from "../../../assets/icons/google-icon.svg";

import { AiFillStar } from "react-icons/ai";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(null);
  const [total, setTotal] = useState(0);

  const baseURL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL;

  useEffect(() => {
    // fetch("/api/google-reviews")
    fetch(`${baseURL}/google-reviews`)
      .then(res => res.json())
      .then(data => {
        setReviews(data.reviews || []);
        setRating(data.rating || null);
        setTotal(data.totalReviews || 0);
      })
      .catch(err => console.error("FETCH ERROR:", err));
  }, []);

  return (
    <section className={styles.reviewSection} id="reviews">
      <div className={styles["review-heading"]}>
        <h2>"EXCELLENT"</h2>
        <div className={styles.stars}>
          {reviews.map((_, i) => (
            <AiFillStar key={i} className={styles["stars"]} />
          ))}
        </div>
        <p>Based on {total} reviews</p>
        <img src={GoogleLogo} alt="Google logo" className={styles.logo} />
      </div>

      <div className={styles.reviewsContainer}>
        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  );
};

export default ReviewSection;
