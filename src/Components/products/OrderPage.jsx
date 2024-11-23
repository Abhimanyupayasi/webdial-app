import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Client, Databases, Account, ID } from "appwrite"; 
import conf from "../../conf/conf";

const OrderPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);

  const databases = new Databases(client);
  const account = new Account(client);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await databases.getDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          productId
        );
        setProduct(response);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to fetch product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);
      } catch (err) {
        //console.error("Error fetching user details:", err);
        setError("Failed to fetch user details. Please log in.");
      }
    };

    fetchProductDetails();
    fetchUserDetails();
  }, [productId]);

  const handlePlaceOrder = async () => {
    if (!userId) {
      setError("Please log in to place an order.");
      return;
    }

    if (!name || !mobile) {
      setError("Name and Mobile Number are required.");
      return;
    }

    try {
      const order = {
        productId,
        userId,
        name,
        mobile,
        price: product.price,
      };

      await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteOrderId,
        ID.unique(),
        order
      );

      navigate(`/order-success/${productId}`);
    } catch (err) {
      console.error("Error creating order:", err);
      setError("Failed to place order. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center text-white">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 text-white">
      <h2 className="text-2xl font-bold text-center mb-4">Order Product</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-bold">{product.name}</h3>
        <p className="text-sm text-gray-400">{product.description}</p>
        <div className="mt-4">
          <p className="text-lg font-bold text-green-400">
            ₹{product.price}
          </p>
          <p className="text-sm text-gray-500">
            <span className="line-through text-red-500">₹{product.actual_price}</span>
          </p>
        </div>

        {/* Input Fields for Name and Mobile */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Mobile Number</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter your mobile number"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button
          onClick={handlePlaceOrder}
          className="mt-6 w-full px-6 py-3 rounded-full bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
