import { useEffect } from "react";

import Contact from "../../components/ContactComponent/Contact";
import ReviewSection from "../../components/LandingComponents/ReviewsSection/Reviews";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Contact />
      <ReviewSection />
    </>
  );
};

export default ContactPage;
