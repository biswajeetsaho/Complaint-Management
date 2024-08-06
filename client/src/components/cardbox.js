import React from "react";
import "../pages/dashboard/dashboard.css";
import { useNavigate } from "react-router-dom";

const Box = ({ title, count, status, getSetCList }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("cList", "ON");
    localStorage.setItem("selectedStatus", status);
    getSetCList("ON");
  };

  return (
    <div className="box" onClick={handleClick}>
      <div className="box__title">{title}</div>
      <div className="box__count">{count}</div>
    </div>
  );
};

export default Box;
