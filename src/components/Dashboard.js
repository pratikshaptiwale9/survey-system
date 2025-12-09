import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Dashboard() {
  const navigate = useNavigate();

  const [recentActivity, setRecentActivity] = useState([]);
  const [surveyCount, setSurveyCount] = useState(0);
  const [participantCount, setParticipantCount] = useState(0);

  useEffect(() => {
    const activities = [
      "Survey 'Community Health' updated by Priya Sharma",
      "New participant added: David Kim",
      "Survey 'Water Usage' completed by 10 respondents",
      "Survey 'Public Transport Feedback' created by Admin",
      "Participant 'Anjali Mehta' submitted 'Waste Management Survey'",
    ];

    const shuffled = activities.sort(() => 0.5 - Math.random()).slice(0, 3);
    setRecentActivity(shuffled);
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [surveysRes, participantsRes] = await Promise.all([
          api.get("/surveys"),
          api.get("/participants"),
        ]);

        setSurveyCount(Array.isArray(surveysRes.data) ? surveysRes.data.length : 0);
        setParticipantCount(
          Array.isArray(participantsRes.data) ? participantsRes.data.length : 0
        );
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
  }, []);

  const containerStyle = {
    backgroundColor: "#f8f9fc",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    padding: "40px",
  };

  const headerContainer = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  };

  const titleStyle = {
    color: "#4e73df",
    fontSize: "32px",
    fontWeight: "bold",
  };

  const rightContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "15px",
  };

  const settingsButton = {
    backgroundColor: "#858796",
    color: "#fff",
    padding: "10px 18px",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    transition: "0.3s",
  };

  const statsContainer = {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  };

  const statCard = {
    backgroundColor: "#e6ecff",
    color: "#2e59d9",
    padding: "20px 30px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
  };

  const statNumber = {
    fontSize: "28px",
    fontWeight: "bold",
  };

  const statLabel = {
    fontSize: "14px",
    opacity: 0.9,
  };

  const welcomeContainer = {
    textAlign: "center",
    marginTop: "80px",
    marginBottom: "50px",
  };

  const welcomeTitle = {
    fontSize: "26px",
    color: "#2e59d9",
    marginBottom: "10px",
  };

  const welcomeSubtitle = {
    fontSize: "16px",
    color: "#5a5c69",
  };

  const buttonContainer = {
    textAlign: "center",
    marginTop: "40px",
  };

  const buttonStyle = {
    backgroundColor: "#1cc88a",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    margin: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    transition: "0.3s",
  };

  const recentActivityBox = {
    marginTop: "40px",
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  const activityTitle = {
    color: "#4e73df",
    fontSize: "20px",
    marginBottom: "15px",
  };

  const handleHover = (e, hover) => {
    e.target.style.backgroundColor = hover ? "#17a673" : "#1cc88a";
  };

  return (
    <div style={containerStyle}>
      <div style={headerContainer}>
        <h1 style={titleStyle}>Dashboard</h1>

        <div style={rightContainer}>
          <button style={settingsButton} onClick={() => navigate("/settings")}>
            ⚙ Settings
          </button>

          <div style={statsContainer}>
            <div style={statCard}>
              <div style={statNumber}>{surveyCount}</div>
              <div style={statLabel}>Total Surveys</div>
            </div>
            <div style={statCard}>
              <div style={statNumber}>{participantCount}</div>
              <div style={statLabel}>Total Participants</div>
            </div>
          </div>
        </div>
      </div>

      <div style={welcomeContainer}>
        <h2 style={welcomeTitle}>Welcome, Admin</h2>
        <p style={welcomeSubtitle}>
          Overview of Survey Platform activities and quick actions
        </p>
      </div>

      <div style={buttonContainer}>
        {[
          { text: "Create a Survey", path: "/create-survey" },
          { text: "View Participants", path: "/view-participants" },
          { text: "View Survey", path: "/view-survey" },
          { text: "Manage Surveyors", path: "/manage-surveyor" },
          { text: "Analysis", path: "/analysis" },
        ].map((btn) => (
          <button
            key={btn.text}
            style={buttonStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
            onClick={() => navigate(btn.path)}
          >
            {btn.text}
          </button>
        ))}
      </div>

      <div style={recentActivityBox}>
        <h3 style={activityTitle}>Recent Activity</h3>
        <ul style={{ color: "#5a5c69", lineHeight: "1.8" }}>
          {recentActivity.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;