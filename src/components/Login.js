import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #74b9ff, #a29bfe)",
    fontFamily: "'Poppins', sans-serif",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    padding: "40px 50px",
    borderRadius: "16px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    minWidth: "350px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
    transition: "0.3s ease",
  };

  const buttonHover = {
    ...buttonStyle,
    backgroundColor: "#43a047",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      alert(`Welcome ${email}\nRemember Me: ${remember ? "Yes" : "No"}`);
      navigate("/dashboard");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "25px", color: "#2f3640" }}>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />

          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />

          {/* Remember Me & Forgot Password Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
              fontSize: "14px",
            }}
          >
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                style={{ marginRight: "6px" }}
              />
              Remember Me
            </label>

            <button
              type="button"
              onClick={() => alert("Password reset link sent to your email!")}
              style={{
                background: "none",
                border: "none",
                color: "#4e73df",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "14px",
              }}
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#43a047")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
