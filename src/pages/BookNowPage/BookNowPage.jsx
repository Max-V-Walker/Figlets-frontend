import { useEffect } from "react";

import BookNowComponent from "../../components/BookNowComponent/BookNowComponent";
import Reviews from "../../components/LandingComponents/ReviewsSection/Reviews";

const BookNowPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <BookNowComponent />
      <Reviews />
    </>
  );
};

export default BookNowPage;
