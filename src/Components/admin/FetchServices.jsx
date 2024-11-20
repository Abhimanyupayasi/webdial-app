import React, { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";
import conf from "../../conf/conf";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const ServiceList = ({ style }) => {
  const client = new Client()
    .setEndpoint(conf.appwriteUrl) // Replace with your Appwrite endpoint
    .setProject(conf.appwriteProjectId); // Replace with your Appwrite project ID

  const databases = new Databases(client);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await databases.listDocuments(
          conf.appwriteDatabaseId, // Replace with your database ID
          conf.appwriteCollectionId // Replace with your collection ID
        );
        setServices(response.documents);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to fetch services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleGetNowClick = (serviceId) => {
    navigate(`/order/${serviceId}`); // Use navigate to redirect to the order page
  };

  if (loading) {
    return <div className="text-center h-screen w-full flex justify-center items-center text-white"><span className="loading loading-infinity loading-lg"></span></div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className={`${style} pb-10 w-full`}>
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-xl font-bold py-5 text-center mb-4 text-white">All Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.$id}
              className="bg-gray-800 text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
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

              {/* Get Now Button */}
              <button
                onClick={() => handleGetNowClick(service.$id)}
                className="mt-4 px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Get Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
