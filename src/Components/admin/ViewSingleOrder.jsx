import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Client, Databases } from "appwrite"; // Appwrite SDK
import { FaBox, FaMobileAlt, FaUser } from "react-icons/fa"; // React Icons
import conf from "../../conf/conf";

const ViewSingleOrder = () => {
  const { orderId } = useParams(); // Extract the orderId from the URL
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null); // For additional product details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const client = new Client()
    .setEndpoint(conf.appwriteUrl) // Replace with your Appwrite endpoint
    .setProject(conf.appwriteProjectId); // Replace with your Appwrite project ID

  const databases = new Databases(client);

  // Fetch order and product details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        console.log("Fetching Order ID:", orderId);

        // Fetch order details
        const orderResponse = await databases.getDocument(
          conf.appwriteDatabaseId,
          conf.appwriteOrderId, // Orders collection ID
          orderId
        );

        console.log("Order Response:", orderResponse);
        setOrder(orderResponse);

        // Fetch product details using productId
        const productResponse = await databases.getDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId, // Products collection ID
          orderResponse.productId
        );

        console.log("Product Response:", productResponse);
        setProduct(productResponse);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Could not load order or product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <span className="loading  loading-ring loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        Order Details
      </h2>
      <div className="bg-gray-800 text-white p-4 rounded shadow-lg">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaBox /> Order Information
        </h3>
        <div className="mb-4">
          <strong>Order ID:</strong> {order.$id}
        </div>
        <div className="mb-4">
          <strong>User ID:</strong> {order.userId}
        </div>
        <div className="mb-4">
          <strong>Price:</strong> ₹{order.price}
        </div>
        <div className="mb-4 flex items-center gap-2">
          <FaUser />
          <strong>Name:</strong> {order.name || "Not provided"}
        </div>
        <div className="mb-4 flex items-center gap-2">
          <FaMobileAlt />
          <strong>Mobile Number:</strong> {order.mobile || "Not provided"}
        </div>

        {product ? (
          <>
            <h3 className="text-xl font-semibold mt-6 mb-4">Product Information</h3>
            <div className="mb-4">
              <strong>Product Name:</strong> {product.name}
            </div>
            {product.img && (
              <div className="mb-4">
                <strong>Product Image:</strong>
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full max-w-md rounded-md shadow-lg"
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center">Product details not available.</div>
        )}
      </div>
    </div>
  );
};

export default ViewSingleOrder;
