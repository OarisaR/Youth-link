import React from "react";

const Contact = () => (
  <section
    id="contact"
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#fef3c7",
      textAlign: "center",
      padding: "0 1rem",
    }}
  >
    <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Contact Us</h2>
    <p style={{ fontSize: "1.2rem", maxWidth: "600px" }}>
      Reach out via email at <a href="mailto:info@youthlink.com">info@youthlink.com</a> or follow us on
      social media.
    </p>
  </section>
);

export default Contact;
