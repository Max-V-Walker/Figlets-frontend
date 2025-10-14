import { useState, useEffect } from "react";

import ReactGA from "react-ga4";

import { GoLightBulb, GoCalendar } from "react-icons/go";

import { BsHouseDoor } from "react-icons/bs";

import styles from "./BookNowComponent.module.css";

const BookNowComponent = () => {
  const [iframeHeight, setIframeHeight] = useState();
  const [isShowModal, setIsShowModal] = useState(true);
  const [iFrameSrc, setIFrameSrc] = useState("");

  const host =
    typeof window !== "undefined" ? window.location.host : "localhost:5173";

  const handleZipCodeSubmit = async (e) => {
    e.preventDefault();
    const zip = e.target.elements.zip.value.trim();
    if (!/^\d{5}(-\d{4})?$/.test(zip)) return alert("Enter a valid ZIP");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/distance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ zip }),
    });
    const data = await res.json();
    if (!res.ok) return alert(data.error || "Unable to get distance");

    
    // On 10/14/25, we decided to make all appointments free hence the below line. To revert to different options, uncomment the IF condition below.
    setIFrameSrc("free-estimate")
    
    // const miles = data.miles;
    // if (miles <= 10) setIFrameSrc("free-estimate");
    // else if (miles <= 25) setIFrameSrc("estimate-10-25mi");
    // else if (miles <= 40) setIFrameSrc("estimate-25-40mi");
    // else setIFrameSrc("estimate-40mi-plus");

    setIsShowModal(false);

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleMessage = (e) => {
      if (!String(e.origin).includes("calendly.com")) return;
      const ev = e.data?.event;

      // Adjust these numbers to taste for your layout
      if (ev === "calendly.event_type_viewed") setIframeHeight(800); // calendar grid
      if (ev === "calendly.date_and_time_selected") setIframeHeight(1000); // form step (tallest)
      if (ev === "calendly.event_scheduled") setIframeHeight(600); // confirmation
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (isShowModal) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.setProperty(
        "overflow",
        "hidden",
        "important"
      );
    } else {
      document.body.style.overflow = "visible";
      document.documentElement.style.setProperty(
        "overflow",
        "auto",
        "important"
      );
    }

    return () => {
      // Cleanup: always reset overflow when component unmounts
      document.body.style.overflow = "visible";
      document.documentElement.style.setProperty(
        "overflow",
        "auto",
        "important"
      );
    };
  }, [isShowModal]);

  return (
    <>
      {isShowModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <form onSubmit={handleZipCodeSubmit}>
              <label htmlFor="zip">Please enter your zip code:</label>
              <input type="text" id="zip" name="zip" />
              <button
                type="submit"
                onClick={ReactGA.event("submit_book_now_click", {
                  section: "Book Now Page",
                  button_text: "Submit Book Now",
                })}
              >
                Go
              </button>
              <a
                href="/"
                className={styles["close-btn"]}
                onClick={ReactGA.event("close_book_now_click", {
                  section: "Book Now Page",
                  button_text: "Close Book Now",
                })}
              >
                X
              </a>
            </form>
          </div>
        </div>
      )}

      <main className={styles["book-now-container"]}>
        <section className={styles["intro-section"]}>
          <h1>
            Your Dream Home Starts with a{window.innerWidth < 768 && <br />}{" "}
            Free Estimate
          </h1>
          <div className={styles["what-you-get"]}>
            <GoLightBulb className={styles.icon} />
            <div>
              <p className={styles.title}>Expert Advice</p>
              <p className={styles.description}>Licensed contractor guidance</p>
            </div>
          </div>
          <div className={styles["what-you-get"]}>
            <GoCalendar className={styles.icon} />
            <div>
              <p className={styles.title}>Clear Timelines</p>
              <p className={styles.description}>Understand costs & schedules</p>
            </div>
          </div>
          <div className={styles["what-you-get"]}>
            <BsHouseDoor className={styles.icon} />
            <div>
              <p className={styles.title}>Space Ideas</p>
              <p className={styles.description}>Budget-friendly solutions</p>
            </div>
          </div>
        </section>

        <p className={styles["select-below"]}>Set a Date Below</p>

        <div className={styles["iframe-container"]}>
          <iframe
            src={`https://calendly.com/christian-figletsconstruction/${iFrameSrc}?embed_domain=${host}&embed_type=Inline`}
            style={{
              width: "100%",
              height: `${iframeHeight}px`,
              border: "none",
            }}
            scrolling="auto"
            frameBorder="0"
            title="Book Now with Calendly"
            allow="payment *; clipboard-write *"
          />
        </div>
      </main>
    </>
  );
};

export default BookNowComponent;
