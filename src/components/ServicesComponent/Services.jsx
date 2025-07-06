import React from "react";

import servicesData from "../../data/servicesData";

import styles from "./Services.module.css";

const Services = () => {
  return (
    <section className={styles["services-container"]}>
      {/* intro */}
      <div className={styles["all-services"]}>
        {servicesData.map((service) => (
          <div key={service.id} className={styles.service}>
            <h2 className={styles["service-title"]}>
              {service.service} Services
            </h2>
            <div className={styles.projects}>
              {service.projects.map((project, index) => (
                <div key={index} className={styles.project}>
                  <h3 className={styles["project-title"]}>
                    {project.title || "Check this!"}
                  </h3>
                  <div>
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className={styles["product-cover-image"]}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
