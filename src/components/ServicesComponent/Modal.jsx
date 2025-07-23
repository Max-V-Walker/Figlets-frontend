import { useState } from "react";

import styles from "./Modal.module.css";

import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";

const Modal = ({ project, closeModal }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <button className={styles.closeBtn} onClick={closeModal}>
          X
        </button>

        <h2 className={styles["project-title"]}>{project.title}</h2>
        <hr />
        <p className={styles["project-description"]}>{project.description}</p>
        <p className={styles["project-time"]}>
          {project.time} - {project.location}
        </p>

        <div className={styles["image-carousel"]}>
          <img
            src={project.images[currentImageIndex]}
            alt={`${project.title} ${currentImageIndex + 1}`}
            className={styles["carousel-image"]}
            loading="lazy"
          />

          <div className={styles["navigate-buttons-container"]}>
            {currentImageIndex > 0 && (
              <button
                onClick={handlePrev}
                className={`${styles.arrowBtn} ${styles.left}`}
              >
                <IoMdArrowBack className={styles.arrow}/>
              </button>
            )}

            {currentImageIndex < project.images.length - 1 && (
              <button
                onClick={handleNext}
                className={`${styles.arrowBtn} ${styles.right}`}
              >
                <IoMdArrowForward className={styles.arrow}/>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
