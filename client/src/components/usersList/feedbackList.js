import React, { useEffect, useState } from "react";
import "../complaintList/complaintList.css";
import axios from "axios";

const FeedbackList = ({ listOff }) => {
  const [feedbackMessages, setFeedbackMessages] = useState([]);

  const fetchFeedbackMessages = async () => {
    try {
        const response5 = await axios.post(`http://localhost:5000/api/feedback/Feedback`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        console.log(response5.data);
        setFeedbackMessages(response5?.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
};




useEffect(() => {
    fetchFeedbackMessages();
}, []);

  return (
    <div className="complaint-list">
      <h2>Feedback Messages</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {feedbackMessages.map((message) => (
              <tr
                key={message.id}
              >
                <td>{message.id}</td>
                <td>{message.user}</td>
                <td>{message.message}</td>
                <td>
                  {/* <button onClick={() => handleAction("accept", user.id, user.userType+'s')}>Accept</button> */}
                  {/* <button onClick={() => handleAction("decline")}>Decline</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <button onClick={() => listOff()}>Go Back</button>
    </div>
  );
};


export default FeedbackList;
