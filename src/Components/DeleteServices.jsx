import React, { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";
import { FaTrash } from "react-icons/fa"; // Import Trash Icon
import conf from "../conf/conf";
import { useSelector } from "react-redux";




const ServiceDeleteList = () => {
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.labels ? user.labels[0] : null;
    
    
    
    

    
  const client = new Client()
    .setEndpoint(conf.appwriteUrl) // Your Appwrite endpoint
    .setProject(conf.appwriteProjectId); // Your Appwrite project ID

  const databases = new Databases(client);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Services
  const fetchServices = async () => {
    try {
      const response = await databases.listDocuments(
        conf.appwriteDatabaseId, // Your database ID
        conf.appwriteCollectionId // Your collection ID
      );
      setServices(response.documents);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to fetch services. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Delete Service
  const handleDelete = async (serviceId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (!confirmDelete) return;

    try {
      await databases.deleteDocument(
        conf.appwriteDatabaseId, // Your database ID
        conf.appwriteCollectionId, // Your collection ID
        serviceId
      );
      alert("Service deleted successfully!");
      fetchServices(); // Refresh the list after deletion
    } catch (err) {
      console.error("Error deleting service:", err);
      alert("Failed to delete service. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center text-white">Loading services...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-4 text-white">All Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.$id}
            className="bg-gray-800 text-white p-4 rounded shadow relative"
          >
            <img
              src={service.img} // Cloudinary image URL
              alt={service.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-bold">{service.name}</h3>
            <p className="text-sm">{service.description}</p>
            <p className="text-sm mt-2">
              <span className="line-through text-red-500">
                ₹{service.actual_price}
              </span>{" "}
              <span className="text-green-400 font-bold">₹{service.price}</span>
            </p>

            {isAdmin && (
              <button
                className="absolute bottom-0 p-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => handleDelete(service.$id)}
              >
                <FaTrash size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDeleteList;
