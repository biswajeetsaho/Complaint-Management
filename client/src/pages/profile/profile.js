// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   MenuItem,
// } from "@mui/material";
// import "./profile.css";
// import axios from "axios";

// const ProfilePage = () => {
//   // const user = {
//   //     email: 'john@email.com',
//   //     firstName: 'John',
//   //     lastName: 'Doe',
//   //     userType: 'User',
//   //     photo: '/placeholder.jpg',
//   //     secqn1: 'Answer 1',
//   //     secqn2: 'Answer 2',
//   //     secqn3: 'Answer 3',
//   //     secqn4: 'Answer 4',
//   //     uniqueId: 'unique123',
//   // };

//   const [open, setOpen] = useState(false);
//   const [user, setUser] = useState({});
//   const [userImageURL, setUserImageURL] = useState(null);
//   const [editedUser, setEditedUser] = useState({ ...user });
//   const emailUser = localStorage.getItem("emailUser");
//   const userType = localStorage.getItem("typeUser");

//   useEffect(() => {
//     // Fetch user profile data
//     const fetchProfileData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/profile/${userType}?email=${emailUser}`
//         );
//         setUser(response?.data?.userdata);
//         setUserImageURL(`data:image/jpeg;base64,${response?.data?.userdata?.photo}`);
//         user.user_id = response.data.user_id;
//         editedUser.user_id = response.data.user_id;
//         setEditedUser(response?.data?.userdata);
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedUser({ ...editedUser, [name]: value });
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await axios.put(`http://localhost:5000/api/profile/${userType}`, editedUser);
//       alert(res.data.message);
//       // Refresh user profile data
//       const response = await axios.get(
//         `http://localhost:5000/api/profile/${userType}?email=${emailUser}`
//       );
//       setUser(response.data.userdata);
//       user.user_id = response.data.user_id;
//       handleClose();
//     } catch (error) {
//       console.error("Error updating profile data:", error);
//     }
//     console.log("Edited User:", editedUser);
//   };
//   console.log(editedUser);
//   return (
//     <div className="profile-container">
//       <h2 className="profile-heading">User Profile</h2>
//       <div className="user-details">
//         <img src={userImageURL} alt="User" className="user-photo" />
//         <div className="user-info">
//           <p>
//             <strong>Email:</strong> {user.email}
//           </p>
//           <p>
//             <strong>First Name:</strong> {user.firstName}
//           </p>
//           <p>
//             <strong>Last Name:</strong> {user.lastName}
//           </p>
//           <p>
//             <strong>User Type:</strong> {user.userType}
//           </p>
//           <p>
//             <strong>Security Question 1:</strong> {user.secqn1}
//           </p>
//           <p>
//             <strong>Security Question 2:</strong> {user.secqn2}
//           </p>
//           <p>
//             <strong>Security Question 3:</strong> {user.secqn3}
//           </p>
//           <p>
//             <strong>Security Question 4:</strong> {user.secqn4}
//           </p>
//           <p>
//             <strong>Unique ID:</strong> {user.uniqueId}
//           </p>
//         </div>
//       </div>
//       <Button variant="contained" onClick={handleOpen} className="edit-button">
//         Edit Profile
//       </Button>

//       {/* Edit Profile Dialog */}
//       <Dialog open={open} onClose={handleClose} className="edit-dialog">
//         <DialogTitle className="dialog-title">Edit Profile</DialogTitle>
//         <DialogContent className="dialog-content">
//           {/* Form for editing profile */}
//           <TextField
//             name="firstName"
//             label="First Name"
//             value={editedUser.firstName}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <TextField
//             name="lastName"
//             label="Last Name"
//             value={editedUser.lastName}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <TextField
//             name="email"
//             label="Email"
//             value={editedUser.email}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <TextField
//             select
//             name="userType"
//             label="User Type"
//             value={editedUser.userType}
//             onChange={handleInputChange}
//             fullWidth
//           >
//             <MenuItem value="User">User</MenuItem>
//             <MenuItem value="Admin">Admin</MenuItem>
//           </TextField>
          
//            {/* // name="photo"
//             // label="Photo URL"
//             // value={editedUser.photo}
//             // onChange={handleInputChange}
//             // fullWidth
//           // /> */}
//           <TextField
//             name="secqn1"
//             label="Security Question 1"
//             value={editedUser.secqn1}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <TextField
//             name="secqn2"
//             label="Security Question 2"
//             value={editedUser.secqn2}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <TextField
//             name="secqn3"
//             label="Security Question 3"
//             value={editedUser.secqn3}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <TextField
//             name="secqn4"
//             label="Security Question 4"
//             value={editedUser.secqn4}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <TextField
//             name="uniqueId"
//             label="Unique ID"
//             value={editedUser.uniqueId}
//             onChange={handleInputChange}
//             fullWidth
//           />
//         </DialogContent>
//         <DialogActions className="dialog-actions">
//           <Button onClick={handleClose} className="cancel-button">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             variant="contained"
//             className="save-button"
//           >
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default ProfilePage;



