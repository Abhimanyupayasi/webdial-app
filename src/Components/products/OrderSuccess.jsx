import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams to get productId from URL
import { Client, Databases, Query } from "appwrite"; // Appwrite SDK
import conf from "../../conf/conf"; // Import your configuration

const OrderSuccess = () => {
  const { productId } = useParams(); // Get productId from URL
  const [product, setProduct] = useState(null); // State to store product data
  const [order, setOrder] = useState(null); // State to store order data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate(); // Hook for redirection

  const client = new Client()
    .setEndpoint(conf.appwriteUrl) // Appwrite endpoint
    .setProject(conf.appwriteProjectId); // Appwrite project ID

  const databases = new Databases(client);

  useEffect(() => {
    const fetchOrderAndProduct = async () => {
      try {
        // Fetch order details using productId
        const orderResponse = await databases.listDocuments(
          conf.appwriteDatabaseId, // Your database ID
          conf.appwriteOrderId, // Orders collection ID
          [Query.equal("productId", productId)] // Query to find the order by productId
        );

        if (orderResponse.documents.length === 0) {
          setError("Order not found.");
          return;
        }

        const order = orderResponse.documents[0];
        setOrder(order);

        // Fetch product details
        const productResponse = await databases.getDocument(
          conf.appwriteDatabaseId, // Your database ID
          conf.appwriteCollectionId, // Products collection ID
          productId // Fetch product using productId
        );

        setProduct(productResponse);
      } catch (err) {
        console.error("Error fetching order/product details:", err);
        setError("Failed to fetch order details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderAndProduct();
  }, [productId]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 text-white">
      <h2 className="text-2xl font-bold text-center mb-4">Order Success</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Thank you for your order!</h3>
        {product && (
          <>
            <img
              src={product.img} // Ensure this field exists in your product schema
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-sm text-gray-400">{product.description}</p>
            <div className="mt-4">
              <p className="text-lg font-bold text-green-400">₹{product.price}</p>
              <p className="text-sm text-gray-500">
                <span className="line-through text-red-500">₹{product.actual_price}</span>
              </p>
            </div>
            <div className="mt-6">
              <h4 className="font-bold text-lg">Order Details</h4>
              <p>Order ID: {order.$id}</p>
              <p>User ID: {order.userId}</p>
              <p>Price: ₹{order.price}</p>
              <p>Product ID: {order.productId}</p>
            </div>
          </>
        )}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="w-full px-6 py-3 rounded-full bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
