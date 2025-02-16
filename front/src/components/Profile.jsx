import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import './css/profile.css'; 
import Header from './Header'; 
import Footer from './Footer'; 

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  // Function to refresh the token
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;

    try {
      const response = await axios.post('https://shop-budu.onrender.com/api/auth/refresh', { refreshToken });
      return response.data.accessToken; // Assuming the response contains a new access token
    } catch (err) {
      console.error('Error refreshing token:', err);
      return null;
    }
  };

  // Fetch user data from backend API
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://shop-budu.onrender.com/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);  
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Token expired or invalid, try refreshing the token
          const newToken = await refreshToken();

          if (newToken) {
            // Save the new token and retry fetching user data
            localStorage.setItem('token', newToken);
            fetchUserData();
          } else {
            // If refresh token fails, log the user out and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            navigate('/login'); // Redirect to login
          }
        } else {
          // If any error occurs, set an error message and redirect to login
          setError('Error fetching user data');
          console.error('Error fetching data:', err);
          localStorage.removeItem('token'); // Clean up token
          localStorage.removeItem('refreshToken'); // Clean up refresh token
          navigate('/login'); // Redirect to login page
        }
      } finally {
        setLoading(false);  
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken'); // Remove refresh token as well if it exists
    navigate('/login');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Header />
      <div className="profile-page-container">
        <div className="sidebar">
          <div className="sidebar-header">
            <img src={userInfo.profilePicture || "https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg"} alt="User Profile" className="profile-picture" />
            <h2>{userInfo.username}</h2>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li><a href="#overview">Your Account</a></li>
              <li><a href="#orders">Your Orders</a></li>
              <li><a href="#settings">Account Settings</a></li>
              <li><button onClick={handleLogout}>Sign Out</button></li>
            </ul>
          </nav>
        </div>

        <div className="main-content">
          <section id="overview" className="section">
            <h2>Your Information</h2>
            <div className="account-info">
              <h3>Account Details</h3>
              <p>Email: {userInfo.username}</p>
              <p>Username: {userInfo.username}</p>
            </div>
          </section>

          <section id="orders" className="section">
            <h2>Your Orders</h2>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
            </table>
          </section>

          <section id="settings" className="section">
            <h2>Account Settings</h2>
            <form>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={userInfo.username} />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={userInfo.email} />
              </div>

              <div className="form-group">
                <button type="submit" className="save-btn">Save Changes</button>
              </div>
            </form>
          </section>
          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
