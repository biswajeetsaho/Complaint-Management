import React, { useState } from "react";
import axios from "axios";
import "./feedback.css"; // Import CSS file for styling
import { Button, TextField } from "@mui/material";

const FeedbackComponent = () => {
  const [message, setMessage] = useState("");
  const user = localStorage.getItem("emailUser");

  const handleSubmit = async () => {
    console.log("hey");
    if (user) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/feedback",
          { user, message }
        );
        console.log(response.data);
        alert(response.data.message);
        setMessage("");
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    } else {
      alert("Please login to submit feedback");
    }
  };

  return (
    <div className="left_contact">
      <h2 style={{margin: "70px"}}>FEEDBACK FORM</h2>
      <p
        style={{
          fontSize: "24px",
          fontWeight: "500",
          marginTop: "30px",
          marginBottom: "20px",
        }}
      >
        Leave Us a Message
      </p>
      <TextField
        name="Name"
        label=" Name"
        fullWidth
        sx={{ marginTop: "19px" }}
      />
      <TextField
        name="email"
        label="Email Address"
        fullWidth
        sx={{ marginTop: "19px" }}
      />
      <TextField
        InputProps={{
          style: {
            height: "200px", // Adjust the height as per your requirement
          },
        }}
        name="message"
        label="Enter Your Feedback Here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
        sx={{ marginTop: "19px" }}
      />
      <Button
        variant="contained"
        sx={{ marginTop: "20px", marginBottom: "100px" }}
        onClick={() => handleSubmit()}
      >
        Send
      </Button>
    </div>
  );
};

export default FeedbackComponent;
