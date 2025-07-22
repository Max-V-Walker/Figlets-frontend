import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

import servicesData from "../../data/servicesData";
import Modal from "./Modal";

import styles from "./Services.module.css";

import { MdExpandMore, MdExpandLess } from "react-icons/md";
import IGIcon from "../../assets/icons/instagram-icon.png";
import FBIcon from "../../assets/icons/facebook-icon.png";

const Services = () => {
  const [expandedService, setExpandedService] = useState(false);
  const [expandedHeight, setExpandedHeight] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [projectToShow, setProjectToShow] = useState(null);
  const location = useLocation();
  const serviceRefs = useRef({});

  const serviceClickHandler = (service) => {
    const isExpanded = expandedService === service.service;
    const projectCount = service.projects.length;
    const estimatedCardHeight = 400;
    const bufferPerRow = 20; // to account for padding, title, image bleed, etc.
    const bufferPerCard = 10;
    const rowGap = 40;
    const paddingY = 40;

    const isDesktop = window.innerWidth >= 768;

    let estimatedHeight = 0;

    if (!isExpanded) {
      if (isDesktop) {
        const projectsPerRow = 3;
        const numRows = Math.ceil(projectCount / projectsPerRow);
        estimatedHeight =
          numRows * (estimatedCardHeight + bufferPerRow) +
          (numRows - 1) * rowGap +
          paddingY;
      } else {
        // Stack layout
        estimatedHeight =
          projectCount * (estimatedCardHeight + bufferPerCard) +
          (projectCount - 1) * rowGap +
          paddingY;
      }
    }

    setExpandedService(isExpanded ? null : service.service);
    setExpandedHeight(isExpanded ? 0 : estimatedHeight);
  };

  const projectClickHandler = (project) => {
    setIsShowModal(true);
    setProjectToShow(project);
  };

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

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (!hash) return;

    const targetRef = serviceRefs.current[hash];
    const targetService = servicesData.find((s) => s.service === hash);

    if (targetService && targetRef?.current) {
      serviceClickHandler(targetService);

      requestAnimationFrame(() => {
        targetRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, [location]);

  return (
    <>
      <div className={styles["background-hero-img"]}>
        <p>Our Services</p>
      </div>
      <section className={styles["services-container"]}>
        <h1>
          Transform Your Space With Figlet's - NJ's Trusted Contractor for
          Exceptional Results
        </h1>

        <p>
          At Figlet's, no home remodeling project is too big or small. We will
          treat your home as if it were our own and take care of you at every
          stage of your project.
        </p>

        <p>
          See all our services below - from general home, kitchen, bathroom,
          fencing, decks, concrete, demolition, waste removal, and plenty more.
          Also, check out our Instagram for even more projects, before and
          afters, and videos.{" "}
        </p>

        <div className={styles["services-links-container"]}>
          <Link
            to="/contact-us"
            onClick={() => {
              ReactGA.event({
                category: "CTA",
                action: "Click",
                label: "Services Page → Get A Quote",
              });
            }}
          >
            Get A Quote
          </Link>
          <div>
            <a
              href="https://www.instagram.com/figletsconstruction/"
              target="_blank"
              onClick={() => {
                ReactGA.event({
                  category: "CTA",
                  action: "Click",
                  label: "Services Page → IG",
                });
              }}
            >
              <img
                src={IGIcon}
                alt="Instagram Icon"
                className={styles["social-icon"]}
              />
            </a>
            <a
              href="https://www.facebook.com/figlets/"
              target="_blank"
              onClick={() => {
                ReactGA.event({
                  category: "CTA",
                  action: "Click",
                  label: "Services Page → FB",
                });
              }}
            >
              <img
                src={FBIcon}
                alt="Facebook Icon"
                className={styles["social-icon"]}
              />
            </a>
          </div>
        </div>

        <div className={styles["all-services"]}>
          {servicesData.map((service) => {
            if (!serviceRefs.current[service.service]) {
              serviceRefs.current[service.service] = React.createRef();
            }
            return (
              <div
                key={service.id}
                className={styles.service}
                ref={serviceRefs.current[service.service]}
              >
                <h2
                  className={styles["service-title"]}
                  onClick={() => {
                    serviceClickHandler(service);

                    ReactGA.event({
                      category: "CTA",
                      action: "Click",
                      label: `Services Page → ${service.service}`,
                    });
                  }}
                >
                  {service.service}
                  {service.service === "Kitchen" && " ⏲️"}
                  {service.service === "Home" && " 🏠"}
                  {service.service === "Bathroom" && " 🛁"}
                  {expandedService === service.service ? (
                    <MdExpandLess className={styles["expand-icons"]} />
                  ) : (
                    <MdExpandMore className={styles["expand-icons"]} />
                  )}
                </h2>

                <div
                  className={styles.projects}
                  style={{
                    height:
                      expandedService === service.service
                        ? `${expandedHeight}px`
                        : "0px",
                    padding:
                      expandedService === service.service
                        ? "5px 0 25px"
                        : "0px",
                  }}
                  id="bathrooms"
                >
                  <div>
                    <div className={styles["projects-inner"]}>
                      {service.projects.map((project, index) => (
                        <div
                          key={index}
                          className={styles.project}
                          onClick={() => {
                            projectClickHandler(project);

                            ReactGA.event({
                              category: "CTA",
                              action: "Click",
                              label: `Services Page → ${service.service} - ${project.title}`,
                            });
                          }}
                        >
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
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {isShowModal && projectToShow && (
        <Modal
          project={projectToShow}
          closeModal={() => setIsShowModal(false)}
        />
      )}
    </>
  );
};

export default Services;
