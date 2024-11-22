import { Client, Databases } from 'appwrite';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import conf from '../../conf/conf'; // Adjust the path as needed

function FetchUserOrders() {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.$id; // Ensure user exists before accessing $id
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return; // Exit early if userId is not available

    const client = new Client();
    client
      .setEndpoint(conf.appwriteUrl) // Replace with your Appwrite endpoint
      .setProject(conf.appwriteProjectId); // Replace with your Appwrite project ID

    const databases = new Databases(client);

    const fetchOrdersAndProducts = async () => {
      try {
        // Fetch all user orders
        const response = await databases.listDocuments(
          conf.appwriteDatabaseId, // Replace with your database ID
          conf.appwriteOrderId  // Replace with your orders collection ID
        );

        // Filter orders by userId
        const userOrders = response.documents.filter((order) => order.userId === userId);

        // Fetch product details for each order
        const productDetailsPromises = userOrders.map(async (order) => {
          if (!order.productId) {
            console.warn(`Order ${order.$id} has no valid productId`);
            return { ...order, productDetails: null };
          }

          try {
            const productResponse = await databases.getDocument(
              conf.appwriteDatabaseId, // Replace with your database ID
              conf.appwriteCollectionId, // Replace with your products collection ID
              order.productId
            );
            return { ...order, productDetails: productResponse };
          } catch (productError) {
            console.error(`Error fetching product ${order.productId}:`, productError.message || productError);
            return { ...order, productDetails: null };
          }
        });

        const enrichedOrders = await Promise.all(productDetailsPromises);

        setOrders(enrichedOrders);
        setLoading(false);
      } catch (fetchError) {
        console.error("Error fetching orders:", fetchError.message || fetchError);
        setError("Failed to fetch orders. Please try again later.");
        setLoading(false);
      }
    };

    fetchOrdersAndProducts();
  }, [userId]);

  if (loading) {
    return <div className='h-screen w-full flex justify-center items-center'>
        <span className="loading loading-spinner text-info loading-lg"></span>
        </div>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl text-white">Your Orders</h1>
      {orders.length > 0 ? (
        <ul className="text-white">
          {orders.map((order) => (
            <li key={order.$id} className="border p-2 mb-2 rounded">
              <p>
                <strong>Order ID:</strong> {order.$id}
              </p>
              <p>
                <strong>Name:</strong> {order.name}
              </p>
              <p>
                <strong>Mobile:</strong> {order.mobile}
              </p>
              <p>
                <strong>Price:</strong> {order.price}
              </p>
              {order.productDetails ? (
                <>
                  <p>
                    <strong>Product Name:</strong> {order.productDetails.name}
                  </p>
                  <p>
                    <strong>Product Description:</strong> {order.productDetails.description}
                  </p>
                  <p>
                    <strong>Actual Price:</strong> {order.productDetails.actual_price}
                  </p>
                  <p>
                    <strong>Discounted Price:</strong> {order.productDetails.price}
                  </p>
                  <div className="flex p-6  justify-center">
                    <img
                      src={order.productDetails.img}
                      alt={order.productDetails.name}
                      className="w-auto h-auto md:w-1/2 lg:w-1/2 object-cover rounded"
                    />
                  </div>
                </>
              ) : (
                <p className="text-red-500">Product details not found.</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">No orders found.</p>
      )}
    </div>
  );
}

export default FetchUserOrders;
