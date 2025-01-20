import React from "react";
import { Link } from "react-router-dom";
import { FaCity } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import "./index.css"

const EachUser = ({ userData, isDark }) => {  
    const { id, name, email, city } = userData;
    const cardBgColor = isDark ? "dark-card" : "light-card"; 
    return (
      <li className={`user-card ${cardBgColor}`}>
        <Link className="user-item" to={`/user/${id}`}>
          <h3 className="each-head">{name}</h3>
          <p><span className="each-email"><IoMdMail /></span> {email}</p>
          <p><span className="each-city"><FaCity /></span> {city}</p>
        </Link>
      </li>
    );
  };

export default EachUser;
