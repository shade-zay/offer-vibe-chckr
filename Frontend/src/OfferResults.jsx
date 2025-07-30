import React from "react";

export default function OfferResults({ parsedData }) {
  if (!parsedData) return null;

  const { jobDetails, compensation, benefits, redFlags } = parsedData;

  // Helper to format bullet-style text into <li> items
  const formatToList = (text) => {
    if (!text) return null;

    const lines = text
      .split(/\n|-\s+/) // split by newline or "- "
      .map(line => line.trim())
      .filter(line => line.length > 0);

    return (
      <ul style={{ paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
        {lines.map((item, index) => (
          <li key={index} style={{ marginBottom: "6px" }}>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ background: "#111", color: "#fff", padding: "40px", minHeight: "100vh" }}>
      <h2 style={styles.heading}>Job Details</h2>
      {formatToList(jobDetails)}
      {redFlags?.jobDetails && (
        <p style={styles.redFlag}>⚠️ {redFlags.jobDetails}</p>
      )}

      <h2 style={styles.heading}>Compensation</h2>
      {formatToList(compensation)}
      {redFlags?.compensation && (
        <p style={styles.redFlag}>⚠️ {redFlags.compensation}</p>
      )}

      <h2 style={styles.heading}>Benefits</h2>
      {formatToList(benefits)}
      {redFlags?.benefits && (
        <p style={styles.redFlag}>⚠️ {redFlags.benefits}</p>
      )}
    </div>
  );
}

const styles = {
  heading: {
    fontSize: "1.8rem",
    marginBottom: "10px",
    marginTop: "30px",
    color: "#b7fdaa",
  },
  redFlag: {
    color: "#ff6b6b",
    fontWeight: "bold",
    marginTop: "-10px",
    marginBottom: "20px",
  },
};

