import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

import LandingPage from "./pages/LandingPage/LandingPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import ApplicationPage from "./pages/ApplicationPage/ApplicationPage";
import BookNowPage from "./pages/BookNowPage/BookNowPage";


import Banner from "./components/RootComponents/Banner/Banner";
import Nav from "./components/RootComponents/Nav/Nav";
import Footer from "./components/RootComponents/Footer/Footer";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import TopPageButton from "./components/RootComponents/TopPageButton/TopPageButton";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return (
    <>
      <Banner />
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/our-services" element={<ServicesPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/apply-now" element={<ApplicationPage />} />
        <Route path="/book-now" element={<BookNowPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <TopPageButton />
      <Footer />
    </>
  );
}

export default App;
