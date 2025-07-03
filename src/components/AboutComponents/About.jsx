import styles from "./About.module.css";

import FigletsIcon from "../../assets/icons/figlets-icon.png";

const About = () => {
  return (
    <section className={styles["about-page-container"]}>
      <div>
        <h1>About Us</h1>
      </div>
      <div className={styles["about-page-image"]}>
        <img src={FigletsIcon} alt="Figlet's Icon" />
      </div>
      <div className={styles["about-page-content"]}>
        <div>
          <div className={styles["about-card"]}>
            <h3>welcome to figlet's construction llc</h3>
            <p>At Figlet's Construction LLC, our mission is simple: to provide homeowners with reliable, high-quality construction and renovation services at fair, honest prices. Founded in 2024, we’re committed to helping our community bring their home improvement projects to life. Our goal is to become the go-to name in the area for dependable craftsmanship and straightforward service.</p>
          </div>
          <div className={styles["about-card"]}>
            <h3>our story</h3>
            <p>Our business started to make quality home construction and renovation services accessible to everyone in the community. What began as small, word-of-mouth projects has grown into a trusted, full-service operation committed to craftsmanship and customer satisfaction. We’re passionate about helping you bring your vision to life while making the process as smooth and stress-free as possible.</p>
          </div>
          <div className={styles["about-card"]}>
            <h3>what we offer</h3>
            <p>We specialize in a wide range of home construction and improvement services, from kitchens and bathrooms to fencing, decks, concrete work, and more. No matter the project, we aim to provide quality workmanship at fair, competitive prices. To make the process even easier, we offer free estimates on all local projects, affordable demolition and clean-up options, and convenient dumpster rentals.</p>
          </div>
        </div>
        <div>
          <div className={styles["about-card"]}>
            <h3>meet the owner</h3>
            <p>I’m Christian Figueroa, the owner of Figlet's Construction LLC. With over 15 years of experience, I personally oversee every project to ensure it meets the highest standards of quality and craftsmanship. My commitment to honesty and attention to detail is what sets us apart. From clear project estimates to walking you through every step of the process, I make sure our customers have the confidence and peace of mind they deserve when it comes to improving their homes.</p>
          </div>
          <div className={styles["about-card"]}>
            <h3>why choose us?</h3>
            <p>You should choose Figlet's Construction LLC because we offer an unmatched combination of quality, reliability, and peace of mind. With over 15 years of hands-on experience, we make sure every project is done right the first time. We provide free, no-pressure estimates, transparent pricing, and clear communication every step of the way. Whether you're ready to start today or just exploring your options, you can trust you're getting dependable service from a team that cares about your home as much as you do.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
