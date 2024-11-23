import React, { useState } from "react";
import { Client, Databases } from "appwrite";
import conf from "../../conf/conf";
import { useNavigate } from "react-router-dom";

const ServiceForm = () => {
  const navigate = useNavigate();
  const client = new Client()
    .setEndpoint(conf.appwriteUrl) // Replace with your Appwrite endpoint
    .setProject(conf.appwriteProjectId); // Replace with your Appwrite project ID

  const databases = new Databases(client);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    actual_price: "",
    price: "",
    img: null,
  });

  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [toastMessage, setToastMessage] = useState(""); // State for toast message

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "img" && files) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview to be the base64 URL
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "webdial-services"); // Replace with your Cloudinary upload preset
    formData.append("folder", "services"); // Optional: Folder name in Cloudinary
    
    const response = await fetch(`${conf.cloudinaryUrl}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await response.json();
    return data.secure_url; // URL of the uploaded image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Upload the image to Cloudinary
      const imageUrl = await uploadToCloudinary(formData.img);

      // Create a new document in the Appwrite collection
      await databases.createDocument(
        conf.appwriteDatabaseId, // Replace with your database ID
        conf.appwriteCollectionId, // Replace with your collection ID
        "unique()", // Generate a unique ID for the document
        {
          name: formData.name,
          description: formData.description,
          actual_price: formData.actual_price,
          price: formData.price,
          img: imageUrl, // Store the Cloudinary URL
        }
      );

      // Set toast message
      setToastMessage("Service added successfully!");

      // Reset form fields and image preview
      setFormData({
        name: "",
        description: "",
        actual_price: "",
        price: "",
        img: null,
      });
      setImagePreview(null); // Reset preview after submission

      // Refresh page after 1 second
      setTimeout(() => {
        navigate("/dashboard");
        
      }, 1000);

    } catch (error) {
      //console.error("Error uploading service:", error);
      setToastMessage("Failed to upload service. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-10 mb-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast  z-50 toast-top toast-center">
          <div className="alert alert-info">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Service Form */}
      <div className="p-4 max-w-md mx-auto bg-gray-800 text-white rounded shadow">
        <h2 className="text-lg font-bold mb-4">Add a New Service</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="text"
            name="actual_price"
            placeholder="Actual Price"
            value={formData.actual_price}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          
          <div className="mb-4">
            <input
              type="file"
              name="img"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Image preview"
                  className="w-full h-40 object-cover rounded mb-4"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 p-2 rounded text-white hover:bg-blue-600"
            disabled={uploading}
          >
            {uploading ? (
              <span className="loading loading-infinity loading-lg"></span>
            ) : (
              "Add Service"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
