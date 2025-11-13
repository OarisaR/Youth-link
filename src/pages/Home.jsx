import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import lottie from "lottie-web";
import "./Home.css";

export default function Home() {
  const animRef = useRef(null);

 useEffect(() => {
  if (!animRef.current) return;

  let anim;

  fetch("/assets/career.json")
    .then((res) => res.json())
    .then((data) => {
      // Clear any previous animation inside the container
      animRef.current.innerHTML = "";

      anim = lottie.loadAnimation({
        container: animRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: data,
      });
    })
    .catch((err) => console.error("Failed to load animation:", err));

  return () => {
    if (anim) anim.destroy();
    // Clear container on unmount to avoid duplicates
    if (animRef.current) animRef.current.innerHTML = "";
  };
}, []);


  return (
    <section id="home" className="home">
      <div className="home-inner">
        <div className="home-left">
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <p className="home-title">Launch your career</p>
            <img
              src="/assets/arrow.png"
              alt="Arrow"
              className="home-arrow"
            />
          </div>

          <p className="home-lead">
            Connecting young talent with jobs, mentors and practical training.
            Explore opportunities, gain skills, and grow your professional path.
          </p>

          <div className="home-actions">
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>

        <div className="home-right" aria-hidden="true">
          {/* Use the ref for Lottie animation */}
          <div ref={animRef} className="home-animation" />
        </div>
      </div>
    </section>
  );
}
