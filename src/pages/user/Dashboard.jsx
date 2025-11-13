import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import "./Dashboard.css";
import { doc, getDoc } from "firebase/firestore";
import { FaBookOpen } from "react-icons/fa";

function Dashboard() {
  // Firebase data fetching - DO NOT MODIFY
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  // Recommendations
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [recommendedResources, setRecommendedResources] = useState([]);

  // User data for recommendations
  const [userData, setUserData] = useState({
    fullName: "",
    careerTrack: "",
    skills: [],
    careerInterests: [],
    educationLevel: "",
    experienceLevel: "",
    cvText: "",
  });

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Query the users collection where authUID matches the current user's UID
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("authUID", "==", user.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            // Get the first (and should be only) matching document
            const userDoc = querySnapshot.docs[0];
            const data = userDoc.data();
            console.log("Firebase user data:", data);
            setUserName(data.fullName || "User");

            // Set user data for recommendations - pull ALL fields from DB
            setUserData({
              fullName: data.fullName || "User",
              careerTrack: data.careerTrack || "",
              skills: data.skills || [],
              careerInterests: data.careerInterests || [],
              educationLevel: data.educationLevel || "",
              experienceLevel: data.experienceLevel || "",
              cvText: data.cvText || "",
            });
          } else {
            setUserName("User"); // fallback if doc missing
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setUserName("User");
        }
      } else {
        setUserName("");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ============================
  // Fetch Recommendations (Jobs + Resources)
  // ============================
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const db = getFirestore();

        // 🔹 Only run if userData.skills exist
        if (!userData.skills || userData.skills.length === 0) {
          setRecommendedJobs([]);
          setRecommendedResources([]);
          return;
        }

        // Normalize user skills for case-insensitive matching
        const userSkills = userData.skills.map((s) => s.toLowerCase().trim());

        // ---- Fetch jobs collection ----
        const jobsSnap = await getDocs(collection(db, "jobs"));
        const allJobs = jobsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter & rank jobs
        const jobMatches = allJobs
          .map((job) => {
            const required = Array.isArray(job.requiredSkills)
              ? job.requiredSkills
              : [];
            const matchingSkills = required.filter((skill) =>
              userSkills.includes(skill.toLowerCase())
            );
            const matchPercentage =
              (matchingSkills.length / required.length) * 100 || 0;
            return {
              ...job,
              matchingSkills,
              matchPercentage,
              score: matchingSkills.length,
            };
          })
          .filter((job) => job.matchingSkills.length > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);

        setRecommendedJobs(jobMatches);

        // ---- Fetch learning resources collection ----
        const resSnap = await getDocs(collection(db, "learning_resources"));
        const allResources = resSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const resourceMatches = allResources
          .map((res) => {
            const related = Array.isArray(res.relatedSkills)
              ? res.relatedSkills
              : [];
            const matchingSkills = related.filter((skill) =>
              userSkills.includes(skill.toLowerCase())
            );
            return { ...res, matchingSkills, score: matchingSkills.length };
          })
          .filter((r) => r.matchingSkills.length > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 4);

        setRecommendedResources(resourceMatches);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      }
    };

    fetchRecommendations();
  }, [userData.skills]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-inner">
        {/* Left Sidebar */}
        <aside className="dashboard-left">
          <div className="welcome-section">
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#1F2937", // dark gray
                margin: "0 0 6px 0",
                letterSpacing: "0.5px",
              }}
            >
              Welcome Back!
            </h2>

            <div
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#4B5563", // medium gray
                marginBottom: "30px",
              }}
            >
              {userName}
            </div>

            <div className="quick-profile">
              <h3>Profile Overview</h3>
              <div className="profile-item">
                <strong>Career Track:</strong>
                {userData.careerTrack}
              </div>
              <div className="profile-item">
                <strong>Education:</strong> {userData.educationLevel || "N/A"}
              </div>
              <div className="profile-item">
                <strong>Experience:</strong> {userData.experienceLevel || "N/A"}
              </div>
            </div>
          </div>

          <nav className="dashboard-nav">
            {userData.careerInterests.length > 0 && (
              <div className="profile-item">
                <h3
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#888",
                    textTransform: "uppercase",
                    margin: "0 0 10px 0",
                    letterSpacing: "0.5px",
                  }}
                >
                  Career Interests
                </h3>

                <div className="skills-preview" style={{ marginTop: "5px" }}>
                  {userData.careerInterests.slice(0, 5).map((interest, i) => (
                    <span
                      key={i}
                      className="skill-tag"
                      style={{ backgroundColor: "#A78BFA" }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {userData.skills.length > 0 && (
              <div className="nav-section">
                <h3>My Skills</h3>
                <div className="skills-preview">
                  {userData.skills.slice(0, 5).map((skill, i) => (
                    <span key={i} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </nav>
        </aside>

        {/* Right Content */}
        <main className="dashboard-right">
          <div className="dashboard-header">
            <h1>Your Recommendations</h1>
            <p className="subtitle">Based on your skills and preferences</p>
          </div>

          {/* Recommended Jobs */}
          <section className="recommendations-section">
            <div className="section-header">
              <h2>Recommended Jobs</h2>
              <span className="count-badge">
                {recommendedJobs.length} matches
              </span>
            </div>

            {recommendedJobs.length > 0 ? (
              <div className="jobs-grid">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="job-card">
                    <div className="job-header">
                      <h3>{job.jobTitle}</h3>
                      <span className="job-type">{job.jobType}</span>
                    </div>
                    <div className="job-company">{job.company}</div>
                    <div className="job-location">📍 {job.location}</div>

                    <div className="match-info">
                      <div className="match-label">Why recommended:</div>
                      <div className="matching-skills">
                        {job.matchingSkills.map((skill, i) => (
                          <span key={i} className="match-skill">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="match-percentage">
                        {Math.round(job.matchPercentage)}% skill match
                      </div>
                    </div>

                    <button className="job-apply-btn">View Details</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>
                  No job recommendations yet. Add more skills to your profile to
                  get personalized job matches!
                </p>
              </div>
            )}
          </section>
          {/* Recommended Learning Resources */}
          <section className="recommendations-section">
            <div className="section-header">
              <h2>Learning Resources</h2>
              <span className="count-badge">
                {recommendedResources.length} suggestions
              </span>
            </div>

            {recommendedResources.length > 0 ? (
              <div className="resources-grid">
                {recommendedResources.map((resource) => (
                  <div key={resource.id} className="resource-card">
                    <div className="resource-header">
                      
                      <h3>{resource.title}</h3>
                      <span className="resource-type">{resource.cost}</span>
                    </div>
                
                    <div className="resource-platform">
  <FaBookOpen style={{ color: "#6366F1" }} />
  <span>{resource.platform}</span>
</div>

                    <div className="match-info">
                      <div className="match-label">Relevant to:</div>
                      <div className="matching-skills">
                        {resource.matchingSkills.map((skill, i) => (
                          <span key={i} className="match-skill">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        window.open(
                          resource.url,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                      className="resource-btn"
                    >
                      Start Learning
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>
                  No learning resources yet. Add skills to your profile to get
                  personalized learning recommendations!
                </p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
