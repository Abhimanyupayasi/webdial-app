import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const FloatingIcons = () => {
  return (
    <div className="fixed top-20 right-3 z-50 flex flex-col items-center space-y-4 p-3">
      {/* WhatsApp Icon */}
      <motion.a
        href="https://wa.me/7049548385"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-lg"
        whileHover={{ scale: 1.3, rotate: 10 }}
        animate={{ y: [0, -8, 0, 8, 0], rotate: [0, -5, 0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <FaWhatsapp className="text-3xl" />
      </motion.a>

      {/* Call Icon */}
      <motion.a
        href="tel:+918965099437"
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg"
        whileHover={{ scale: 1.3, rotate: -10 }}
        animate={{ y: [0, 8, 0, -8, 0], rotate: [0, 5, 0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.3 }}
      >
        <FaPhoneAlt className="text-3xl" />
      </motion.a>
    </div>
  );
};

export default FloatingIcons;
