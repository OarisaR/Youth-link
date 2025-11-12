import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  const handleScroll = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="yl-footer" role="contentinfo" aria-label="Footer">
      <div className="yl-container">
        <div className="yl-brand-col">
          <div className="yl-brand" onClick={(e) => handleScroll(e, "home")} role="button" tabIndex={0} aria-label="Go to home">
            <span className="yl-logo">YOUTH</span><span className="yl-link">LINK</span>
          </div>
          <p className="yl-tag">Connecting youth to careers, training and mentors.</p>
        </div>

        <nav className="yl-links-col" aria-label="Footer navigation">
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="#home" onClick={(e) => handleScroll(e, "home")}>Home</a></li>
              <li><a href="#about" onClick={(e) => handleScroll(e, "about")}>About</a></li>
              <li><a href="#programs" onClick={(e) => handleScroll(e, "programs")}>Programs</a></li>
              <li><a href="#contact" onClick={(e) => handleScroll(e, "contact")}>Contact</a></li>
            </ul>
          </div>

          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/privacy">Privacy</a></li>
              <li><a href="/terms">Terms</a></li>
            </ul>
          </div>

          <div>
            <h4>Get involved</h4>
            <ul>
              <li><a href="#volunteer" onClick={(e) => handleScroll(e, "volunteer")}>Volunteer</a></li>
              <li><a href="/partners">Partners</a></li>
              <li><a href="/donate">Donate</a></li>
            </ul>
          </div>
        </nav>

        <div className="yl-social-col" aria-hidden={false}>
          <h4>Follow</h4>
          <div className="yl-social">
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 5.92c-.66.3-1.36.5-2.09.59a3.7 3.7 0 001.62-2.04 7.36 7.36 0 01-2.34.9 3.68 3.68 0 00-6.27 3.36A10.44 10.44 0 013 4.89a3.68 3.68 0 001.14 4.91 3.6 3.6 0 01-1.67-.46v.05a3.68 3.68 0 002.95 3.61c-.29.08-.6.12-.92.12-.22 0-.44-.02-.65-.06a3.69 3.69 0 003.44 2.55A7.38 7.38 0 012 19.54a10.4 10.4 0 005.63 1.65c6.76 0 10.47-5.6 10.47-10.47v-.48A7.2 7.2 0 0022 5.92z" /></svg>
            </a>
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.1v-2.9h2.1V9.1c0-2.1 1.24-3.3 3.14-3.3.91 0 1.86.16 1.86.16v2.05h-1.05c-1.03 0-1.35.64-1.35 1.3v1.56h2.3l-.37 2.9h-1.93v7A10 10 0 0022 12z" /></svg>
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 11.01 0zM3 8.98h4v12H3v-12zM9 8.98h3.78v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.66 4.77 6.11v6.3h-4v-5.58c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.96v5.67H9v-12z" /></svg>
            </a>
          </div>
          <p className="yl-copy">© {year} YouthLink. All rights reserved.</p>
        </div>
      </div>

      <style>{`
        :root {
          --bg: #0f172a;
          --muted: #9aa3b2;
          --accent: #0ea5e9;
          --primary: #2563eb;
          --card: #0b1220;
          --radius: 12px;
        }

        .yl-footer {
          background: linear-gradient(180deg, var(--bg), #071127);
          color: #e6eef9;
          padding: 2.25rem 1rem;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        }
        .yl-container {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr 220px;
          gap: 1.5rem;
          align-items: start;
        }

        .yl-brand {
          display: inline-flex;
          align-items: baseline;
          gap: 0.4rem;
          cursor: pointer;
          font-weight: 800;
          font-size: 1.25rem;
          color: #fff;
        }
        .yl-logo { color: var(--accent); letter-spacing: -0.6px; }
        .yl-tag { color: var(--muted); margin-top: 0.5rem; max-width: 320px; line-height: 1.4; }

        .yl-links-col h4 {
          margin: 0 0 0.6rem 0;
          font-size: 0.95rem;
          color: #fff;
        }
        .yl-links-col div { margin-bottom: 0.6rem; }
        .yl-links-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .yl-links-col li { margin: 0.4rem 0; }
        .yl-links-col a {
          color: var(--muted);
          text-decoration: none;
          font-size: 0.95rem;
        }
        .yl-links-col a:hover,
        .yl-links-col a:focus { color: var(--accent); outline: none; }

        .yl-social-col { text-align: right; }
        .yl-social { display: flex; gap: 0.6rem; justify-content: flex-end; margin-bottom: 0.8rem; }
        .yl-social a { color: var(--muted); display:inline-flex; align-items:center; justify-content:center; width:38px; height:38px; border-radius:8px; background: rgba(255,255,255,0.02); transition: transform 120ms ease, background 120ms ease; }
        .yl-social a:hover { color: #fff; transform: translateY(-3px); background: rgba(255,255,255,0.04); }
        .yl-copy { color: var(--muted); font-size: 0.85rem; margin: 0; }

        /* Responsive */
        @media (max-width: 880px) {
          .yl-container { grid-template-columns: 1fr; text-align: left; }
          .yl-social-col { text-align: left; margin-top: 1rem; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;