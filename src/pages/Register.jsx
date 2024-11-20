// import React, { useState } from "react";
// import { Client, Account, ID } from "appwrite";
// import { useNavigate } from "react-router-dom";
// import conf from "../conf/conf";

// const client = new Client()
//   .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
//   .setProject(conf.appwriteProjectId);                 // Your Appwrite project ID

// const account = new Account(client);

// const Registration = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Register user in Appwrite (without session, just for registration)
//       await account.create(ID.unique(), email, password, name);
      
//       // Send Magic URL (OTP)
//       const token = await account.createMagicURLToken(
//         ID.unique(),
//         email,
//         "http://localhost:5173/verify"
//       );
      
//       setMessage("Registration successful! Please check your email for the verification link.");
//       setTimeout(() => navigate("/verify"), 1500); // Navigate to the verification page
//     } catch (error) {
//       setMessage(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="card w-full max-w-md bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-center text-2xl font-bold text-indigo-600 mb-4">Register</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-control mb-4">
//             <label className="label text-gray-600">Full Name</label>
//             <input
//               type="text"
//               className="input input-bordered border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-control mb-4">
//             <label className="label text-gray-600">Email Address</label>
//             <input
//               type="email"
//               className="input input-bordered border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-control mb-4">
//             <label className="label text-gray-600">Password</label>
//             <input
//               type="password"
//               className="input input-bordered border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//               placeholder="Create a password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
//           >
//             Register
//           </button>
//         </form>

//         {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default Registration;



import React, { useState } from "react";
import { Client, Account, ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmailVerified } from "../store/authSlice";
import conf from "../conf/conf";
import Button from "../Components/Button";

const client = new Client()
  .setEndpoint(conf.appwriteUrl) // Your Appwrite endpoint
  .setProject(conf.appwriteProjectId); // Your Appwrite project ID

const account = new Account(client);

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Register user in Appwrite (without session, just for registration)
      await account.create(ID.unique(), email, password, name);

      // Send Magic URL (OTP) for email verification
      const token = await account.createMagicURLToken(
        ID.unique(),
        email,
          `${conf.frontendURL}/verify` // Redirect URL after email verification
      );

      setMessage("Registration successful! Please check your email for the verification link.");

      // Optionally dispatch state if user is verified (you can update this after actual verification)
      dispatch(setEmailVerified(false)); // Set to false initially (pending email verification)

      setTimeout(() => navigate("/verify"), 1500); // Navigate to the verification page
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300">
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
      <div className="card w-full max-w-md bg-white shadow-2xl rounded-lg p-8">
        <h2 className="text-center text-3xl font-semibold text-indigo-700 mb-6">Create Account</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="form-control mb-6">
            <label className="label text-gray-600">Full Name</label>
            <input
              type="text"
              className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="form-control mb-6">
            <label className="label text-gray-600">Email Address</label>
            <input
              type="email"
              className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-control mb-6">
            <label className="label text-gray-600">Password</label>
            <input
              type="password"
              className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Error or Success Message */}
        {message && (
          <p className="mt-4 text-center text-gray-700">
            <span
              className={`${
                message === 'Registration successful!' ? 'text-green-600' : 'text-red-600'
              } font-semibold`}
            >
              {message}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Registration;
