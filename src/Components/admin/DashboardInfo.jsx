import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaPlus, FaEye, FaTrashAlt, FaList, FaBell } from 'react-icons/fa'; // Import React Icons

function DashboardInfo() {
  const user = useSelector((state) => state.auth.user);
  const adminRole = user?.labels ? user.labels[0] : null; // Safely access the labels array
  const isAdmin = adminRole === "admin"; // Check if the user is an admin
  const userName = user?.name; // Extract the user name

  return (
    <>
      {/* Only show if the user is an admin */}
      {isAdmin && (
        <div className="bg-gradient-to-r h-full border-b-2 border-white from-blue-500 via-purple-500 to-indigo-600 text-white py-12 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-center">Welcome {userName}, You Are Also an Admin</h1>
          <p className="text-lg text-center mt-2">You can manage your services here.</p>

          {/* Button Group for Admin */}
          <div className="lg:flex mt-4 space-x-4 flex-wrap justify-center">
            {/* Create Service Button */}
            <Link to="/admin/create-service" className="btn btn-primary flex items-center mb-2 lg:mb-0">
              <FaPlus className="mr-2" /> {/* Plus Icon */}
              Create Service
            </Link>

            {/* View Services Button */}
            <Link to="/admin/service-view" className="btn btn-secondary flex items-center mb-2 lg:mb-0">
              <FaEye className="mr-2" /> {/* Eye Icon */}
              View Services
            </Link>

            {/* Delete Services Button */}
            <Link to="/admin/service-delete" className="btn btn-danger flex items-center mb-2 lg:mb-0">
              <FaTrashAlt className="mr-2" /> {/* Trash Icon */}
              Delete Services
            </Link>

            {/* View Orders Button */}
            <Link to="/admin/view-orders" className="btn btn-secondary flex items-center mb-2 lg:mb-0">
              <FaList className="mr-2" /> {/* List Icon */}
              View Orders
            </Link>

            {/* Notifications Button */}
            <Link to="/admin/notification" className="btn btn-primary flex items-center mb-2 lg:mb-0">
              <FaBell className="mr-2" /> {/* Bell Icon */}
              Notifications
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default DashboardInfo;
