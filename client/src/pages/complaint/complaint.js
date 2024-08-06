import React, { useState } from "react";
import "./complaint.css"; // Import CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateComplaintForm = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    date: "",
    category: "",
    description: "",
  });
  credentials.complainant = localStorage.getItem("emailUser");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/complaints/register", // Change to your API endpoint
        credentials
      );
      console.log("Complaint submitted:", response.data);
      alert(response.data.message);
      alert(`Note the Complaint Unique Id: ${response.data.doc_id}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };

  return (
    <div className="create-complaint-form">
      <img
        src="/images/Digi Complaints-logos_white.png"
        alt="Logo"
        className="logo"
      />
      <div className="complaint-form-container">
        <h2 className="form-heading">CREATE COMPLAINT</h2>
        <form onSubmit={handleSubmit} className="complaint-form">
          <div className="form-group">
            <label>Date:</label>
            <input type="date" name="date" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Problem Category:</label>
            <select onChange={handleChange} name="category" required>
              <option value="">Select Category</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Network">Network</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              onChange={handleChange}
              required
              rows="7"
            />
          </div>
          <button type="submit" className="complaint-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateComplaintForm;
