import React, { useEffect, useState } from "react";
import "../complaintList/complaintList.css";
import axios from "axios";

const AllUserList = ({ listOff }) => {
  const [users, setUsers] = useState([]);
  const [PICs, setPICs] = useState([]);
  const [HODs, setHODs] = useState([]);
  const [principals, setPrincipals] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [admins, setAdmins] = useState([]);

  const fetchUsers = async () => {
    try {
        console.log("hello");
        const response5 = await axios.post(`http://localhost:5000/api/users/User`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        console.log(response5.data);
        setUsers(response5?.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
};

const fetchPICs = async () => {
    try {
        console.log("hello");
        const response4 = await axios.post(`http://localhost:5000/api/users/PIC`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        console.log(response4);
        setPICs(response4?.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
};

const fetchPrincipals = async () => {
    try {
        console.log("hello");
        const response0 = await axios.post(`http://localhost:5000/api/users/Principal`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        console.log(response0);
        setPrincipals(response0?.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
};

const fetchVendors = async () => {
    try {
        console.log("hello");
        const response1 = await axios.post('http://localhost:5000/api/users/Vendor', {
            headers: {
              "Content-Type": "application/json",
            },
          });
        console.log(response1);
        setVendors(response1?.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
};

const fetchAdmins = async () => {
    try {
        console.log("hello");
        const response2 = await axios.post('http://localhost:5000/api/users/Admin', {
            headers: {
              "Content-Type": "application/json",
            },
          });
        console.log(response2);
        setAdmins(response2?.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
};

const fetchHODs = async () => {
    try {
        console.log("hello");
        const response3 = await axios.post('http://localhost:5000/api/users/HOD', {
            headers: {
              "Content-Type": "application/json",
            },
          });
        console.log(response3);
        setHODs(response3?.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
};

useEffect(() => {
    fetchUsers();
    fetchPICs();
    fetchPrincipals();
    fetchVendors();
    fetchAdmins();
    fetchHODs();
}, []);

  const handleAction = async (action, userId, toCollection) => {
    if(action === "accept"){
        try {
            const response = await axios.post('http://localhost:5000/api/verify/move-user', {
              userId,
              toCollection
            });
            alert(response.data.message);
            fetchUsers();
          } catch (error) {
            console.error('Error moving user:', error);
            throw error;
          }
    }

  };
  return (
    <div className="complaint-list">
      <h2>Users List</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>User Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
              >
                <td>{user.id}</td>
                <td>{user.firstName + ' ' + user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.userType}</td>
                <td>
                  {/* <button onClick={() => handleAction("accept", user.id, user.userType+'s')}>Accept</button> */}
                  {/* <button onClick={() => handleAction("decline")}>Decline</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>HODs List</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>User Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {HODs.map((user) => (
              <tr
                key={user.id}
              >
                <td>{user.id}</td>
                <td>{user.firstName + ' ' + user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.userType}</td>
                <td>
                  <button onClick={() => handleAction("accept", user.id, user.userType+'s')}>Accept</button>
                  {/* <button onClick={() => handleAction("decline")}>Decline</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Principals List</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>User Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {principals.map((user) => (
              <tr
                key={user.id}
              >
                <td>{user.id}</td>
                <td>{user.firstName + ' ' + user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.userType}</td>
                <td>
                  <button onClick={() => handleAction("accept", user.id, user.userType+'s')}>Accept</button>
                  {/* <button onClick={() => handleAction("decline")}>Decline</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>PICs List</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>User Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {PICs.map((user) => (
              <tr
                key={user.id}
              >
                <td>{user.id}</td>
                <td>{user.firstName + ' ' + user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.userType}</td>
                <td>
                  <button onClick={() => handleAction("accept", user.id, user.userType+'s')}>Accept</button>
                  {/* <button onClick={() => handleAction("decline")}>Decline</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Vendors List</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>User Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((user) => (
              <tr
                key={user.id}
              >
                <td>{user.id}</td>
                <td>{user.firstName + ' ' + user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.userType}</td>
                <td>
                  <button onClick={() => handleAction("accept", user.id, user.userType+'s')}>Accept</button>
                  {/* <button onClick={() => handleAction("decline")}>Decline</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Admins List</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>User Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((user) => (
              <tr
                key={user.id}
              >
                <td>{user.id}</td>
                <td>{user.firstName + ' ' + user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.userType}</td>
                <td>
                  <button onClick={() => handleAction("accept", user.id, user.userType+'s')}>Accept</button>
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


export default AllUserList;
