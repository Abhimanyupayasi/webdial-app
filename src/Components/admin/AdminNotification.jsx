import React, { useState, useEffect } from 'react';
import { Client, Databases } from 'appwrite';
import conf from '../../conf/conf';

const AdminNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize Appwrite client
  const client = new Client();
  const databases = new Databases(client);

  useEffect(() => {
    client
      .setEndpoint(conf.appwriteUrl) // Replace with your Appwrite endpoint
      .setProject(conf.appwriteProjectId); // Replace with your Appwrite project ID

    const fetchNotifications = async () => {
      try {
        const response = await databases.listDocuments(
          conf.appwriteDatabaseId, // Replace with your database ID
          conf.appwriteMessagesId // Replace with your collection ID
        );
        setNotifications(response.documents);
        setLoading(false);
      } catch (err) {
        //console.error('Error fetching notifications:', err);
        setError('Failed to fetch notifications.');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div className='w-full h-screen flex justify-center items-center'>
      <span className="loading loading-ball loading-xs"></span>
      <span className="loading loading-ball loading-sm"></span>
      <span className="loading loading-ball loading-md"></span>
      <span className="loading loading-ball loading-lg"></span>
    </div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 border-b-2 border-white bg-gray-800 min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-4">Admin Notifications</h2>
      <div className="flex flex-col gap-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.$id} className="chat chat-start">
              {/* Admin Image */}
              <div className="chat-image  avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Admin"
                    src="https://www.webdial.in/imgs/team/abhimanyu.webp"
                  />
                </div>
              </div>
              {/* Notification Content */}
              <div>
                <div className="chat-header  px-10">
                  Admin
                  <time className="text-xs opacity-50 ml-2">
                    {new Date(notification.$createdAt).toLocaleTimeString()}
                  </time>
                </div>
                <div className="chat-bubble pr-5 bg-gray-700 text-white">
                  <h3 className="font-bold">{notification.heading || 'No Heading'}</h3>
                  <p className='pr-7'>{notification.message || 'No Message'}</p>
                  {notification.link && (
                    <a
                      href={notification.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 pr-4 hover:underline"
                    >
                      {notification.link}
                    </a>
                  )}
                </div>
                <div className="chat-footer opacity-50">
                  Created at: {new Date(notification.$createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-400">
            No notifications available.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotification;