import React, { useEffect, useState } from "react";
import "./profile.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const ProfilePage = () => {
  // const user = {
  //     email: 'john@email.com',
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     userType: 'User',
  //     photo: '/placeholder.jpg',
  //     secqn1: 'Answer 1',
  //     secqn2: 'Answer 2',
  //     secqn3: 'Answer 3',
  //     secqn4: 'Answer 4',
  //     uniqueId: 'unique123',
  // };

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [userImageURL, setUserImageURL] = useState(null);
  const [editedUser, setEditedUser] = useState({ ...user });
  const emailUser = localStorage.getItem("emailUser");
  const userType = localStorage.getItem("typeUser");

  useEffect(() => {
    // Fetch user profile data
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/profile/${userType}?email=${emailUser}`);
        setUser(response?.data?.userdata);
        setUserImageURL(`data:image/jpeg;base64,${response?.data?.userdata?.photo}`);
        user.user_id = response.data.user_id;
        editedUser.user_id = response.data.user_id;
        setEditedUser(response?.data?.userdata);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/profile/${userType}`, editedUser);
      alert(res.data.message);
      // Refresh user profile data
      const response = await axios.get(
        `http://localhost:5000/api/profile/${userType}?email=${emailUser}`
      );
      setUser(response.data.userdata);
      user.user_id = response.data.user_id;
      handleClose();
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
    console.log("Edited User:", editedUser);
  };
  console.log(editedUser);
  return (
    <div className="profile-container">
      <h2 className="profile-heading">User Profile</h2>
      <div className="user-details">
      <img src={userImageURL} alt="User" className="user-photo" />
        {/* <img src="https://tse1.mm.bing.net/th?id=OIP.NqY3rNMnx2NXYo3KJfg43gAAAA&pid=Api&rs=1&c=1&qlt=95&w=98&h=98" alt="User" className="user-photo" /> */}
        <div className="user-info">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>First Name:</strong> {user.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {user.lastName}
          </p>
          <p>
            <strong>User Type:</strong> {user.userType}
          </p>
          {/* <p>
            <strong>Security Question 1:</strong> {user.secqn1}
          </p>
          <p>
            <strong>Security Question 2:</strong> {user.secqn2}
          </p>
          <p>
            <strong>Security Question 3:</strong> {user.secqn3}
          </p>
          <p>
            <strong>Security Question 4:</strong> {user.secqn4}
          </p> */}
          <p>
            <strong>Unique ID:</strong> {user.uniqueId}
          </p>
        </div>
      </div>
      
      
  <div className="question-box">
        <p id="question-heading">Security Question</p>
        <div className="question">
          Security Question 1
        </div>
        <div className="question">
        Security Question 2
        </div>
        <div className="question">
        Security Question 3
        </div>
        <div className="question">
        Security Question 4
        </div>
      </div>
        <div className="edit-button">
      <Button variant="contained" onClick={handleOpen}>
        Edit Profile
      </Button>
      </div>
      {/* Edit Profile Dialog */}
      <Dialog open={open} onClose={handleClose} className="edit-dialog">
        <DialogTitle className="dialog-title">Edit Profile</DialogTitle>
        <DialogContent className="dialog-content">
          {/* Form for editing profile */}
          <TextField
          sx={{marginTop:"14px"}}
            name="firstName"
            label="First Name"
            value={editedUser.firstName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
          sx={{marginTop:"14px"}}
            name="lastName"
            label="Last Name"
            value={editedUser.lastName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
          sx={{marginTop:"14px"}}
            name="email"
            label="Email"
            value={editedUser.email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
          sx={{marginTop:"14px"}}
            select
            name="userType"
            label="User Type"
            value={editedUser.userType}
            onChange={handleInputChange}
            fullWidth
          >
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
          
           {/* // name="photo"
            // label="Photo URL"
            // value={editedUser.photo}
            // onChange={handleInputChange}
            // fullWidth
          // /> */}
          <TextField
          sx={{marginTop:"14px"}}
            name="secqn1"
            label="Security Question 1"
            value={editedUser.secqn1}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
          sx={{marginTop:"14px"}}
            name="secqn2"
            label="Security Question 2"
            value={editedUser.secqn2}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
          sx={{marginTop:"14px"}}
            name="secqn3"
            label="Security Question 3"
            value={editedUser.secqn3}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
          sx={{marginTop:"14px"}}
            name="secqn4"
            label="Security Question 4"
            value={editedUser.secqn4}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
          sx={{marginTop:"14px"}}
            name="uniqueId"
            label="Unique ID"
            value={editedUser.uniqueId}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleClose} className="cancel-button">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            className="save-button"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePage;