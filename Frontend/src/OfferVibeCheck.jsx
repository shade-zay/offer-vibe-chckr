import React, { useRef, useState } from "react";
import axios from "axios";

export default function OfferVibeCheck({ onParseComplete }) {
  const fileInputRef = useRef(null);
  const [hovered, setHovered] = useState({ h1: false, h2: false, btn: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/parse", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const parsedData = response.data;
      onParseComplete(parsedData);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Something went wrong. Please try again.");
    }
  }
};

  return (
    <div style={styles.body}>
      <h1
        style={{ ...styles.h1, ...(hovered.h1 ? styles.hoveredText : {}) }}
        onMouseEnter={() => setHovered((prev) => ({ ...prev, h1: true }))}
        onMouseLeave={() => setHovered((prev) => ({ ...prev, h1: false }))}
      >
        CONGRATULATIONS ON THE OFFER!
      </h1>

      <h2
        style={{ ...styles.h2, ...(hovered.h2 ? styles.hoveredText : {}) }}
        onMouseEnter={() => setHovered((prev) => ({ ...prev, h2: true }))}
        onMouseLeave={() => setHovered((prev) => ({ ...prev, h2: false }))}
      >
        Now let's break it down...
      </h2>

      <button
        style={{ ...styles.button, ...(hovered.btn ? styles.buttonHover : {}) }}
        onMouseEnter={() => setHovered((prev) => ({ ...prev, btn: true }))}
        onMouseLeave={() => setHovered((prev) => ({ ...prev, btn: false }))}
        onClick={handleUploadClick}
        disabled={loading}
      >
        <img src="/uploadicon.png" alt="Upload icon" style={styles.icon} />
        {loading ? "Analyzing..." : "Upload"}
      </button>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="application/pdf"
        onChange={handleFileChange}
      />

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  body: {
    backgroundColor: "#000000",
    color: "#ffffff",
    fontFamily: "Jacques Francois, serif",
    textAlign: "center",
    padding: "0 50px",
    fontSize: "1.5rem",
    lineHeight: "1.6",
    margin: 0,
    height: "100vh",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textShadow: "4px 4px 8px rgba(0, 0, 0, 0.2), 0 0 30px rgba(187, 187, 187, 0.6)",
    overflow: "hidden",
  },
  h1: {
    fontSize: "2.8rem",
    marginBottom: "20px",
    transition: "all 0.3s ease",
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 400,
    marginTop: "20px",
    marginBottom: "40px",
    transition: "all 0.3s ease",
  },
  hoveredText: {
    color: "#b7fdaa",
    textShadow: "0 0 20px #b7fdaa",
    transform: "scale(1.04)",
  },
  button: {
    background: "linear-gradient(145deg, #e0e0e0, #f9f9f9)",
    color: "#000000",
    border: "2px solid #b7fdaa",
    padding: "16px 40px",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "600",
    boxShadow: "0 10px 25px rgba(183, 253, 170, 0.2)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    transition: "all 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#b7fdaa",
    color: "#000",
    transform: "scale(1.05)",
    boxShadow: "0 0 20px #b7fdaa, 0 0 30px #b7fdaa",
  },
  icon: {
    height: "25px",
    marginRight: "12px",
    verticalAlign: "middle",
  },
  error: {
    color: "#ff6b6b",
    fontSize: "1rem",
    marginTop: "20px",
  },
};
