import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./complaintList.css";
import axios from "axios";

const ComplaintListVendor = ({ userType, status, listOff }) => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaintDescription, setComplaintDescription] = useState("OFF");
  const [complaints, setComplaints] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');
  const [quoteData, setQuoteData] = useState({
    userEmail: localStorage.getItem("emailUser"),
    rate: null,
    message: '',
  });

  const [showDialogApprove, setShowDialogApprove] = useState(false);
  const vendor_type = localStorage.getItem("typeVendor");

  const handleBill = async(complaint_id) => {
    setComplaintDescription("OFF");
    const billAmount = prompt("Enter the bill amount:");
    console.log(quoteData.userEmail);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/complaints/${complaint_id}/complete-job`,
        {billAmount: Number(billAmount)}
      );
      console.log("yahan:", response.data);
      alert("Bill amount submitted successfully");
      fetchComplaints();
    } catch (error) {
      console.error("Error fetching complaints:", error.message);
    }
  };

  const handleApprove = () => {
    setComplaintDescription("OFF");
    setShowDialogApprove(true);
    setComplaintDescription("OFF");
  };


  const handlePostJob = () => {
    setComplaintDescription("ON");
    handleAction("quoteRate");
    setShowDialogApprove(false);
    setComplaintDescription("OFF");
  };

  //   complaints = [
  //     {'id': 1, 'title': 'Issue with hardware', 'description': 'Hardware malfunction', 'status': 'New'},
  //     {'id': 2, 'title': 'Software bug', 'description': 'Software not functioning properly', 'status': 'New'},
  ///*-*/  //     {'id': 3, 'title': 'Network connectivity problem', 'description': 'Cannot connect to the network', 'status': 'New'},
  // ]
  // const [status, setStatus] = useState('HOD Reverted');
  const fetchComplaints = async () => {
    console.log(status);
    console.log("ye h", quoteData.userEmail);
    if(status === "Vendor Assigned"){
      console.log("le");
      try {
        const response = await axios.get(
          `http://localhost:5000/api/complaints/vendor-assigned/${quoteData.userEmail}`
        );
        console.log("yahan:", response.data);
        console.log(quoteData.userEmail);
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error.message);
      }
    }
    else {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/complaints/posted?vendor_type=${vendor_type}`
        );
        console.log("yahan:", response.data);
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error.message);
      }
    }
  };
  useEffect(() => {
    fetchComplaints();
  }, [status]);

  const convertStatus = {
    // revert: "Principal Reverted",
    // decline: "Principal Declined",
    // resolve: "Resolved",
    postJob: "Job Posted"
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

    if (action === "quoteRate") {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/complaints/${selectedComplaint.id}/quotes`,
                quoteData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            alert(response.data.message);
        
        // alert(`Complaint "${selectedComplaint.category}" ${action}ed.`);
        fetchComplaints();
        setSelectedComplaint(null);
      } catch (error) {
        console.error("Error :", error);
        alert(error.message);
      }
    }
    else {
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
      <h2>Jobs List</h2>
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
                  {status === "Job Posted" && <button>Quote Rate</button>}
                  {status === "Vendor Assigned" && <button onClick={() => handleBill(complaint.id)}>Job Done and Send Bill</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {complaintDescription === "ON" && status !== "Vendor Assigned" && (
        <div className="complaint-dialog">
          <button className="close-button" onClick={handleClose}>
            Close
          </button>
          <h3>{selectedComplaint.title}</h3>
          <p>{selectedComplaint.description}</p>
          {status === "Job Posted" && (
            <div className="button-container">
              <button
                className={`action-button ${actionClasses.approve}`}
                onClick={() => handleApprove()}
              >
                Quote Rate for this Job
              </button>
              {/* <button
                className={`action-button ${actionClasses.decline}`}
                onClick={() => {
                  handleAction("decline");
                }}
              >
                Decline
              </button>

              <button
                className={`action-button ${actionClasses.revert}`}
                onClick={() => handleRevert()}
              >
                Revert
              </button> */}
            </div>
          )}
          {status === "Vendor Assigned" && (
            <div className="button-container">
              <button
                className={`action-button ${actionClasses.approve}`}
                onClick={() => handleBill()}
              >
                Job Done and Send Bill
              </button>
              {/* <button
                className={`action-button ${actionClasses.decline}`}
                onClick={() => {
                  handleAction("decline");
                }}
              >
                Decline
              </button>

              <button
                className={`action-button ${actionClasses.revert}`}
                onClick={() => handleRevert()}
              >
                Revert
              </button> */}
            </div>
          )}
        </div>
      )}
      
      <Dialog
        open={showDialogApprove}
        onClose={() => setShowDialogApprove(false)}
        className="idialog"
      >
        <DialogTitle>Quote Rate and Send message</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            label="Your Rate"
            type="number"
            fullWidth
            value={quoteData.rate}
            onChange={(e) => setQuoteData(prevState => ({ ...prevState, rate: e.target.value }))}
          />
          {/* <FormControl fullWidth>
            <InputLabel id="option-label">Select Option</InputLabel>
            <Select
              labelId="option-label"
              id="option"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              label="Select Option"
            >
              <MenuItem value={"Electricity"}>Electric Issues</MenuItem>
              <MenuItem value={"Equipment"}>Equipments (screen, CPU, AC, light fans,etc)</MenuItem>
              <MenuItem value={"Water/Sanitary"}>Water/Sanitary Issues</MenuItem>
              <MenuItem value={"Furniture"}>Furniture</MenuItem>
              <MenuItem value={"Infrastruture"}>Infrastructure</MenuItem>
              <MenuItem value={"Sports"}>Sports Equipments</MenuItem>
              <MenuItem value={"Other"}>Others</MenuItem>
            </Select>
          </FormControl> */}
          <TextField
            autoFocus
            margin="dense"
            label="Write a message"
            type="text"
            fullWidth
            value={quoteData.message}
            onChange={(e) => setQuoteData(prevState => ({ ...prevState, message: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePostJob}>SEND</Button>
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

export default ComplaintListVendor;
