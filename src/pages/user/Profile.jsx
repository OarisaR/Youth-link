import React, { useEffect, useState } from "react";
import "./Profile.css";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CVParser from "./CVParser";
import { AiFillDelete } from "react-icons/ai";
export default function Profile() {
  const publicUrl = process.env.PUBLIC_URL || "";

  const [currentUser, setCurrentUser] = useState(null);
  const [userDocId, setUserDocId] = useState(null);
  const [editSkillsMode, setEditSkillsMode] = useState(false);

  // Auth listener - finds the user's document
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        console.log("User authenticated:", user.uid);

        try {
          // First, try to find existing document with authUID field
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("authUID", "==", user.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            // Found existing document
            const docId = querySnapshot.docs[0].id;
            setUserDocId(docId);
            console.log("Found user document:", docId);
          } else {
            // No document found, use auth UID as document ID
            setUserDocId(user.uid);
            console.log("Will use auth UID as document ID:", user.uid);
          }
        } catch (error) {
          console.error("Error finding user document:", error);
          // Fallback to using auth UID
          setUserDocId(user.uid);
        }
      } else {
        setCurrentUser(null);
        setUserDocId(null);
        console.log("No user authenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  // --- State ---
  const [fullName, setFullName] = useState("Your Name");
  const [profileImage, setProfileImage] = useState(
    `${publicUrl}/assets/user.png`
  );
  const [careerTrack, setCareerTrack] = useState("Web Development");
  const [careerInterests, setCareerInterests] = useState([]);
  const [showInterestsModal, setShowInterestsModal] = useState(false);

  const [projects, setProjects] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectDraft, setProjectDraft] = useState({ summary: "", github: "" });

  const [experiences, setExperiences] = useState([]);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [experienceDraft, setExperienceDraft] = useState({
    role: "",
    company: "",
    description: "",
  });

  const [educationLevel, setEducationLevel] = useState(
    "Bachelor's Degree in Computer Science"
  );

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const [cvText, setCvText] = useState("");

  const availableRoles = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Data Analyst",
    "UI/UX Designer",
    "DevOps Engineer",
    "Project Manager",
    "Product Manager",
    "Business Analyst",
    "Marketing Specialist",
    "Sales Executive",
    "Operations Manager",
  ];

  // --- Load user data on mount ---
  useEffect(() => {
    if (!currentUser || !userDocId) return;

    const loadUserData = async () => {
      try {
        const userRef = doc(db, "users", userDocId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setFullName(data.fullName || "Your Name");
          setProfileImage(data.profileImage || `${publicUrl}/assets/user.png`);
          setCareerTrack(data.careerTrack || "Web Development");
          setCareerInterests(data.careerInterests || []);
          setSkills(data.skills || []);
          setCvText(data.cvText || "");
          setProjects(data.projects || []);
          setExperiences(data.workHistory || []);
          setEducationLevel(
            data.educationLevel || "Bachelor's Degree in Computer Science"
          );
          console.log("Loaded user data successfully from:", userDocId);
        } else {
          // Create empty user document if not exists
          await setDoc(userRef, {
            authUID: currentUser.uid,
            fullName: "Your Name",
            profileImage: `${publicUrl}/assets/user.png`,
            careerTrack: "Web Development",
            careerInterests: [],
            skills: [],
            cvText: "",
            projects: [],
            workHistory: [],
            educationLevel: "Bachelor's Degree in Computer Science",
          });
          console.log("Created new user document:", userDocId);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, [currentUser, userDocId, publicUrl]);

  // --- Handlers ---
  const toggleInterest = async (role) => {
    const updated = careerInterests.includes(role)
      ? careerInterests.filter((r) => r !== role)
      : [...careerInterests, role];
    setCareerInterests(updated);

    if (!currentUser || !userDocId) return;

    try {
      const userRef = doc(db, "users", userDocId);
      await updateDoc(userRef, { careerInterests: updated });
      console.log("Updated career interests");
    } catch (error) {
      console.error("Error updating career interests:", error);
    }
  };

  const addSkill = async () => {
    const v = skillInput.trim();
    if (!v || skills.includes(v)) return;
    const updated = [...skills, v];
    setSkills(updated);
    setSkillInput("");

    if (!currentUser || !userDocId) return;

    try {
      const userRef = doc(db, "users", userDocId);
      await updateDoc(userRef, { skills: updated });
      console.log("Added skill");
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };
  const deleteSkill = async (index) => {
    if (!userDocId) return;

    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);

    try {
      const userRef = doc(db, "users", userDocId);
      await updateDoc(userRef, { skills: updated });
      console.log("Deleted skill at index:", index);
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const saveCvText = async (text) => {
    setCvText(text);

    if (!currentUser || !userDocId) return;

    try {
      const userRef = doc(db, "users", userDocId);
      await updateDoc(userRef, { cvText: text });
      console.log("Saved CV text");
    } catch (error) {
      console.error("Error saving CV text:", error);
    }
  };

  const saveProject = async () => {
    if (!projectDraft.summary.trim()) return;
    const updated = [...projects, projectDraft];
    setProjects(updated);
    setProjectDraft({ summary: "", github: "" });
    setShowProjectModal(false);

    if (!currentUser || !userDocId) return;

    try {
      const userRef = doc(db, "users", userDocId);
      await updateDoc(userRef, { projects: updated });
      console.log("Saved project");
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const saveExperience = async () => {
    if (!experienceDraft.description.trim()) return;
    const updated = [...experiences, experienceDraft];
    setExperiences(updated);
    setExperienceDraft({ role: "", company: "", description: "" });
    setShowExperienceModal(false);

    if (!currentUser || !userDocId) return;

    try {
      const userRef = doc(db, "users", userDocId);
      await updateDoc(userRef, { workHistory: updated });
      console.log("Saved experience");
    } catch (error) {
      console.error("Error saving experience:", error);
    }
  };
  // Delete a project
  const deleteProject = async (index) => {
    if (!userDocId) return;

    const updated = [...projects];
    updated.splice(index, 1);
    setProjects(updated);

    try {
      const userRef = doc(db, "users", userDocId);
      await updateDoc(userRef, { projects: updated });
      console.log("Deleted project at index:", index);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Delete an experience
  const deleteExperience = async (index) => {
    if (!userDocId) return;

    const updated = [...experiences];
    updated.splice(index, 1);
    setExperiences(updated);

    try {
      const userRef = doc(db, "users", userDocId);
      await updateDoc(userRef, { workHistory: updated });
      console.log("Deleted experience at index:", index);
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file || !currentUser || !userDocId) return;

    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, GIF, or WebP)");
      return;
    }

    // Validate file size (max 1MB for Firestore base64 storage)
    const maxSize = 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      alert("Image size should be less than 1MB");
      return;
    }

    // Convert to base64 and save
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;

      // Update local state immediately
      setProfileImage(base64String);

      try {
        // Save to Firestore
        const userRef = doc(db, "users", userDocId);
        await updateDoc(userRef, { profileImage: base64String });
        console.log("Profile image uploaded successfully");
      } catch (error) {
        console.error("Error saving image:", error);
        alert("Failed to save image. Please try again.");
        // Revert to previous image on error
        setProfileImage(`${publicUrl}/assets/user.png`);
      }
    };

    reader.onerror = () => {
      alert("Failed to read image file. Please try again.");
    };

    reader.readAsDataURL(file);
  };
  return (
    <div className="profile-page">
      <div className="profile-inner">
        <aside className="profile-left">
          <h2>Personal Details</h2>

          <div className="profile-avatar-wrap">
            <div className="avatar-container">
              <img
                src={profileImage || `${publicUrl}/assets/user.png`}
                alt="Profile"
                className="profile-avatar"
                onError={(e) => {
                  e.target.src = `${publicUrl}/assets/user.png`;
                }}
              />
              <label
                htmlFor="profile-image-upload"
                className="avatar-edit-icon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </label>
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>
            <div className="profile-name">{fullName}</div>
          </div>

          <div className="section">
            <div className="section-head">
              <strong>Work Preferences</strong>
              <button
                className="small-edit"
                onClick={() => setShowInterestsModal(true)}
                aria-label="Edit work preferences"
              >
                ✎
              </button>
            </div>
            <div className="muted">Career track</div>
            <div className="career-track">{careerTrack}</div>

            <div className="muted">Desired roles</div>
            <div className="chips">
              {careerInterests.length ? (
                careerInterests.map((r) => (
                  <span key={r} className="chip">
                    {r}
                  </span>
                ))
              ) : (
                <div className="placeholder">No roles selected</div>
              )}
            </div>
          </div>

          <div className="section">
            <strong>Education</strong>
            <div className="muted">{educationLevel}</div>
          </div>
        </aside>

        <main className="profile-right">
          <h2>Experience</h2>

          <div className="card">
            <div className="card-head">
              <strong>Projects</strong>
              <button
                className="btn-add"
                onClick={() => setShowProjectModal(true)}
              >
                + Add
              </button>
            </div>
            {projects.length ? (
              projects.map((p, i) => (
                <div
                  key={i}
                  className="item"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div className="item-summary">{p.summary}</div>
                    {p.github && (
                      <a
                        href={p.github}
                        className="item-link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                  <AiFillDelete
                    style={{
                      cursor: "pointer",
                      color: "red",
                      fontSize: "20px",
                    }}
                    onClick={() => deleteProject(i)}
                  />
                </div>
              ))
            ) : (
              <div className="placeholder large">
                No projects yet — add your first project.
              </div>
            )}
          </div>

          <div className="card">
            <div className="card-head">
              <strong>Work History</strong>
              <button
                className="btn-add"
                onClick={() => setShowExperienceModal(true)}
              >
                + Add
              </button>
            </div>

            {experiences.length ? (
              experiences.map((e, i) => (
                <div
                  key={i}
                  className="item"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div className="item-role">
                      {e.role} — {e.company}
                    </div>
                    <div className="item-summary">{e.description}</div>
                  </div>
                  <AiFillDelete
                    style={{
                      cursor: "pointer",
                      color: "red",
                      fontSize: "20px",
                    }}
                    onClick={() => deleteExperience(i)}
                  />
                </div>
              ))
            ) : (
              <div className="placeholder large">
                No work history — add roles you held.
              </div>
            )}
          </div>

          <div className="card">
            <div
              className="card-head"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong>Skills</strong>
              <button
                className="btn-small"
                onClick={() => setEditSkillsMode(!editSkillsMode)}
              >
                {editSkillsMode ? "Done" : "Edit"}
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <input
                className="input-skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add skill"
              />
              <button
                style={{ backgroundColor: "#CDEB3C" }}
                className="btn-small"
                onClick={addSkill}
              >
                + Add
              </button>
            </div>

            <div className="chips" style={{ marginTop: 8 }}>
              {skills.length ? (
                skills.map((s, i) => (
                  <span
                    key={s}
                    className="chip"
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    {s}
                    {editSkillsMode && (
                      <AiFillDelete
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => deleteSkill(i)}
                      />
                    )}
                  </span>
                ))
              ) : (
                <div className="placeholder">No skills yet</div>
              )}
            </div>
          </div>

          <CVParser
            userDocId={userDocId}
            currentUser={currentUser}
            onCVSaved={(parsed) => {
              setCvText(parsed.rawText);
              console.log("Parsed CV data:", parsed);
            }}
          />
        </main>
      </div>

      {showInterestsModal && (
        <div className="modal">
          <div className="modal-card">
            <h3>What roles are you looking for?</h3>
            <div className="roles-list">
              {availableRoles.map((r) => (
                <label key={r} className="role-row">
                  <input
                    type="checkbox"
                    checked={careerInterests.includes(r)}
                    onChange={() => toggleInterest(r)}
                  />
                  <span>{r}</span>
                </label>
              ))}
            </div>
            <div className="modal-actions">
              <button
                className="btn-link"
                onClick={() => setShowInterestsModal(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
  
      {showProjectModal && (
        <div className="modal">
          <div className="modal-card">
            <h3>Add Project</h3>
            <textarea
              value={projectDraft.summary}
              onChange={(e) =>
                setProjectDraft((d) => ({ ...d, summary: e.target.value }))
              }
              placeholder="Project summary"
            />
            <input
              value={projectDraft.github}
              onChange={(e) =>
                setProjectDraft((d) => ({ ...d, github: e.target.value }))
              }
              placeholder="GitHub link (optional)"
            />
            <div className="modal-actions">
              <button className="btn" onClick={saveProject}>
                Save
              </button>
              <button
                className="btn-link"
                onClick={() => setShowProjectModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showExperienceModal && (
        <div className="modal">
          <div className="modal-card">
            <h3>Add Experience</h3>
            <input
              value={experienceDraft.role}
              onChange={(e) =>
                setExperienceDraft((d) => ({ ...d, role: e.target.value }))
              }
              placeholder="Role (e.g., Software Engineer)"
            />
            <input
              value={experienceDraft.company}
              onChange={(e) =>
                setExperienceDraft((d) => ({ ...d, company: e.target.value }))
              }
              placeholder="Company"
            />
            <textarea
              value={experienceDraft.description}
              onChange={(e) =>
                setExperienceDraft((d) => ({
                  ...d,
                  description: e.target.value,
                }))
              }
              placeholder="Description"
            />
            <div className="modal-actions">
              <button className="btn" onClick={saveExperience}>
                Save
              </button>
              <button
                className="btn-link"
                onClick={() => setShowExperienceModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
