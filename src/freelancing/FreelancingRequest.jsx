import React from 'react';
import { motion } from "framer-motion";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { Helmet } from "react-helmet";

const images = [
  "https://images.pexels.com/photos/842548/pexels-photo-842548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/7181179/pexels-photo-7181179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/6457524/pexels-photo-6457524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/5538320/pexels-photo-5538320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const FreelancingRequest = () => {
  return (
    <div className="w-full bg-gray-900 text-white">
      {/* Helmet for SEO */}
      <Helmet>
        <title>Freelancing Opportunities | WebDial</title>
        <meta name="description" content="Join WebDial's freelancing portal and start earning. We offer opportunities for students, professionals, and skilled individuals. Reach out via email or WhatsApp." />
        <meta name="keywords" content="freelancing, job opportunities, work from home, WebDial, student freelancing, professional freelancing" />
        <meta property="og:title" content="Freelancing Opportunities | WebDial" />
        <meta property="og:description" content="Join WebDial's freelancing portal to find work, internships, and earn money. Reach us via email or WhatsApp." />
        <meta property="og:image" content="https://your-image-url-here.jpg" />
        <meta property="og:url" content="https://web.webdial.in/freelancing" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Freelancing Opportunities | WebDial" />
        <meta name="twitter:description" content="Join WebDial's freelancing portal to find work and internships. Connect via email or WhatsApp." />
        <meta name="twitter:image" content="https://your-image-url-here.jpg" />
      </Helmet>

      {/* Scrolling Image Section */}
      <div className="overflow-hidden w-full h-[200px] relative">
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-25%"] }}  // Animate from 0% to -25% for continuous loop
          transition={{
            repeat: Infinity,
            duration: 6,  // Adjust time to control the scroll speed
            ease: "linear",
          }}
        >
          {[...images, ...images].map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Freelancing Image ${index + 1}`}
              className="w-[25vw] h-[200px] object-cover"
            />
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="p-6 text-center">
        <motion.h2
          className="text-2xl font-bold text-yellow-400"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Are You a Student? A Working Professional? Or a Skilled Person?
        </motion.h2>
        <p className="text-lg mt-3">
          Join our freelancing portal to grow & earn money! 🚀
        </p>

        {/* Contact Section */}
        <div className="mt-6">
          <p className="text-lg">📩 Send your portfolio at:</p>
          <motion.a
            href="mailto:help@webdial.in"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-all text-lg mt-2"
            whileHover={{ scale: 1.1 }}
          >
            <FaEnvelope className="mr-2" /> help@webdial.in
          </motion.a>

          <p className="mt-4 text-lg">📱 Or send via WhatsApp:</p>
          <motion.a
            href="https://wa.me/7049548385"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-lg mt-2 shadow-lg hover:bg-green-600 transition-all"
            whileHover={{ scale: 1.1 }}
          >
            <FaWhatsapp className="mr-2 text-xl" /> Send on WhatsApp
          </motion.a>
        </div>

        {/* Internship Info */}
        <motion.div
          className="mt-8 p-4 border rounded-lg bg-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-xl font-semibold text-green-400">
            Looking for an Internship?
          </h3>
          <p className="mt-2">
            If you are a student wanting to gain skills or work on live projects,
            <strong> Welcome for Internships! </strong> 🎯
          </p>
          <p className="mt-2 text-red-400 font-semibold">
            ⚠ We are not hiring interns right now, but contact us for the next steps!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FreelancingRequest;
