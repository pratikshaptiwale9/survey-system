import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function ViewSurvey() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSurveys = async () => {
      try {
        const surveysRes = await api.get("/surveys");
        const surveyList = Array.isArray(surveysRes.data)
          ? surveysRes.data
          : [];

        // for each survey, fetch questions
        const withQuestions = await Promise.all(
          surveyList.map(async (s) => {
            try {
              const qRes = await api.get(`/questions/${s.id}`);
              const data = qRes.data || {};
              const questions = Array.isArray(data.questions)
                ? data.questions
                : data;

              return { ...s, questions };
            } catch (err) {
              console.error("Error loading questions for survey", s.id, err);
              return { ...s, questions: [] };
            }
          })
        );

        setSurveys(withQuestions);
      } catch (err) {
        console.error("Error reading surveys:", err);

        // fallback: if API fails, still read from localStorage
        try {
          const saved = JSON.parse(localStorage.getItem("surveys"));
          setSurveys(Array.isArray(saved) ? saved : []);
        } catch {
          setSurveys([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadSurveys();
  }, []);

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f8f9fc",
        minHeight: "100vh",
      }}
    >
      <h1>Saved Surveys</h1>

      {loading ? (
        <p>Loading surveys...</p>
      ) : surveys.length === 0 ? (
        <p>No surveys saved yet.</p>
      ) : (
        surveys.map((survey, index) => (
          <div
            key={survey.id || index}
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "12px",
              marginBottom: "25px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <h2 style={{ marginBottom: "6px" }}>{survey.title}</h2>

            {survey.surveyDescription && (
              <p style={{ color: "#555", marginBottom: "12px" }}>
                {survey.surveyDescription}
              </p>
            )}

            <p>
              <b>Target Participants:</b> {survey.targetParticipants}
            </p>

            <h3 style={{ marginTop: "16px" }}>Questions</h3>

            {Array.isArray(survey.questions) &&
            survey.questions.length > 0 ? (
              survey.questions.map((q) => (
                <div key={q.qno} style={{ marginBottom: "14px" }}>
                  <strong>
                    Q{q.qno}: {q.text}
                  </strong>

                  {Array.isArray(q.options) && q.options.length > 0 && (
                    <ul style={{ marginTop: "6px" }}>
                      {q.options.map((opt, i) => (
                        <li key={opt.optionId || i}>
                          {opt.option} — <b>Rating:</b> {opt.rating}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <p>No questions available.</p>
            )}
          </div>
        ))
      )}

      <button
        style={{
          marginTop: "20px",
          padding: "10px 18px",
          borderRadius: "8px",
          cursor: "pointer",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          fontSize: "15px",
          fontWeight: "500",
        }}
        onClick={() => navigate("/create-survey")}
      >
        Back to Dashboard
      </button>
    </div>
  );
}