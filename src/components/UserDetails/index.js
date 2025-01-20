import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { IoIosGlobe } from "react-icons/io";
import { ThreeDots } from 'react-loader-spinner';
import "./index.css"

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
};

const UserDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [getUserData, setGetUserData] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);

  useEffect(() => {
    const getData = async () => {
      setApiStatus(apiConstants.inProgress);

      const apiUrl = `https://jsonplaceholder.typicode.com/users/${id}`;
      const options = {
        method: 'GET',
      };

      try {
        const response = await fetch(apiUrl, options);
        if (response.ok) {
          const data = await response.json();
          const formattedData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            company: data.company.name,
            website: data.website,
          };
          setGetUserData(formattedData);
          setApiStatus(apiConstants.success);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (e) {
        console.error('Error fetching user data:', e);
        setApiStatus(apiConstants.failure);
      }
    };

    getData();
  }, [id]); 
  const renderLoadingView = () => (
    <div className="loader-container">
      <ThreeDots color="blue" height={100} width={100} />
    </div>
  );

  const renderFailureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="failure-img"
      />
      <h1 className="failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  );

  const renderUserDetails = () => {
    if (!getUserData) {
      return null;
    }
  
    const { name, email, phone, company, website } = getUserData;
  
    return (
      <div className="user-details-container">
        <div className='name-profile'>
        <FaUserAlt className="profile-icon" />
        <h1>{name}</h1>
        </div>
        <h1 className='details-head'>Details:</h1>
        <div className='email'>
        <IoMdMail />
        <p>Email: {email}</p>
        </div>
        <div className='phone'>
        <FaPhone />
        <p>Phone: {phone}</p>
        </div>
        <div className='company'>
        <FaBuilding />
        <p>Company: {company}</p>
        </div>
        <div className='website'>
        <IoIosGlobe />
        <p>
          Website: <a href={`https://${website}`} target="_blank" rel="noopener noreferrer">{website}</a>
        </p>
        </div>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  };
  
  switch (apiStatus) {
    case apiConstants.success:
      return renderUserDetails();
    case apiConstants.inProgress:
      return renderLoadingView();
    case apiConstants.failure:
      return renderFailureView();
    default:
      return null;
  }
};

export default UserDetails;
