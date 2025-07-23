import { useRef, useEffect, useState } from "react";

import ReactGA from "react-ga4";

import ReviewCard from "./ReviewCard";

import styles from "./ReviewsCarousel.module.css";

const ReviewCarousel = ({ reviews }) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atStart, setAtStart] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const totalCards = reviews.length + 1; // 5 Google reviews + 1 custom card

  const updateDesktopArrows = () => {
    const container = scrollRef.current;
    if (!container) return;

    const buffer = 1;
    setAtStart(container.scrollLeft <= buffer);
    setAtEnd(
      // container.scrollLeft + container.offsetWidth >= container.scrollWidth - 5
      container.scrollLeft + container.offsetWidth >=
        container.scrollWidth - buffer
    );
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(`.${styles.reviewCard}`);
    if (!cards.length) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = parseFloat(window.getComputedStyle(container).gap) || 24;
    const totalScroll = cardWidth + gap;
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      let newIndex = activeIndex + (direction === "left" ? -1 : 1);
      if (newIndex < 0 || newIndex >= cards.length) return;

      setActiveIndex(newIndex);

      const containerWidth = container.offsetWidth;
      const cardLeft = cards[newIndex].offsetLeft;
      const offset = cardLeft - (containerWidth - cardWidth) / 2;

      container.scrollTo({
        left: offset,
        behavior: "smooth",
      });
    } else {
      container.scrollBy({
        left: direction === "left" ? -totalScroll : totalScroll,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(`.${styles.reviewCard}`);
    if (!cards.length) return;

    if (window.innerWidth < 768) {
      const firstCard = cards[0];
      const containerWidth = container.offsetWidth;
      const cardWidth = firstCard.offsetWidth;
      const cardLeft = firstCard.offsetLeft;
      const offset = cardLeft - (containerWidth - cardWidth) / 2;

      container.scrollTo({
        left: offset,
        behavior: "instant",
      });
      setActiveIndex(0);
    } else {
      updateDesktopArrows();
      setTimeout(updateDesktopArrows, 100);
    }

    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        updateDesktopArrows();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [reviews.length]);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper} ref={scrollRef}>
        <div className={styles.carousel}>
          {[...reviews, "custom"].map((review, i) => (
            <div key={i} className={styles.reviewCard}>
              {review === "custom" ? (
                <div className={styles.card}>
                  <h3>Want to read all reviews?</h3>
                  <a
                    href="https://www.google.com/search?q=figlets+construction#lrd=0xac9d5711bb0a4cc3:0xcff746874deb91b8,1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.readMore}
                    onClick={() => {
                      ReactGA.event({
                        category: "CTA",
                        action: "Click",
                        label: "Reviews → View All",
                      });
                    }}
                  >
                    Click Here to View All
                  </a>
                </div>
              ) : (
                <ReviewCard {...review} index={i} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.arrowContainer}>
        <button
          onClick={() => scroll("left")}
          className={styles.arrow}
          disabled={
            (window.innerWidth >= 768 && atStart) ||
            (window.innerWidth < 768 && activeIndex === 0)
          }
        >
          ❮
        </button>
        <button
          onClick={() => {
            scroll("right");

            ReactGA.event({
              category: "CTA",
              action: "Click",
              label: "Reviews → Next Review",
            });
          }}
          className={styles.arrow}
          disabled={
            (window.innerWidth >= 768 && atEnd) ||
            (window.innerWidth < 768 && activeIndex === totalCards - 1)
          }
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default ReviewCarousel;
