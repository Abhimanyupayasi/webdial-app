import React, { useEffect, useState } from 'react';
import { Client, Account } from 'appwrite';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setEmailVerified } from '../../store/authSlice';
import conf from '../../conf/conf';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite endpoint
  .setProject(conf.appwriteProjectId); // Appwrite project ID

const account = new Account(client);

const Verify = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEmailVerified = useSelector((state) => state.auth.emailVerified);

  // Effect to redirect if email is already verified
  useEffect(() => {
    if (isEmailVerified) {
        navigate('/dashboard');  // Redirect if email is already verified
    }
  }, [isEmailVerified, navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    const secret = urlParams.get('secret');

    if (userId && secret) {
      verifyMagicLink(userId, secret);
    } else {
      setMessage('Link has sent! Please check your mail. if mail not received, please check spam folder.');
    }
  }, []);

  const verifyMagicLink = async (userId, secret) => {
    try {
      // Attempt to create a session using Appwrite
      const session = await account.createSession(userId, secret);
      setMessage('Account verified successfully!');

      // Fetch user details immediately after successful verification
      const user = await account.get();
      //console.log('User details:', user);

      // Dispatch user data and email verification status to Redux store
      dispatch(setUser(user));
      dispatch(setEmailVerified(true));

      // Store user data and email verification status in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('emailVerified', 'true');

      // Redirect to dashboard immediately after setting the user
      navigate('/dashboard');
    } catch (error) {
      //console.error('Verification failed:', error);
      setMessage(`Verification failed: ${error.message}`);
      fallbackToLocalStorage(); // Fallback to localStorage if session creation fails
    }
  };

  const fallbackToLocalStorage = () => {
    const savedUser = localStorage.getItem('user');
    const isVerified = localStorage.getItem('emailVerified');

    if (savedUser && isVerified === 'true') {
      const user = JSON.parse(savedUser);
      dispatch(setUser(user));  // Dispatch user data from localStorage
      dispatch(setEmailVerified(true)); // Set email as verified from localStorage
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      setMessage('Failed to verify, please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-center text-2xl font-bold text-indigo-600 mb-4">Verify Your Email</h2>
        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default Verify;
