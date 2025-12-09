import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ STEP 1: Import useNavigate

const SettingsPage = () => {
  const navigate = useNavigate(); // ✅ STEP 2: Initialize navigation

  return (
    <>
      <style>{`
        /* Page Container */
        .settings-container {
          background-color: #f4f6f8;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 40px 20px;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Card Layout */
        .settings-card {
          background: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 700px;
        }

        /* Titles */
        .page-title {
          text-align: center;
          font-size: 28px;
          font-weight: bold;
          color: #333;
          margin-bottom: 30px;
        }

        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }

        .section-desc {
          color: #666;
          font-size: 14px;
          margin-bottom: 20px;
        }

        /* Profile Section */
        .profile-section {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .profile-img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid #ddd;
        }

        .form-fields {
          flex: 1;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #444;
          margin-bottom: 6px;
        }

        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          outline: none;
          font-size: 14px;
          transition: 0.3s;
        }

        .form-group input:focus {
          border-color: #0078ff;
          box-shadow: 0 0 5px rgba(0, 120, 255, 0.3);
        }

        /* Buttons */
        .button-group {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .btn {
          border: none;
          border-radius: 8px;
          padding: 10px 20px;
          font-size: 14px;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn-primary {
          background-color: #0078ff;
          color: white;
        }

        .btn-primary:hover {
          background-color: #0063d1;
        }

        .btn-success {
          background-color: #28a745;
          color: white;
        }

        .btn-success:hover {
          background-color: #218838;
        }

        .btn-secondary {
          background-color: #ccc;
          color: #333;
        }

        .btn-secondary:hover {
          background-color: #b3b3b3;
        }

        /* Misc */
        .password-info {
          font-size: 13px;
          color: #777;
          margin-top: 5px;
        }

        hr {
          border: none;
          border-top: 1px solid #ddd;
          margin: 30px 0;
        }
      `}</style>

      <div className="settings-container">
        <div className="settings-card">
          <h1 className="page-title">Settings</h1>

          {/* Profile Info Section */}
          <section className="section">
            <h2 className="section-title">Profile Information</h2>
            <p className="section-desc">
              Update your account's profile information and email address.
            </p>

            <div className="profile-section">
              <img
                src="https://via.placeholder.com/80"
                alt="Profile"
                className="profile-img"
              />
              <div className="form-fields">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" defaultValue="Admin User" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" defaultValue="admin@example.com" />
                </div>
              </div>
            </div>

            <button className="btn btn-primary">Save Changes</button>
          </section>

          <hr />

          {/* Change Password Section */}
          <section className="section">
            <h2 className="section-title">Change Password</h2>
            <p className="section-desc">
              Ensure your account is using a long, random password to stay secure.
            </p>

            <div className="form-group">
              <label>Current Password</label>
              <input type="password" placeholder="Enter your current password" />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input type="password" placeholder="Enter new password" />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input type="password" placeholder="Confirm new password" />
            </div>

            <p className="password-info">
              Password must be at least 8 characters long and include uppercase, lowercase,
              numbers, and symbols.
            </p>

            <div className="button-group">
              <button className="btn btn-success">Update Password</button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/dashboard")} // ✅ works now
              >
                Back to Dashboard
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
