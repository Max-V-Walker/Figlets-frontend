import { Link } from "react-router";

import styles from "./Services.module.css";

import BathroomServiceImg from "../../../assets/images/bathroom-service.png";
import DumpsterServiceImg from "../../../assets/images/dumpster-service.png";
import FencingServiceImg from "../../../assets/images/fencing-service.png";
import KitchenServiceImg from "../../../assets/images/hero-image-mobile.png";


const Services = () => {
    return (
        <section className={styles["services-container"]} id="services">
            <h2>Services</h2>
            <p>Explore some of the home renovation services we offer</p>
            <div className={styles.services}>
                <Link to="/our-services" className={styles.service} loading="lazy">
                    <img src={BathroomServiceImg} alt="Bathroom Services" />
                    <p>Bathrooms 🛁</p>
                </Link>
                <Link to="/our-services" className={styles.service} loading="lazy">
                    <img src={KitchenServiceImg} alt="Kitchen Services" />
                    <p>Kitchens 🍳</p>
                </Link>
                <Link to="/our-services" className={styles.service} loading="lazy">
                    <img src={FencingServiceImg} alt="Fencing, Deck, & Concrete Services" />
                    <p>Fencing, Decks, & Concrete 🧱</p>
                </Link>
                <Link to="/our-services" className={styles.service} loading="lazy">
                    <img src={DumpsterServiceImg} alt="Dumpster & Demolition Services" />
                    <p>Dumpster & Demolition 🚚</p>
                </Link>
            </div>
        </section>
    );
};

export default Services;