import { useEffect } from "react";

import Services from "../../components/ServicesComponent/Services";
import Reviews from "../../components/LandingComponents/ReviewsSection/Reviews";

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Services />
      <Reviews />
    </>
  );
};

export default ServicesPage;
