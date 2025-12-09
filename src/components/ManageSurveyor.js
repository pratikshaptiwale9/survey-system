import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function ManageSurveyor() {
  const navigate = useNavigate();

  const [surveyors, setSurveyors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newSurveyor, setNewSurveyor] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchSurveyors = async () => {
      try {
        const res = await api.get("/surveyors");
        setSurveyors(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching surveyors:", err);
        setSurveyors([]);
      }
    };

    fetchSurveyors();
  }, []);

  const saveSurveyors = (list) => {
    setSurveyors(list);
  };

  const handleAddSurveyor = async (e) => {
    e.preventDefault();

    if (
      !newSurveyor.name.trim() ||
      !newSurveyor.email.trim() ||
      !newSurveyor.password.trim()
    ) {
      alert("Please fill all fields!");
      return;
    }

    const surveyorToSave = {
      name: newSurveyor.name,
      email: newSurveyor.email,
      password: newSurveyor.password,
    };

    try {
      const res = await api.post("/surveyors", surveyorToSave);
      const created = res.data || surveyorToSave;

      const updated = [...surveyors, created];
      saveSurveyors(updated);

      setNewSurveyor({ name: "", email: "", password: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Error adding surveyor:", err);
      alert("Failed to add surveyor. Check console for details.");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        backgroundColor: "#f8f9fc",
      }}
    >
      <h2 style={{ color: "#2e59d9" }}>Manage Surveyors</h2>

      <button
        style={{
          backgroundColor: "#1cc88a",
          padding: "10px 20px",
          color: "#fff",
          borderRadius: "8px",
          border: "none",
          marginBottom: "20px",
          cursor: "pointer",
        }}
        onClick={() => setShowForm(true)}
      >
        + Add New Surveyor
      </button>

      <table
        style={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "12px",
                backgroundColor: "#4e73df",
                color: "#fff",
              }}
            >
              Name
            </th>
            <th
              style={{
                padding: "12px",
                backgroundColor: "#4e73df",
                color: "#fff",
              }}
            >
              Email
            </th>
            <th
              style={{
                padding: "12px",
                backgroundColor: "#4e73df",
                color: "#fff",
              }}
            >
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {surveyors.map((s, index) => (
            <tr key={s.id || index}>
              <td style={{ padding: "12px" }}>{s.name}</td>
              <td style={{ padding: "12px" }}>{s.email}</td>
              <td style={{ padding: "12px" }}>
                <button
                  style={{
                    backgroundColor: "#e74a3b",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                  }}
                  onClick={() =>
                    saveSurveyors(surveyors.filter((_, i) => i !== index))
                  }
                >
                  Delete (local only)
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "400px",
            }}
          >
            <h3>Add Surveyor</h3>

            <form onSubmit={handleAddSurveyor}>
              <label>Name:</label>
              <input
                type="text"
                value={newSurveyor.name}
                onChange={(e) =>
                  setNewSurveyor({
                    ...newSurveyor,
                    name: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                }}
              />

              <label>Email:</label>
              <input
                type="email"
                value={newSurveyor.email}
                onChange={(e) =>
                  setNewSurveyor({
                    ...newSurveyor,
                    email: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                }}
              />

              <label>Password:</label>
              <input
                type="password"
                value={newSurveyor.password}
                onChange={(e) =>
                  setNewSurveyor({
                    ...newSurveyor,
                    password: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "20px",
                }}
              />

              <button
                type="submit"
                style={{
                  backgroundColor: "#4e73df",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Add
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        style={{
          marginTop: "20px",
          backgroundColor: "#4e73df",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default ManageSurveyor;