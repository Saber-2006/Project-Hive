import { Link } from "react-router-dom";
import { motion } from 'framer-motion';


export default function Notfound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50 dark:bg-gray-900">
      
      {/* 404 Big Text */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-7xl font-extrabold text-blue-500"
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-xl text-gray-700 dark:text-gray-300"
      >
        Oops! Page not found.
      </motion.p>

      <p className="mt-2 text-gray-500 dark:text-gray-400">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-2xl shadow-md hover:bg-blue-600 transition"
        >
          Go Back Home
        </Link>
      </motion.div>

    </div>
  );
}