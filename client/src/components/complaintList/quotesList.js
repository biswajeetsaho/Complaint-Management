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

const QuotesList = ({ userType, status, listOff }) => {
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


  const handleQuoteSelect = (quote) => {
    handleAction(quote);
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
        `http://localhost:5000/api/complaints/${status}/allquotes`
      );
      console.log("yahan:", response.data.quotes);
      setComplaints(response.data.quotes);
    } catch (error) {
      console.error("Error fetching Quotes:", error.message);
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

  const handleAction = async (quote) => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/complaints/${status}/assign-vendor`,
          { selectedVendor: quote.user },
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert(`Comaplaint assigned to Vendor ${quote.user}`);
        fetchComplaints();
        setSelectedComplaint(null);
      } catch (error) {
        console.error("Error updating complaint:", error);
        alert("An error occurred. Please try again.");
      }
    
    
  };
  return (<>
      <div className="complaint-list">
        <h2>Quotes List</h2>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Proposed Rate</th>
                <th>Message from Vendor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((quote) => (
                <tr key={quote.id} >
                  
                  <td>{quote.user}</td>
                  <td>{quote.rate}</td>
                  <td>{quote.message}</td>
                  <td><button onClick={() => handleQuoteSelect(quote)}>Select and Assign Job</button></td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
        
        <button onClick={() => listOff()}>Go Back</button>
      </div>
      
  </>);
};

const actionClasses = {
  approve: "action-button-approve",
  decline: "action-button-decline",
  revert: "action-button-revert",
};

export default QuotesList;
