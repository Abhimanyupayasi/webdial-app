import React from "react";
import { useSelector } from "react-redux";
import { MdAccountCircle } from "react-icons/md"; // Profile icon
import { Link } from "react-router-dom";

function UserProfile() {
  const user = useSelector((state) => state.auth.user);
  
  if (!user) {
    return <div className="text-center text-white">Loading...</div>; // Optional loading state
  }

  return (
    <div className="max-w-3xl mb-10 mx-auto p-6 bg-base-200 rounded-lg shadow-lg mt-10">
      <div className="flex items-center justify-center mb-6">
        <div className="text-6xl text-primary">
          <MdAccountCircle />
        </div>
      </div>
      <div className="text-center mb-4">
        <h2 className="text-3xl font-semibold text-base-content">{user.name}</h2>
        <p className="text-lg text-base-content/70">{user.email}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-base-content">
          <span className="font-semibold">User ID:</span>
          <span>{user.$id}</span>
        </div>

        <div className="flex justify-between items-center text-base-content">
          <span className="font-semibold">Registration Date:</span>
          <span>{new Date(user.registration).toLocaleDateString()}</span>
        </div>

        <div className="flex justify-between items-center text-base-content">
          <span className="font-semibold">Email Verified:</span>
          <span>{user.emailVerification ? "Yes" : "No"}</span>
        </div>

        <div className="flex justify-between items-center text-base-content">
          <span className="font-semibold">Phone:</span>
          <span>{user.phone || "Not Provided"}</span>
        </div>

        <div className="flex justify-between items-center text-base-content">
          <span className="font-semibold">Account Status:</span>
          <span>{user.status ? "Active" : "Inactive"}</span>
        </div>
      </div>

      <div className="mt-6 text-center">
       <Link to="/edit-profile" className="btn btn-secondary">Edit Profile</Link>
      </div>
    </div>
  );
}

export default UserProfile;
