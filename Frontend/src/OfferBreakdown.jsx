import React, { useState } from 'react';

export default function OfferBreakdown({ data }) {
  const jobDetails = data?.jobDetails || "Explore the key responsibilities, work environment, qualifications.";
  const compensation = data?.compensation || "Competitive salary packages, bonuses, and stock options.";
  const benefits = data?.benefits || "Flexible working hours, health insurance, development programs.";

  return (
    <div style={styles.body}>
      <h1 style={styles.h1}>OFFER BREAKDOWN</h1>
      <h2 style={styles.h2}>Job Title</h2>

      <div style={styles.container}>
        <OfferBox title="Job Details" content={jobDetails} flagText={data?.redFlags?.jobDetails} />
        <OfferBox title="Compensation" content={compensation} flagText={data?.redFlags?.compensation} />
        <OfferBox title="Benefits" content={benefits} flagText={data?.redFlags?.benefits} />
      </div>
    </div>
  );
}

function OfferBox({ title, content, flagText }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      style={{
        ...styles.rectangle,
        ...(showTooltip ? styles.rectangleHover : {}),
      }}
    >
      <h2 style={styles.cardTitle}>{title}</h2>
      <p>{content}</p>

      <div
        style={styles.flag}
        tabIndex={0}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      ></div>

      {showTooltip && flagText && (
        <div style={styles.flagTooltip}>
          <strong>{title}:</strong>
          <br />
          {flagText}
        </div>
      )}
    </div>
  );
}

const styles = {
  body: {
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: "'Jacques Francois', serif",
    textAlign: 'center',
    padding: '50px',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  h1: {
    fontSize: '2.8rem',
    marginBottom: '20px',
    marginTop: '10px',
    color: '#f2f2f2ff',
    textShadow: '0 0 20px #dcdcdcff',
  },
  h2: {
    fontSize: '2rem',
    marginBottom: '40px',
    fontWeight: 'lighter',
    color: '#ffffff',
  },
  cardTitle: {
    fontSize: '1.8rem',
    marginBottom: '20px',
    color: '#ffffff',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '40px',
  },
  rectangle: {
    position: 'relative',
    width: '340px',
    height: '450px',
    backgroundColor: '#1c1c1c',
    border: '2px solid #b7fdaa',
    borderRadius: '20px',
    padding: '30px',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease-in-out',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  rectangleHover: {
    transform: 'scale(1.05)',
    boxShadow: '0px 0px 25px 5px rgba(183, 253, 170, 0.6)',
    zIndex: 10,
  },
  flag: {
    position: 'absolute',
    top: '40px',
    right: '-20px',
    width: '20px',
    height: '120px',
    backgroundColor: '#d93025',
    borderRadius: '6px 0 0 6px',
    boxShadow: '0 0 10px rgba(217, 48, 37, 0.8)',
    cursor: 'pointer',
  },
  flagTooltip: {
    position: 'absolute',
    top: '40px',
    right: '25px',
    backgroundColor: '#d93025',
    color: '#fff',
    padding: '14px 20px',
    borderRadius: '12px',
    fontSize: '0.95rem',
    width: '240px',
    boxShadow: '0 0 15px rgba(217, 48, 37, 0.9)',
    zIndex: 1000,
    textAlign: 'left',
  },
};