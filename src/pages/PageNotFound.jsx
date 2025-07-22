import { Link } from "react-router-dom";

import styles from "./PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <section className={styles["page-not-found-container"]}>
      <h1>404</h1>
      <p>Page Not Found</p>
      <button>
        <Link to="/">Home</Link>
      </button>
    </section>
  );
};

export default PageNotFound;
