import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function CreateSurvey() {
  const navigate = useNavigate();

  const [surveyTitle, setSurveyTitle] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [targetParticipants, setTargetParticipants] = useState("");

  const [questions, setQuestions] = useState([
    {
      id: 1,
      qno: 1,
      text: "",
      options: [{ text: "", rating: 1 }],
    },
  ]);

  const addQuestion = () => {
    const nextQno = questions.length + 1;
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        qno: nextQno,
        text: "",
        options: [{ text: "", rating: 1 }],
      },
    ]);
  };

  const deleteQuestion = (id) => {
    const filtered = questions.filter((q) => q.id !== id);
    const reordered = filtered.map((q, i) => ({
      ...q,
      qno: i + 1,
    }));
    setQuestions(reordered);
  };

  const addOption = (qid) => {
    setQuestions(
      questions.map((q) =>
        q.id === qid && q.options.length < 4
          ? { ...q, options: [...q.options, { text: "", rating: 1 }] }
          : q
      )
    );
  };

  const handleQuestionChange = (id, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, text: value } : q))
    );
  };

  const handleOptionTextChange = (qid, index, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === qid
          ? {
              ...q,
              options: q.options.map((opt, i) =>
                i === index ? { ...opt, text: value } : opt
              ),
            }
          : q
      )
    );
  };

  const handleOptionRatingChange = (qid, index, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === qid
          ? {
              ...q,
              options: q.options.map((opt, i) =>
                i === index ? { ...opt, rating: Number(value) } : opt
              ),
            }
          : q
      )
    );
  };

  const handleSaveSurvey = async () => {
    if (!surveyTitle.trim()) {
      alert("Please enter a survey title.");
      return;
    }

    if (!targetParticipants || Number(targetParticipants) <= 0) {
      alert("Please enter valid target participants.");
      return;
    }

    const surveyId = "survey_" + Date.now();

    const formattedSurvey = {
      id: surveyId,
      title: surveyTitle,
      createdBy: "admin001", // static for now
      createdAt: new Date().toISOString(),
      currentParticipants: 0,
      targetParticipants: Number(targetParticipants),
      isCompleted: false,
    };

    const formattedQuestions = questions.map((q) => ({
      qno: q.qno,
      text: q.text,
      options: q.options.map((opt, index) => ({
        optionId: index + 1,
        option: opt.text,
        rating: opt.rating,
      })),
    }));

    try {
      // 1) Save survey
      await api.post("/surveys", formattedSurvey);

      // 2) Save questions for that survey
      await api.post("/questions", {
        surveyId: surveyId,
        questions: formattedQuestions,
      });

      // (optional) also keep in localStorage so your current ViewSurvey still works if needed
      const existingSurveys =
        JSON.parse(localStorage.getItem("surveys")) || [];

      existingSurveys.push({
        ...formattedSurvey,
        surveyDescription,
        questions: formattedQuestions,
      });

      localStorage.setItem("surveys", JSON.stringify(existingSurveys));

      console.log("Survey Saved:", formattedSurvey);
      console.log("Questions Saved:", formattedQuestions);

      alert("Survey saved successfully to API.");
    } catch (err) {
      console.error("Error saving survey:", err);
      alert("Failed to save survey. Check console for details.");
    }
  };

  return (
    <div className="create-survey-container">
      <style>{`
        .create-survey-container {
          background-color: #f8f9fc;
          min-height: 100vh;
          padding: 40px;
        }
        .card {
          background-color: white;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 25px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .input, .textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        .btn-blue {
          background-color: #5bc0ff;
          padding: 10px 18px;
          border-radius: 8px;
          border: none;
          color: white;
          cursor: pointer;
          margin-right: 10px;
        }
        .btn-green {
          background-color: #28a745;
          padding: 10px 18px;
          border-radius: 8px;
          border: none;
          color: white;
          cursor: pointer;
          margin-right: 10px;
        }
      `}</style>

      <h1>Create New Survey</h1>

      <div className="card">
        <h2>Survey Details</h2>

        <input
          type="text"
          placeholder="Survey Title"
          className="input"
          value={surveyTitle}
          onChange={(e) => setSurveyTitle(e.target.value)}
        />

        <textarea
          placeholder="Survey Description"
          className="textarea"
          value={surveyDescription}
          onChange={(e) => setSurveyDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Target Participants"
          className="input"
          value={targetParticipants}
          onChange={(e) => setTargetParticipants(e.target.value)}
        />
      </div>

      <h2>Survey Questions</h2>

      {questions.map((q) => (
        <div className="card" key={q.id}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Question {q.qno}</h3>
            <button onClick={() => deleteQuestion(q.id)}>🗑</button>
          </div>

          <input
            type="text"
            placeholder="Enter your question"
            className="input"
            value={q.text}
            onChange={(e) => handleQuestionChange(q.id, e.target.value)}
          />

          <p>Options</p>

          {q.options.map((opt, i) => (
            <div key={i}>
              <input
                type="text"
                placeholder={`Option ${i + 1}`}
                className="input"
                value={opt.text}
                onChange={(e) =>
                  handleOptionTextChange(q.id, i, e.target.value)
                }
              />

              <select
                className="input"
                value={opt.rating}
                onChange={(e) =>
                  handleOptionRatingChange(q.id, i, e.target.value)
                }
              >
                <option value="1">Good</option>
                <option value="2">Average</option>
                <option value="3">Moderate</option>
                <option value="4">Poor</option>
              </select>
            </div>
          ))}

          {q.options.length < 4 && (
            <button
              className="btn-blue"
              onClick={() => addOption(q.id)}
            >
              + Add Option
            </button>
          )}
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        <button className="btn-blue" onClick={addQuestion}>
          + Add Question
        </button>

        <button className="btn-green" onClick={handleSaveSurvey}>
          Save Survey
        </button>

        <button
          className="btn-blue"
          onClick={() => navigate("/view-survey")}
        >
          View Saved Surveys
        </button>

        <button
          className="btn-blue"
          style={{ float: "right" }}
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}