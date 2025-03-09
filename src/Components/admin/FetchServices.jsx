import React, { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";
import conf from "../../conf/conf";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

// Import useNavigate instead of useHistory

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
  <Helmet>
    <title>Marketplace - Webdial</title>
    <meta
      name="description"
      content="Explore our marketplace offering services like web development, SEO, video editing, graphic design, app development, and more at Webdial."
    />
    <meta
      name="keywords"
      content="Webdial, marketplace, web development, SEO, video editing, logo designing, app development, graphic design, live video services"
    />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="Webdial" />
    <meta name="copyright" content="Webdial" />

    {/* Open Graph Meta Tags for Social Media Sharing */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Webdial Marketplace" />
    <meta
      property="og:description"
      content="Explore our marketplace offering services like web development, SEO, video editing, graphic design, app development, and more at Webdial."
    />
    <meta
      property="og:image"
      content="https://www.webdial.in/favicon/apple-touch-icon.png"
    />
    <meta property="og:url" content="https://web.webdial.in/marketplace" />

    {/* Twitter Card Meta Tags */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Webdial Marketplace" />
    <meta
      name="twitter:description"
      content="Explore our marketplace offering services like web development, SEO, video editing, graphic design, app development, and more at Webdial."
    />
    <meta
      name="twitter:image"
      content="https://www.webdial.in/favicon/apple-touch-icon.png"
    />
  </Helmet>
  <div className="w-full max-w-4xl py-5 mx-auto">
    <h1 className="mb-7 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl">
      <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        MARKET
      </span>
      PLACE
    </h1>
    <div className="fixed top-20 right-0 z-50 flex flex-col items-center space-y-3 p-3">
      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/7049548385"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition duration-300 ease-in-out"
      >
        <FaWhatsapp className="text-2xl" />
      </a>

      {/* Call Icon */}
      <a
        href="tel:+918965099437"
        className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        <FaPhoneAlt className="text-2xl" />
      </a>
    </div>



    <div className="px-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...services.slice(-1), ...services.slice(0, -1)].map((service) => (
  <div
    key={service.$id}
    className="bg-gray-800 text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out relative flex flex-col"
  >
    <img
      src={service.img} // Cloudinary image URL
      alt={service.name}
      className="w-full object-cover rounded mb-4"
    />
    <h3 className="text-lg underline underline-offset-4 pb-3 font-bold">
      {service.name}
    </h3>
    <p className="text-sm flex-grow">{service.description}</p>
    <p className="text-sm mt-2">
      <span className="line-through text-red-500">
        ₹{service.actual_price}
      </span>{" "}
      <span className="text-green-400 text-lg font-bold">
        ₹{service.price}
      </span>
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
