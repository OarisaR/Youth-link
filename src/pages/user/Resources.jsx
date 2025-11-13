
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "./Resources.css";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadResources = async () => {
      try {
        const db = getFirestore();
        const ref = collection(db, "learning_resources");
        const snap = await getDocs(ref);

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setResources(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load resources.");
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  if (loading) {
    return (
      <div className="res-page">
        <p className="res-status">Loading resources...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="res-page">
        <p className="res-status res-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="res-page">
      <div className="res-container">
        {/* Header */}
        <header className="res-header">
          <div>
            <h1 className="res-title">Learning Resources</h1>
            <p className="res-subtitle">
              Upskill yourself with curated resources.
            </p>
          </div>
          <div className="res-badge">YouthLink</div>
        </header>

        {/* Grid */}
        <section className="res-grid">
          {resources.map((item) => (
            <ResourceCard key={item.id} item={item} onDetails={() => setSelected(item)} />
          ))}
        </section>
      </div>

      {/* Modal */}
      {selected && (
        <div className="res-modal-backdrop" onClick={() => setSelected(null)}>
          <div className="res-modal" onClick={(e) => e.stopPropagation()}>
            <div className="res-modal-header">
              <h2 className="res-modal-title">{selected.title}</h2>
              <button className="res-modal-close" onClick={() => setSelected(null)}>
                ✕
              </button>
            </div>

            <div className="res-modal-section">
              <span className="res-modal-label">Platform</span>
              <span className="res-modal-value">{selected.platform}</span>
            </div>

            <div className="res-modal-section">
  <span className="res-modal-label">Cost</span>
  <span className="res-modal-pill">{selected.cost}</span>
</div>


            <div className="res-modal-section">
              <span className="res-modal-label">Related Skills</span>
              <div className="res-modal-skills">
                {(selected.relatedSkills || []).map((skill) => (
                  <span key={skill} className="res-modal-skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="res-modal-section">
              <span className="res-modal-label">Link</span>
              <a
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
                className="res-modal-link"
              >
                Visit Resource →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ----- Resource Card ----- */
function ResourceCard({ item, onDetails }) {
  return (
    <article className="res-card">
      <div className="res-card-top">
        <div>
          <h2 className="res-card-title">{item.title}</h2>
          <p className="res-card-platform">{item.platform}</p>
        </div>
      </div>

      <div className="res-card-footer">
        <button className="res-card-btn" onClick={onDetails}>
          View Details
        </button>
      </div>
    </article>
  );
}
