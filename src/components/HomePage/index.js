import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import EachUser from "../EachUser";
import { ThreeDots } from "react-loader-spinner";
import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const HomePage = () => {
  const [usersList, setUsersList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    fetchDetails();
  }, []);

  const bgColor = isDark ? "bg-black" : "bg-light";
  const headColor = isDark ? "head-black" : "head-light";

  const fetchDetails = async () => {
    setApiStatus(apiConstants.inProgress);

    const apiUrl = "https://jsonplaceholder.typicode.com/users";
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const updatedUsersList = data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          city: user.address.city,
        }));

        setUsersList(updatedUsersList);
        setApiStatus(apiConstants.success);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setApiStatus(apiConstants.failure);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const toggleTheme = () => {
    setIsDark((prevTheme) => !prevTheme);
  };

  const getFilteredUsersList = () => {
    return usersList.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getSortedUsersList = (filteredUsers) => {
    return filteredUsers.sort((a, b) => {
      if (sortOrder === "A-Z") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  };

  const renderUsersList = () => {
    const filteredUsers = getFilteredUsersList();
    const sortedUsers = getSortedUsersList(filteredUsers);
  
    return (
      <div className={bgColor}>
        <button onClick={toggleTheme} className="icon">
          {isDark ? (
            <MdLightMode className="icon" style={{ color: "white" }} />
          ) : (
            <MdDarkMode className="icon" style={{ color: "black" }} />
          )}
        </button>
        <div className="search-sort-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <BsSearch className="search-icon" />
          </div>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="sort-dropdown"
          >
            <option value="A-Z">Sort by Name (A-Z)</option>
            <option value="Z-A">Sort by Name (Z-A)</option>
          </select>
        </div>
        <h1 className={headColor}>All Users</h1>
        {filteredUsers.length === 0 ? (
          <div className="no-users-message">
            <img src="https://img.freepik.com/premium-vector/flat-design-no-user-found_108061-1605.jpg?w=740" className="no-users-img" alt="no users found"/>
            <h2>No users found</h2>
            <p>Try searching with a different name.</p>
          </div>
        ) : (
          <ul className="users-list">
            
            {sortedUsers.map((user) => (
              <EachUser userData={user} key={user.id} isDark={isDark} />
            ))}
          </ul>
        )}
      </div>
    );
  };
  

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
      <h1 className="failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  );

  switch (apiStatus) {
    case apiConstants.success:
      return renderUsersList();
    case apiConstants.inProgress:
      return renderLoadingView();
    case apiConstants.failure:
      return renderFailureView();
    default:
      return null;
  }
};

export default HomePage; 
