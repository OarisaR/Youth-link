import React from "react";

const About = () => (
  <section
    id="about"
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#e0f2fe",
      textAlign: "center",
      padding: "0 1rem",
    }}
  >
    <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>About YouthLink</h2>
    <p style={{ fontSize: "1.2rem", maxWidth: "600px" }}>
      YouthLink is a platform dedicated to helping students and young professionals explore jobs,
      resources, and mentorship opportunities to kickstart their careers.
    </p>
  </section>
);

export default About;
