import { useState } from "react";

import emailjs from "@emailjs/browser";

import styles from "./Contact.module.css";

const Contact = () => {
  const [isSending, setIsSending] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    town: "",
    phone: "",
    heardFrom: "",
    timeFrame: "",
    message: "",
  });

  const emailJSConfig = {
    publicKey: "lhh1F3m6ePCbK7A3i",
    serviceId: "service_wdxb4vm",
    templateId: "template_ke17pam",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .send(
        emailJSConfig.serviceId,
        emailJSConfig.templateId,
        formData,
        emailJSConfig.publicKey
      )
      .then(
        () => {
          setIsSending(false);
          setIsMessageSent(true);
          setTimeout(() => {
            setIsMessageSent(false);
          }, 2000);
        },
        (error) => {
          console.error("ERROR:", error);
          alert("Failed to send message");
        }
      );

    setFormData({
      fullName: "",
      email: "",
      address: "",
      town: "",
      phone: "",
      heardFrom: "",
      timeFrame: "",
      message: "",
    });
  };

  return (
    <section className={styles["contact-form-container"]}>
      <h2>
        Have questions?
        <br />
        Need a free estimate?
        <br />
        Want to chat?
        <br />
        Send us a message!
      </h2>
      <form
        action=""
        onSubmit={handleSubmit}
        className={styles["contact-form"]}
      >
        <p>
          All fields marked with <span style={{ color: "red" }}>*</span> are
          required.
        </p>
        <div>
          <label htmlFor="full-name">
            Full Name <span style={{ color: "red" }}>*</span>{" "}
          </label>
          <br />
          <input
            type="text"
            id="full-name"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">
            Email <span style={{ color: "red" }}>*</span>{" "}
          </label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="christian@figletsconstruction.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">
            Phone <span style={{ color: "red" }}>*</span>{" "}
          </label>
          <br />
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="732-486-9760"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address </label>
          <br />
          <input
            type="text"
            id="address"
            name="address"
            placeholder="166 Johnson Ln"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="town">
            Town, State Zip <span style={{ color: "red" }}>*</span>{" "}
          </label>
          <br />
          <input
            type="text"
            id="town"
            name="town"
            placeholder="Parlin, NJ 08859"
            value={formData.town}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="heardFrom">
            How did you hear about us? <span style={{ color: "red" }}>*</span>{" "}
          </label>
          <br />
          <select
            id="heardFrom"
            name="heardFrom"
            value={formData.heardFrom}
            onChange={handleChange}
            required
          >
            <option value="">-- Please Select --</option>
            <option value="Instagram">Instagram</option>
            <option value="Tiktok">TikTok</option>
            <option value="Facebook">Facebook</option>
            <option value="Google Search">Google Search</option>
            <option value="Friend/Referral">Friend/Referral</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="timeFrame">
            When are you hoping to begin work? <span style={{ color: "red" }}>*</span>{" "}
          </label>
          <br />
          <input
            type="text"
            id="timeFrame"
            name="timeFrame"
            placeholder="E.g. 2 weeks, 1-2 months, ASAP, exact date"
            value={formData.timeFrame}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="message">
            Your Message <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us more about your project, ideas, or how we can help.."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button>
          {isSending && "Message Sending.."}
          {isMessageSent && "Message Sent!"}
          {!isSending && !isMessageSent && "Send"}
        </button>
      </form>
    </section>
  );
};

export default Contact;
