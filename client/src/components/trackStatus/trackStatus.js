import React, { useState } from "react";
import axios from "axios";
import "./trackStatus.css";

const TrackStatus = () => {
  const [toggle, setToggle] = useState(false);
  const [status, setStatus] = useState("");
  const [status1, setStatus1] = useState("");
  const [status2, setStatus2] = useState("");
  const [status3, setStatus3] = useState("");
  const [status4, setStatus4] = useState("");
  const [status5, setStatus5] = useState("");
  const [complaintId, setComplaintId] = useState("");
  const [HODPrefix, setHODPrefix] = useState("Pending");
  const [PICStatus, setPICStatus] = useState("Pending at PIC Station");
  const [principalPrefix, setPrincipalPrefix] = useState("Pending");

  const handleInputChange = (event) => {
    setComplaintId(event.target.value); // Update complaint ID state when input changes
  };

  const handleWithdraw = async() => {
    setStatus1("");
    setStatus2("");
    setStatus3("");
    setStatus4("");
    setStatus5("");
    setHODPrefix("Pending");
    setPrincipalPrefix("Pending");
    setPICStatus("Pending at PIC Station");
    try {
      const response = await axios.put(`http://localhost:5000/api/complaints/${complaintId}/withdraw`);
      alert(response.data.message);
      setComplaintId("");
  } catch (error) {
      console.error('Error withdrawing complaint:', error.message);
      alert('An error occurred. Please try again.');
  }
  };

  const fetchStatus = async () => {
    if (complaintId) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/complaints/status/${complaintId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setStatus(response.data.status);

        if (status === "New") {
          setStatus1("active");
        } else if (status === "HOD Approved") {
          setStatus1("active");
          setStatus2("active");
          setHODPrefix("Approved");
        } else if (status === "Principal Approved") {
          setStatus1("active");
          setStatus2("active");
          setStatus3("active");
          setHODPrefix("Approved");
          setPrincipalPrefix("Approved");
        } else if (status === "Vendor Assigned") {
          setStatus1("active");
          setStatus2("active");
          setStatus3("active");
          setStatus4("active");
          setHODPrefix("Approved");
          setPrincipalPrefix("Approved");
          setPICStatus("Vendor Assigned");
        } else if (status === "Resolved") {
          setStatus1("active");
          setStatus2("active");
          setStatus3("active");
          setStatus4("active");
          setStatus5("active");
          setHODPrefix("Approved");
          setPrincipalPrefix("Approved");
          setPICStatus("Vendor Assigned");
        }
        if (response.data.status) setToggle(true);
      } catch (error) {
        console.log(error.message);
        alert("Enter valid ID or error fetching status");
      }
    } else {
      alert("Enter complaint ID");
    }
  };
  const PopUp = () => {
    return (
      <>
        <div className="popup">
          <div className="timeline">
            <div className="tdot-container">
              <div className={`tdot ${status1}`}>
                <div className="tdot-item">Submitted</div>
              </div>
              <div className={`tdot ${status2}`}>
                <div className="tdot-item">{HODPrefix} by HOD</div>
              </div>
              <div className={`tdot ${status3}`}>
                <div className="tdot-item">{principalPrefix} by Principal</div>
              </div>
              <div className={`tdot ${status4}`}>
                <div className="tdot-item">{PICStatus}</div>
              </div>
              <div className={`tdot ${status5}`}>
                <div className="tdot-item">Resolved</div>
              </div>
            </div>

            <div className="twithdraw">
              <button
                id="twithdraw"
                onClick={() => {
                  handleWithdraw();
                  setToggle(false);
                }}
              >
                WITHDRAW COMPLAIN
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="total-Tracking">
        <div className="complaint_tracker">
          <p id="tracker_heading">TRACK COMPLAINT STATUS</p>
          <div className="complaint">
            <p id="complaint">Complaint Id :</p>
            <input
              type="text"
              placeholder=""
              id="input"
              value={complaintId} // Bind input value to complaintId state
              onChange={handleInputChange} // Call handleInputChange function on input change
            />
            <button
              id="track_button"
              onClick={() => {
                fetchStatus();
                console.log("hello");
              }}
            >
              TRACK
            </button>
          </div>
        </div>
        {toggle && <PopUp />}
      </div>
    </>
  );
};

export default TrackStatus;
