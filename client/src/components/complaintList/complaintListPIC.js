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
import QuotesList from "./quotesList";

const ComplaintListPIC = ({ userType, status, listOff }) => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaintDescription, setComplaintDescription] = useState("OFF");
  const [complaints, setComplaints] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');
  const [quotesON, setQuotesON] = useState('OFF');

  const [showDialogApprove, setShowDialogApprove] = useState(false);


  const handleApprove = () => {
    setComplaintDescription("OFF");
    setShowDialogApprove(true);
    setComplaintDescription("OFF");
  };


  const handlePostJob = () => {
    setComplaintDescription("ON");
    handleAction("postJob");
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
    try {
      const response = await axios.get(
        `http://localhost:5000/complaints/${status}`
      );
      console.log("yahan:", response.data);
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error.message);
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
  console.log(status);

  const handleComplaintSelect = (complaint) => {
    setSelectedComplaint(complaint);
    setComplaintDescription("ON");
  };

  const handleListOff = () => {
    setQuotesON("OFF");
  }

  const handleComplaintSelect1 = (complaint) => {
    setQuotesON("ON");
    setSelectedComplaint(complaint);
    
  };
  const handleClose = () => {
    setComplaintDescription("OFF");
    setSelectedComplaint(null);
  };

  const handlePayBill = async (Complaint) => {
    try {
      await axios.put(`http://localhost:5000/api/complaints/${Complaint.id}/resolve`);
      alert('Complaint status updated to Resolved');
      fetchComplaints();
  } catch (error) {
      console.error('Error updating complaint status:', error.message);
      alert('An error occurred. Please try again.');
  }
  }


  const handleAction = async (action) => {
    console.log(selectedComplaint.id);

    if (action === "postJob") {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/complaints/${selectedComplaint.id}`,
          { status: convertStatus[action], vendorCategory: selectedOption === "Other" ? selectedOption1 : selectedOption },
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
  return (<>
    {quotesON === "ON" && <QuotesList status={selectedComplaint.id} listOff={handleListOff}/>}
    {quotesON === "OFF" && (
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
              {status === "Budget Assigned" && complaints.map((complaint) => (
                <tr key={complaint.id} onClick={() => handleComplaintSelect(complaint)}>
                  <td>{complaint.id}</td>
                  <td>{complaint.category}</td>
                  <td>{complaint.status}</td>
                  <td><button>Post Job</button></td>
                </tr>
              ))}
              {status === "Job Posted" && complaints.map((complaint) => (
                <tr key={complaint.id} onClick={() => handleComplaintSelect1(complaint)}>
                  <td>{complaint.id}</td>
                  <td>{complaint.category}</td>
                  <td>{complaint.status}</td>
                  <td><button>Review Quotes</button></td>
                </tr>
              ))}
              {status === "Job Completed" && complaints.map((complaint) => (
                <tr key={complaint.id} onClick={() => handlePayBill(complaint)}>
                  <td>{complaint.id}</td>
                  <td>{complaint.category}</td>
                  <td>{complaint.status}</td>
                  <td><button>Pay Bill and Close</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {complaintDescription === "ON" && (
          <div className="complaint-dialog">
            <button className="close-button" onClick={handleClose}>Close</button>
            <h3>{selectedComplaint.title}</h3>
            <p>{selectedComplaint.description}</p>
            {status === "Budget Assigned" && (
              <div className="button-container">
                <button
                  className={`action-button ${actionClasses.approve}`}
                  onClick={() => handleApprove()}
                >
                  Post Job
                </button>
              </div>
            )}
          </div>
        )}
        <Dialog
          open={showDialogApprove}
          onClose={() => setShowDialogApprove(false)}
          className="idialog"
        >
          <DialogTitle>Select Vendor Category</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel id="option-label" style={{backgroundColor: "white"}}>Select Option</InputLabel>
              <Select
                labelId="option-label"
                id="option"
                value={selectedOption}
                style={{backgroundColor: "white"}}
                onChange={(e) => setSelectedOption(e.target.value)}
                label="Select Option"
              >
                {/* Menu Items */}
                <MenuItem value="Electricty" style={{backgroundColor: "white"}}>Electricity</MenuItem>
                <MenuItem value="Water/Sanitary" style={{backgroundColor: "white"}}>Water/Sanitary</MenuItem>
                <MenuItem value="Furniture" style={{backgroundColor: "white"}}>Furniture</MenuItem>
                <MenuItem value="Equipment" style={{backgroundColor: "white"}}>Equipment</MenuItem>
                <MenuItem value="Other" style={{backgroundColor: "white"}}>Other</MenuItem>
              </Select>
            </FormControl>
            {selectedOption === "Other" && (
              <TextField
                autoFocus
                margin="dense"
                label="Write Category"
                type="text"
                fullWidth
                value={selectedOption1}
                onChange={(e) => setSelectedOption1(e.target.value)}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePostJob}>Post Job to Vendors</Button>
          </DialogActions>
        </Dialog>
        <button onClick={() => listOff()}>Go Back</button>
      </div>
    )}    
  </>);
};

const actionClasses = {
  approve: "action-button-approve",
  decline: "action-button-decline",
  revert: "action-button-revert",
};

export default ComplaintListPIC;
