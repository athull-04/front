import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./css/header.css";
import { useSearch } from "./SearchContext";

const Header = () => {
  const { updateSearchQuery } = useSearch(); // Access the global search query updater
  const [searchQuery, setSearchQuery] = useState(""); // Local state for search query
  
  const token = localStorage.getItem("token"); // Check if the user is logged in by checking the token
  
  const navigate = useNavigate(); // Initialize the navigate function from react-router-dom

  // Handle the change in the search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the local state
    updateSearchQuery(e.target.value); // Update the global search query in context
  };

  // Trigger the search action when clicking the search icon or pressing Enter
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      // Redirect with search query as URL parameter
      navigate(`/products?search=${searchQuery}`);
    }
  };

  // Handle Enter key press for triggering the search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search when Enter is pressed
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/" className="logo-link">
          AzShop
        </NavLink>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery} // Bind the input value to the local search query
          onChange={handleSearchChange} // Update search query globally and locally on change
          onKeyPress={handleKeyPress} // Trigger search when Enter key is pressed
        />
        <div className="search-icon" onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.742a6.5 6.5 0 1 0-1.415 1.415l3.581 3.58a1 1 0 0 0 1.415-1.415l-3.58-3.58zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
      </div>

      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
              Contact
            </NavLink>
          </li>
          {/* Conditionally render Profile icon based on token */}
          <li>
            {token ? (
              <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
                              
                <span className="material-icons">person</span>
                <span className="profile-text">Profile</span>
              
              </NavLink>
            ) : (
              <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                <span className="material-icons">
                  login
                </span>
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
