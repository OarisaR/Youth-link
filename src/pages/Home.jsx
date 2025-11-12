import React from "react";

const Home = () => (
  <section
    id="home"
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#f0f4f8",
      textAlign: "center",
      padding: "0 1rem",
    }}
  >
    <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Welcome to YouthLink</h1>
    <p style={{ fontSize: "1.25rem", maxWidth: "600px" }}>
      Connecting youth with opportunities, resources, and guidance for career growth.
    </p>
  </section>
);

export default Home;
