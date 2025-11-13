import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function CVParser({ userDocId, currentUser, onCVSaved }) {
  const [rawText, setRawText] = useState("");
  const [parsing, setParsing] = useState(false);

  const parseCV = (text) => {
    // Simple intelligent parsing logic
    const lines = text.split("\n").filter((line) => line.trim());

    const parsed = {
      rawText: text, // Always keep original
      metadata: {
        uploadedAt: new Date().toISOString(),
        wordCount: text.split(/\s+/).length,
        lineCount: lines.length,
      },

      // Extract sections based on common CV patterns
      sections: extractSections(lines),

      // Extract structured data
      extractedData: {
        emails: extractEmails(text),
        phones: extractPhones(text),
        links: extractLinks(text),
        dates: extractDates(text),
        skills: extractSkills(text),
        education: extractEducation(lines),
        experience: extractExperience(lines),
      },

      // For future AI analysis
      keywords: extractKeywords(text),

      // Searchable lowercase version
      searchableText: text.toLowerCase(),
    };

    return parsed;
  };

  const extractSections = (lines) => {
    const sections = {};
    let currentSection = "general";
    let sectionContent = [];

    const sectionHeaders = [
      "education",
      "experience",
      "work experience",
      "employment",
      "skills",
      "projects",
      "certifications",
      "achievements",
      "summary",
      "objective",
      "about",
      "contact",
    ];

    lines.forEach((line) => {
      const lowerLine = line.toLowerCase().trim();

      // Check if this line is a section header
      const matchedHeader = sectionHeaders.find(
        (header) =>
          lowerLine === header ||
          lowerLine.startsWith(header + ":") ||
          lowerLine === header + "s"
      );

      if (matchedHeader) {
        // Save previous section
        if (sectionContent.length > 0) {
          sections[currentSection] = sectionContent.join("\n");
        }
        // Start new section
        currentSection = matchedHeader;
        sectionContent = [];
      } else {
        sectionContent.push(line);
      }
    });

    // Save last section
    if (sectionContent.length > 0) {
      sections[currentSection] = sectionContent.join("\n");
    }

    return sections;
  };

  const extractEmails = (text) => {
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
    return text.match(emailRegex) || [];
  };

  const extractPhones = (text) => {
    const phoneRegex =
      /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    return text.match(phoneRegex) || [];
  };

  const extractLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-z]+\.com[^\s]*)/gi;
    const links = text.match(urlRegex) || [];

    // Categorize links
    return {
      all: links,
      github: links.filter((l) => l.includes("github")),
      linkedin: links.filter((l) => l.includes("linkedin")),
      portfolio: links.filter(
        (l) => !l.includes("github") && !l.includes("linkedin")
      ),
    };
  };

  const extractDates = (text) => {
    // Match various date formats
    const datePatterns = [
      /\b\d{4}\s*-\s*\d{4}\b/g, // 2020-2023
      /\b\d{4}\s*to\s*\d{4}\b/gi, // 2020 to 2023
      /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*\d{4}/gi, // Jan 2020
      /\b\d{1,2}\/\d{4}\b/g, // 01/2020
    ];

    let dates = [];
    datePatterns.forEach((pattern) => {
      const matches = text.match(pattern);
      if (matches) dates = [...dates, ...matches];
    });

    return dates;
  };

  const extractSkills = (text) => {
    // Common tech skills to look for
    const commonSkills = [
      "javascript",
      "python",
      "java",
      "react",
      "node",
      "typescript",
      "sql",
      "mongodb",
      "aws",
      "docker",
      "kubernetes",
      "git",
      "html",
      "css",
      "angular",
      "vue",
      "express",
      "django",
      "machine learning",
      "data analysis",
      "agile",
      "scrum",
    ];

    const foundSkills = [];
    const lowerText = text.toLowerCase();

    commonSkills.forEach((skill) => {
      if (lowerText.includes(skill)) {
        foundSkills.push(skill);
      }
    });

    return foundSkills;
  };

  const extractEducation = (lines) => {
    const education = [];
    const degreeKeywords = [
      "bachelor",
      "master",
      "phd",
      "diploma",
      "degree",
      "university",
      "college",
    ];

    lines.forEach((line, idx) => {
      const lowerLine = line.toLowerCase();
      if (degreeKeywords.some((keyword) => lowerLine.includes(keyword))) {
        education.push({
          text: line,
          context: lines.slice(Math.max(0, idx - 1), idx + 2).join(" | "),
        });
      }
    });

    return education;
  };

  const extractExperience = (lines) => {
    const experience = [];
    const roleKeywords = [
      "developer",
      "engineer",
      "manager",
      "analyst",
      "designer",
      "intern",
    ];

    lines.forEach((line, idx) => {
      const lowerLine = line.toLowerCase();
      if (roleKeywords.some((keyword) => lowerLine.includes(keyword))) {
        experience.push({
          text: line,
          context: lines.slice(Math.max(0, idx - 1), idx + 3).join(" | "),
        });
      }
    });

    return experience;
  };

  const extractKeywords = (text) => {
    // Remove common words and extract important terms
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 3);

    // Count frequency
    const frequency = {};
    words.forEach((word) => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    // Return top 20 keywords
    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word]) => word);
  };

  const handleSave = async () => {
    if (!rawText.trim() || !currentUser || !userDocId) return;

    setParsing(true);

    try {
      const parsedCV = parseCV(rawText);

      const userRef = doc(db, "users", userDocId);
      await updateDoc(userRef, {
        cvText: rawText, // Keep simple text for display
        cvParsed: parsedCV, // Store structured data
        cvUpdatedAt: new Date().toISOString(),
      });

      console.log("CV saved and parsed successfully");
      if (onCVSaved) onCVSaved(parsedCV);

      alert("CV saved successfully! Advanced parsing completed.");
    } catch (error) {
      console.error("Error saving CV:", error);
      alert("Error saving CV. Please try again.");
    } finally {
      setParsing(false);
    }
  };

  return (
    <div className="cv-parser">
      <div className="card">
        <div className="card-head">
          <strong>CV / Resume</strong>
          <button
            className="btn-small"
            onClick={handleSave}
            disabled={!rawText.trim() || parsing}
          >
            {parsing ? "Parsing..." : "Save & Parse"}
          </button>
        </div>

        <textarea
          className="cv-text"
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder="Paste your CV text here...

        The system will automatically extract:  

        • Contact information (emails, phones, links)
        • Education details
        • Work experience
        • Skills and technologies
        • Dates and timelines
        • Section structure"
          rows={15}
        />

        <div className="cv-tips">
          <small>
            💡 <strong>Tip:</strong> Include section headers like "Education",
            "Experience", "Skills" for better parsing. The more structured your
            CV, the better the analysis!
          </small>
        </div>
      </div>
    </div>
  );
}
