import { useEffect } from "react";

import About from "../../components/AboutComponents/About";
import Reviews from "../../components/LandingComponents/ReviewsSection/Reviews";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <About />
      <Reviews />
    </>
  );
};

export default AboutPage;
