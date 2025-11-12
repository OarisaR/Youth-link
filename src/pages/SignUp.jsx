import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth , db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
 // your Firestore config
import "./SignUp.css";
export default function SignUp() {

    const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [careerTrack, setCareerTrack] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirm ||
      !education ||
      !experience ||
      !careerTrack
    ) {
      return "Please fill out all fields.";
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "Please enter a valid email.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (password !== confirm) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User registered:", user);
      await setDoc(doc(db,"users",user.uid),{
        name,
        email,
        education,
        experience,
        careerTrack,
        createdAt: new Date()
      });
      // You can also store additional info (name, education, etc.) in Firestore here
      setName("");
      setEmail("");
      setPassword("");
      setConfirm("");
      setEducation("");
      setExperience("");
      setCareerTrack("");
      navigate("/user/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="yl-signup" aria-labelledby="signup-title">
      <div className="yl-signup__backdrop" aria-hidden="true" />
      <div className="yl-signup__card" role="dialog" aria-modal="true">
        <h2 id="signup-title">Create your account</h2>

        <form className="yl-signup__form" onSubmit={handleSubmit} noValidate>
          <label>
            <span className="label-text">Full name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First Last"
              required
              aria-label="Full name"
            />
          </label>

          <label>
            <span className="label-text">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="harry@example.com"
              required
              aria-label="Email"
            />
          </label>

          <label>
            <span className="label-text">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              aria-label="Password"
            />
          </label>

          <label>
            <span className="label-text">Confirm password</span>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-type password"
              required
              aria-label="Confirm password"
            />
          </label>

          <label>
            <span className="label-text">Education level / Department</span>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="e.g., Computer Science"
              required
              aria-label="Education level or department"
            />
          </label>

          <label>
            <span className="label-text">Experience level</span>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              aria-label="Experience level"
            >
              <option value="">Select experience</option>
              <option value="Fresher">Fresher</option>
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select>
          </label>

          <label>
            <span className="label-text">Preferred career track</span>
            <input
              type="text"
              value={careerTrack}
              onChange={(e) => setCareerTrack(e.target.value)}
              placeholder="e.g., Web Development, Data, Design"
              required
              aria-label="Preferred career track"
            />
          </label>

          {error && <div className="yl-signup__error">{error}</div>}

          <button
            type="submit"
            onClick={handleSubmit}
            className="yl-signup__submit"
          >
            Sign up
          </button>
        </form>

        <p className="yl-signup__meta">
          Already have an account? <a href="/signin">Sign in</a>
        </p>
      </div>
    </section>
  );
}
