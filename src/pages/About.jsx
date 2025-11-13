// ============ About.jsx ============
import React from "react";
import { FaBullseye, FaLightbulb, FaHandshake } from "react-icons/fa";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-inner">
        <div className="about-header">
          <h2 className="about-title">About YouthLink</h2>
          <p className="about-subtitle">
            Bridging the gap between young talent and career opportunities
          </p>
        </div>

        <div className="about-content">
          <div className="about-card">
            <div className="about-icon">
              <FaBullseye size={40} color="#00aced" />
            </div>
            <h3>Our Mission</h3>
            <p>
              We connect young professionals with mentors, training programs, and job opportunities 
              to help them launch successful careers.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">
              <FaLightbulb size={40} color="#f1c40f" />
            </div>
            <h3>Our Vision</h3>
            <p>
              Building a future where every young person has access to the resources and 
              guidance they need to thrive professionally.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">
              <FaHandshake size={40} color="#27ae60" />
            </div>
            <h3>Our Approach</h3>
            <p>
              Practical training, real mentorship, and direct connections to opportunities 
              that match your skills and ambitions.
            </p>
          </div>
        </div>

        <div className="about-stats">
          <div className="stat-item">
            <span className="stat-number">10,000+</span>
            <span className="stat-label">Youth Connected</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Partner Companies</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">95%</span>
            <span className="stat-label">Success Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
}
