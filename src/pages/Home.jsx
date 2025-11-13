import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import lottie from "lottie-web";
import career from "../assets/career.json";
import arrow from "../assets/arrow.png";
import "./Home.css";

export default function Home() {
  const animRef = useRef(null);

  useEffect(() => {
    if (!animRef.current) return;
    const anim = lottie.loadAnimation({
      container: animRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: career,
    });
    return () => anim.destroy();
  }, []);

  return (
    <section id="home" className="home">
      <div className="home-inner">
        <div className="home-left">
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <p className="home-title">Launch your career</p>
            <img src={arrow} alt="" className="home-arrow" />
          </div>

          <p className="home-lead">
            Connecting young talent with jobs, mentors and practical training.
            Explore opportunities, gain skills, and grow your professional path.
          </p>

          <div className="home-actions">
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
          </div>
        </div>

        <div className="home-right" aria-hidden="true">
          <div ref={animRef} className="home-animation" />
        </div>
      </div>
    </section>
  );
}