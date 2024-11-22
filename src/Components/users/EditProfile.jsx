import React from "react";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md"; // Edit icon

function EditProfile() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <div className="text-center text-white">Loading...</div>; // Optional loading state
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg mt-10">
      <div className="flex items-center justify-center mb-6">
        <div className="text-6xl text-primary">
          <MdEdit />
        </div>
      </div>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-base-content">Edit Profile</h2>
        <p className="text-lg text-base-content/70">You can't edit your profile right now. Once this feature is developed, you'll be able to update your profile here.</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-base-content">
          <span className="font-semibold">User ID:</span>
          <span>{user.$id}</span>
        </div>

        <div className="flex justify-between items-center text-base-content">
          <span className="font-semibold">Name:</span>
          <span>{user.name}</span>
        </div>

        <div className="flex justify-between items-center text-base-content">
          <span className="font-semibold">Email:</span>
          <span>{user.email}</span>
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
        <button className="btn btn-secondary" disabled>
          Edit Profile (Coming Soon)
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
