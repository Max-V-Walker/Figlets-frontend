import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import ApplicationPage from "./pages/ApplicationPage/ApplicationPage";

import Banner from "./components/RootComponents/Banner/Banner";
import Nav from "./components/RootComponents/Nav/Nav";
import Footer from "./components/RootComponents/Footer/Footer";
import ServicesPage from "./pages/ServicesPage/ServicesPage";

function App() {
  return (
    <>
      <Banner />
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route  path="/about-us" element={<AboutPage />} />
        <Route  path="/contact-us" element={<ContactPage />} />
        <Route  path="/apply-now" element={<ApplicationPage />} />
        <Route  path="/our-services" element={<ServicesPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
