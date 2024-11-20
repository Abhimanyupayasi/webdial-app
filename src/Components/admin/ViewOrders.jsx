import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client, Databases } from "appwrite"; // Appwrite SDK
import conf from "../../conf/conf";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const client = new Client()
    .setEndpoint(conf.appwriteUrl) // Replace with your Appwrite endpoint
    .setProject(conf.appwriteProjectId); // Replace with your Appwrite project ID

  const databases = new Databases(client);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteOrderId,
        );
        setOrders(response.documents);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-11) and adjust
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Returns "DD-MM-YYYY"
  };

  if (loading) {
    return <div className="text-center h-screen w-full flex justify-center items-center text-white">
      <span className="loading loading-ring loading-xs"></span>
      <span className="loading loading-ring loading-sm"></span>
      <span className="loading loading-ring loading-md"></span>
      <span className="loading loading-ring loading-lg"></span>
      <span className="loading loading-ring loading-md"></span>
      <span className="loading loading-ring loading-sm"></span>
      <span className="loading loading-ring loading-xs"></span>
    </div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        View All Orders
      </h2>
      <div className="bg-gray-800 text-white p-4 rounded shadow-lg">
        {orders.length === 0 ? (
          <div className="text-center">No orders found.</div>
        ) : (
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-700 text-left">
                <th className="p-3 border-b border-gray-600">Order ID</th>
                <th className="p-3 border-b border-gray-600">User ID</th>
                <th className="p-3 border-b border-gray-600">Product ID</th>
                <th className="p-3 border-b border-gray-600">Name</th>
                <th className="p-3 border-b border-gray-600">Mobile</th>
                <th className="p-3 border-b border-gray-600">Price</th>
                <th className="p-3 border-b border-gray-600">Created Date</th>
                <th className="p-3 border-b border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.$id} className="hover:bg-gray-700">
                  <td className="p-3 border-b border-gray-600">{order.$id}</td>
                  <td className="p-3 border-b border-gray-600">{order.userId}</td>
                  <td className="p-3 border-b border-gray-600">{order.productId}</td>
                  <td className="p-3 border-b border-gray-600">
                    {order.name || "N/A"}
                  </td>
                  <td className="p-3 border-b border-gray-600">
                    {order.mobile || "N/A"}
                  </td>
                  <td className="p-3 border-b border-gray-600">₹{order.price}</td>
                  <td className="p-3 border-b border-gray-600">
                    {formatDate(order.$createdAt)}
                  </td>
                  <td className="p-3 border-b border-gray-600">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={() => navigate(`/admin/view-orders/${order.$id}`)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewOrders;
