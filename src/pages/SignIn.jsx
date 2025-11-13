import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import bg from "./signin.png"
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import "./SignIn.css";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Signed in successfully:", userCredential.user);

      navigate("/user/dashboard");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError(err.message); // Display Firebase error
    }
  };

  return (
   <section
  id="signin"
  className="yl-signin"
  style={{
    backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat",      
    backgroundPosition: "center center", 
    backgroundSize: "cover",             // zooms in to fill the section
    backgroundAttachment: "fixed",       
  }}
>

      <div
        className="yl-signin__backdrop"
        aria-hidden="true"
      />
      <img
        src="/assets/logo.png"
        style={{ width: "200px", height: "auto",marginTop:"-15px" }}
        alt="YouthLink Logo"
        className="yl-signin__logo"
      />
      <div
        className="yl-signin__card"
        role="dialog"
        aria-labelledby="signin-title"
      >
        <h2 id="signin-title">Welcome back!</h2>

        <form onSubmit={handleSubmit} className="yl-signin__form" noValidate>
          <label>
            <span className="label-text">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="harry@example.com"
              aria-label="Email"
            />
          </label>

          <label>
            <span className="label-text">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              aria-label="Password"
            />
          </label>

          {error && <div className="yl-signin__error">{error}</div>}

          <button
            type="submit"
            onClick={handleSubmit}
            className="yl-signin__submit"
          >
            Sign In
          </button>
        </form>

        <p className="yl-signin__meta">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </section>
  );
}
