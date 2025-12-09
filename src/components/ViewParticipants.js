import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function ViewParticipants() {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerStyle = {
    padding: "50px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fc",
    minHeight: "100vh",
  };

  const headerContainer = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  };

  const headingStyle = {
    fontSize: "32px",
    color: "#4e73df",
    margin: 0,
  };

  const subHeadingStyle = {
    color: "#5a5c69",
    fontSize: "16px",
    marginTop: "8px",
  };

  const cardContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  };

  const participantCard = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  const cardTitle = {
    fontSize: "20px",
    color: "#2f3640",
    marginBottom: "6px",
  };

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await api.get("/participants");
        setParticipants(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching participants:", err);
        setParticipants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  return (
    <div style={containerStyle}>
      <div style={headerContainer}>
        <div>
          <h1 style={headingStyle}>Participants</h1>
          <p style={subHeadingStyle}>List of registered participants</p>
        </div>
      </div>

      {loading ? (
        <p>Loading participants...</p>
      ) : (
        <div style={cardContainer}>
          {participants.map((p) => (
            <div key={p.id} style={participantCard}>
              <h3 style={cardTitle}>{p.name}</h3>
              <p>Age: {p.age}</p>
              <p>Gender: {p.gender}</p>
              <p>Survey ID: {p.surveyId}</p>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: "center" }}>
        <button
          style={{
            marginTop: "40px",
            padding: "12px 25px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#4e73df",
            color: "#fff",
            fontSize: "16px",
          }}
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ViewParticipants;