import React from "react";
import { Link } from "react-router-dom";
import SideBar from "../sideBar/sideBar";

const Dashboard = () => {
  return (
    <div>
      <Link to="/user">USERS</Link>
      <Link to="/food">FOODS</Link>
      <div>
        <SideBar />
      </div>
    </div>
  );
};

export default Dashboard;
