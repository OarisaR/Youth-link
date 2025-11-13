
import React, { useEffect, useMemo, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "./Jobs.css";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const db = getFirestore(); // assumes Firebase app already initialized
        const jobsRef = collection(db, "jobs");
        const snap = await getDocs(jobsRef);
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const s = search.trim().toLowerCase();

      const bySearch = s
        ? [job.jobTitle, job.company]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(s))
        : true;

      const byType = jobType
        ? (job.jobType || "").toLowerCase() === jobType.toLowerCase()
        : true;

      const byExperience = experienceLevel
        ? (job.experienceLevel || "").toLowerCase() ===
          experienceLevel.toLowerCase()
        : true;

      return bySearch && byType && byExperience;
    });
  }, [jobs, search, jobType, experienceLevel]);

  const jobTypes = useMemo(
    () =>
      Array.from(new Set(jobs.map((j) => j.jobType).filter(Boolean))).sort(),
    [jobs]
  );

  const expLevels = useMemo(
    () =>
      Array.from(
        new Set(jobs.map((j) => j.experienceLevel).filter(Boolean))
      ).sort(),
    [jobs]
  );

  const closeModal = () => setSelectedJob(null);

  if (loading) {
    return (
      <div className="jobs-page">
        <div className="jobs-container">
          <p className="jobs-status-text">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jobs-page">
        <div className="jobs-container">
          <p className="jobs-status-text jobs-error-text">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="jobs-page">
      <div className="jobs-container">
        {/* Header */}
        <header className="jobs-header">
          <div>
            <h1 className="jobs-title">Job Board</h1>
            <p className="jobs-subtitle">
              Find opportunities that match your skills and interests.
            </p>
          </div>
          <div className="jobs-badge">YouthLink Jobs</div>
        </header>

        {/* Filters */}
        <section className="jobs-filters">
          <div className="jobs-filter-group">
            <label className="jobs-label">
              Search
              <input
                className="jobs-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title or company"
              />
            </label>
          </div>

          <div className="jobs-filter-group">
            <label className="jobs-label">
              Job Type
              <select
                className="jobs-select"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="">All</option>
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="jobs-filter-group">
            <label className="jobs-label">
              Experience
              <select
                className="jobs-select"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                <option value="">All</option>
                {expLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        {/* Jobs list */}
        {filteredJobs.length === 0 ? (
          <div className="jobs-empty">
            <h2 className="jobs-empty-title">No jobs found</h2>
            <p className="jobs-empty-text">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <section className="jobs-grid">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onDetails={() => setSelectedJob(job)}
              />
            ))}
          </section>
        )}
      </div>

      {/* Details Modal */}
      {selectedJob && (
        <div className="jobs-modal-backdrop" onClick={closeModal}>
          <div
            className="jobs-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="jobs-modal-header">
              <div>
                <h2 className="jobs-modal-title">{selectedJob.jobTitle}</h2>
                <p className="jobs-modal-company">
                  {selectedJob.company}
                  {selectedJob.location && (
                    <span className="jobs-modal-location">
                      {" "}
                      • {selectedJob.location}
                    </span>
                  )}
                </p>
              </div>
              <button className="jobs-modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="jobs-modal-section">
              <span className="jobs-modal-label">Job Type</span>
              <span className="jobs-modal-pill">
                {selectedJob.jobType || "Not specified"}
              </span>
            </div>

            <div className="jobs-modal-section">
              <span className="jobs-modal-label">Experience Level</span>
              <span className="jobs-modal-value">
                {selectedJob.experienceLevel || "Not specified"}
              </span>
            </div>

            <div className="jobs-modal-section">
              <span className="jobs-modal-label">Required Skills</span>
              <div className="jobs-modal-skills">
                {(selectedJob.requiredSkills || []).map((skill) => (
                  <span key={skill} className="jobs-modal-skill-chip">
                    {skill}
                  </span>
                ))}
                {(!selectedJob.requiredSkills ||
                  selectedJob.requiredSkills.length === 0) && (
                  <span className="jobs-modal-value">Not specified</span>
                )}
              </div>
            </div>

            {selectedJob.description && (
              <div className="jobs-modal-section">
                <span className="jobs-modal-label">Description</span>
                <p className="jobs-modal-body-text">
                  {selectedJob.description}
                </p>
              </div>
            )}

            {selectedJob.salary && (
              <div className="jobs-modal-section">
                <span className="jobs-modal-label">Salary</span>
                <span className="jobs-modal-value">
                  {selectedJob.salary}
                </span>
              </div>
            )}

            <div className="jobs-modal-footer">
              <button
                className="jobs-modal-apply-btn"
                onClick={() =>
                  alert("Application flow coming soon!")
                }
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------- SIMPLE CARD: title + company + type + button ------- */

function JobCard({ job, onDetails }) {
  return (
    <article className="job-card">
      <div className="job-card-top">
        <div>
          <h2 className="job-card-title">{job.jobTitle}</h2>
          <p className="job-card-company">
            {job.company}
            {job.location && (
              <span className="job-card-location"> • {job.location}</span>
            )}
          </p>
        </div>
        <span className="job-card-pill">{job.jobType}</span>
      </div>

      <div className="job-card-footer job-card-footer--simple">
        <button className="job-card-details-btn" onClick={onDetails}>
          View Details
        </button>
      </div>
    </article>
  );
}




