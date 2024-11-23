import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Client, Account } from 'appwrite'; // Import from Appwrite SDK
import conf from '../../conf/conf'; 
// Assuming appwriteUrl and appwriteProjectId are in conf
import { useDispatch, useSelector } from 'react-redux';
import { setEmailVerified, setToken, setUser } from '../../store/authSlice';



const LoginPage = () => {
  const user = useSelector((state) => state.auth.user);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(user);

  // Initialize Appwrite client and account objects
  const client = new Client();
  client.setEndpoint(conf.appwriteUrl) // Replace with your Appwrite endpoint
        .setProject(conf.appwriteProjectId); // Replace with your Appwrite project ID

  const account = new Account(client);
  const navigate = useNavigate();
  const dispatch = useDispatch();

 

 

  

  // Login function
  const login = async () => {
    try {
      // Step 1: Create session using email/password
      await account.createEmailPasswordSession(email, password);

      // Step 2: Fetch the current session and user data
      const session = await account.getSession('current');
      const user = await account.get();

      // Log session token and user info for debugging
     // console.log('Session Token:', session.token);
      //console.log('User Data:', user);

      //token craetion through aoppwrite

      const appwritToken = await account.createJWT('email', 'password');
      //console.log('Appwrite Token:', appwritToken);
     
      dispatch(setToken(appwritToken.jwt));
      dispatch(setUser(user));
      dispatch(setEmailVerified(user.emailVerification));


      // Step 3: Store session and user data in localStorage
       // Store the session token in localStorage

      // Step 4: Set logged-in user
      setLoggedInUser(user);
      

      // Step 5: Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
     // console.error('Login failed:', err.message);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  

  // Logout function
  const logout = async () => {
    try {
      await account.deleteSession('current');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setLoggedInUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="login-container my-20 bg-gray-50 p-8 max-w-md mx-auto rounded-lg shadow-xl mt-10">
  <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
    {loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Login'}
  </h2>
  <form className="space-y-6">
    {!loggedInUser && (
      <>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none bg-gray-100 text-gray-700 placeholder-gray-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none bg-gray-100 text-gray-700 placeholder-gray-500"
            placeholder="Enter your password"
          />
        </div>
      </>
    )}
    
    {error && (
      <div className="text-red-500 text-sm text-center">
        {error}
      </div>
    )}
    
    {!loggedInUser ? (
      <button
        type="button"
        onClick={login}
        className="w-full bg-purple-500 text-white p-3 rounded-lg font-semibold hover:bg-purple-600 transition duration-200 ease-in-out transform hover:scale-105"
      >
        Login
      </button>
    ) : (
      <button
        type="button"
        onClick={logout}
        className="w-full bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105"
      >
        Logout
      </button>
    )}
  </form>
  <div>
    <p className="text-center text-gray-800 mt-4">
      Don't have an account?{' '}
      <a href="/register" className="text-purple-500 hover:underline">
        Register
      </a>
    </p>
  </div>
</div>


  );
};

export default LoginPage;
