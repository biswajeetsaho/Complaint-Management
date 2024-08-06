import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import "./complaintList.css";
import axios from "axios";

const ComplaintListUser = ({ userType, status, listOff }) => {
  const [complaints, setComplaints] = useState([]);
  
  const fetchComplaints = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/complaints/${status}?user_email=${localStorage.getItem('emailUser')}`
      );
      console.log(response.data);
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error.message);
    }
  };
  useEffect(() => {
    fetchComplaints();
  }, [status]);


  return (
    <div className="complaint-list">
      <h2>Complaint List</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Description</th>
              {status === "reverted" && <th>Message</th>}
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr
                key={complaint.id}
              >
                <td>{complaint.id}</td>
                <td>{complaint.category}</td>
                <td>{complaint.description}</td>
                {status === "reverted" && <td>{complaint.description}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={() => listOff()}>Go Back</button>
    </div>
  );
};

const actionClasses = {
  approve: "action-button-approve",
  decline: "action-button-decline",
  revert: "action-button-revert",
};

export default ComplaintListUser;
