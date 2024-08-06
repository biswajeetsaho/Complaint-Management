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

const ComplaintListHOD = ({ userType, status, listOff }) => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [complaintDescription, setComplaintDescription] = useState("OFF");

  const [showDialog, setShowDialog] = useState(false);
  const [revertReason, setRevertReason] = useState("");

  const handleRevert = () => {
    setComplaintDescription("OFF");
    setShowDialog(true);
    setComplaintDescription("OFF");
  };

  const handleSubmit = () => {
    setComplaintDescription("ON");
    handleAction("revert");
    setShowDialog(false);
    setComplaintDescription("OFF");
  };
  
  const fetchComplaints = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/complaints/${status}`
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

  const convertStatus = {
    revert: "HOD Reverted",
    approve: "HOD Approved",
    decline: "HOD Declined",
  };
  const handleComplaintSelect = (complaint) => {
    setSelectedComplaint(complaint);
    setComplaintDescription("ON");
  };
  const handleClose = () => {
    setComplaintDescription("OFF");
    setSelectedComplaint(null);
  };
  const handleAction = async (action) => {
    console.log(selectedComplaint.id);
    if (action === "revert") {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/complaints/${selectedComplaint.id}`,
          { status: convertStatus[action], revertMessage: revertReason },
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert(`Complaint "${selectedComplaint.category}" ${action}ed.`);
        fetchComplaints();
        setSelectedComplaint(null);
      } catch (error) {
        console.error("Error updating complaint:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/complaints/${selectedComplaint.id}`,
          { status: convertStatus[action] },
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert(`Complaint "${selectedComplaint.category}" ${action}d.`);
        fetchComplaints();
        setSelectedComplaint(null);
      } catch (error) {
        console.error("Error updating complaint:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div className="complaint-list">
      <h2>Complaint List</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr
                key={complaint.id}
                onClick={() => handleComplaintSelect(complaint)}
              >
                <td>{complaint.id}</td>
                <td>{complaint.category}</td>
                <td>{complaint.status}</td>
                <td>
                  <button>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {complaintDescription === "ON" && (
        <div className="complaint-dialog">
          <button className="close-button" onClick={handleClose}>
            Close
          </button>
          <h3>{selectedComplaint.id}</h3>
          <p>{selectedComplaint.description}</p>
          {(status === "New") && (
            <div className="button-container">
              <button
                className={`action-button ${actionClasses.approve}`}
                onClick={() => handleAction("approve")}
              >
                Approve
              </button>
              <button
                className={`action-button ${actionClasses.decline}`}
                onClick={() => handleAction("decline")}
              >
                Decline
              </button>
              <button
                className={`action-button ${actionClasses.revert}`}
                onClick={() => handleRevert()}
              >
                Revert
              </button>
            </div>
          )}
        </div>
      )}
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        className="idialog"
      >
        <DialogTitle>Enter message to revert</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Reason"
            type="text"
            fullWidth
            value={revertReason}
            onChange={(e) => setRevertReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      <button onClick={() => listOff()}>Go Back</button>
    </div>
  );
};

const actionClasses = {
  approve: "action-button-approve",
  decline: "action-button-decline",
  revert: "action-button-revert",
};

export default ComplaintListHOD;
