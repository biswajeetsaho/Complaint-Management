import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginVendor() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleForgot = () => {
    localStorage.setItem('forgotUserType', "Vendor");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("Entered: ", credentials);
      const response = await axios.post(
        "http://localhost:5000/login/Vendor",
        credentials,
        {
            headers: {
              "Content-Type": "application/json",
            },
          }
      );
      console.log(response.data);
      const { email } = response.data;
      localStorage.setItem("emailUser", email);
      localStorage.setItem("typeVendor", response.data.vendor_type);
      localStorage.setItem("typeUser", "Vendor");
      navigate("/vendordashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-page">
  <div className="login-logo">
    <img src="/images/Digi Complaints-logos_white.png" alt="Digi Complaints Logo" />
  </div>
  <div className="container">
    <form method="POST" action="#" onSubmit={handleSubmit}>
      <div className="title">Vendor Login</div>
      <div className="input-box underline">
        <input type="text" name="email" placeholder="Email" onChange={handleChange} required />
        <div className="underline"></div>
      </div>
      <div className="input-box">
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <div className="underline"></div>
      </div>

      <div className="input-box button">
        <input type="submit" value="LOGIN" />
      </div>
      <div className="remember-forgot">
        <label>
          <input type="checkbox" />
          Remember me
        </label>
        <Link onClick={handleForgot} to="/forgot-password">Forgot password?</Link>{" "}
        
      </div>
      <div className="signup-link">
        Don't have an account? <Link to="/signup">Register</Link>{" "}
      </div>
    </form>
  </div>
</div>

  );
}

export default LoginVendor;
