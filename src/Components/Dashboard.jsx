import React from 'react';
import { useSelector } from 'react-redux';
import DashboardInfo from './admin/DashboardInfo';
import AffiliateSection from './affiliate/AffiliateSection';
import { Client, Account } from 'appwrite'; // Import Appwrite SDK
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout, setToken } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import conf from '../conf/conf';
import Button from './Button';
import { Warning } from 'postcss';
import Welcome from './users/Welcome';
import ServiceList from './admin/FetchServices';






const Dashboard = () => {




  const verifyToken = async (token) => {
    // Initialize the Appwrite client
    const client = new Client()
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId); // Your Appwrite project ID
  
    // Initialize the Appwrite Account service
    const account = new Account(client);
  
    try {
      // Set the JWT token for authentication
      client.setJWT(token);
  
      // Fetch the current user to verify the token
      const user = await account.get();
  
      console.log('User Verified:', user);
      return true; // Token is valid
    } catch (error) {
      console.error('Failed to verify token:', error);
      return false; // Token is invalid or expired
    }
  };




  const token = useSelector((state) => state.auth.token);
  console.log(verifyToken(token)); // Verify the token on component mount
   if(verifyToken(token) === false){ 
    const navigate = useNavigate();
    // navigate('/login');
    // dispatch(logout());
    // localStorage.clear();

   }



  // Get the user data from Redux
  const user = useSelector((state) => state.auth.user);
  const emailVerified = useSelector((state) => state.auth.emailVerified);

  console.log('User:', user);
  console.log('Email Verified:', emailVerified);
 
  
  const tokenform = localStorage.getItem('token') || useSelector((state) => state.auth.token);
; // Check the token in the console

  verifyToken(tokenform); // Verify the token on component mount
  
  
  const dispatch = useDispatch();

  return (
    <>
   {/* <Button
  text="Logout"
  type="btn-Warning"
  onClick={async () => {
    try {
      await account.deleteSession('current'); // Deletes the current session
      setLoggedInUser(null); // Clears logged-in user state
      dispatch(logout()); // Dispatches the logout action
      setError(''); // Clears any error messages
    } catch (err) {
      console.error('Logout failed', err); // Logs the error if logout fails
    }
  }}
>
  Logout
</Button> */}

    <Welcome username={user.name}/>
    <DashboardInfo/>
    <AffiliateSection/>
    <div className='bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white'>
      <ServiceList style={`bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white`}/>
    </div>
    </>
    
  );
};

export default Dashboard;
