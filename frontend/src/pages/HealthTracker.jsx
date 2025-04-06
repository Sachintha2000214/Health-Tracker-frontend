import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/img/bloodpressure.png";
import img2 from "../assets/img/bloodsugar.png";
import img3 from "../assets/img/lipidprofile.png";
import img4 from "../assets/img/fbc.png";

const HealthTracker = () => {
  const currentDate = new Date().toLocaleDateString("en-GB"); // Format the current date
  const [user, setUser] = useState(null); // State to hold user data

  // Categories for the dashboard with updated images
  const categories = [
    { name: "Blood Pressure", image: img1, path: "/bloodpressure" },
    { name: "Blood Sugar", image: img2, path: "/bloodsugar" },
    { name: "Lipid Profile", image: img3, path: "/lipidprofile" },
    { name: "FBC", image: img4, path: "/fbc" },
  ];

  // Set user info on component mount
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-teal-100 to-blue-100 min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="text-center mb-8 py-8">
        <h1 className="text-4xl font-semibold text-teal-700">HELLO!</h1>
        <p className="text-lg text-gray-700">{user ? user.name : "Guest"}</p>
        <p className="text-sm text-gray-500">Date: {currentDate}</p>
      </div>

      {/* Categories Section */}
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.path} // Using Link for navigation
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 w-full flex items-center justify-between"
          >
            {/* Image for Category */}
            <img
              src={category.image}
              alt={category.name}
              className="w-16 h-16 object-cover rounded-full mr-4"
            />
            {/* Category Name */}
            <div className="text-xl font-semibold text-teal-600 hover:text-teal-800 transition-colors duration-200">
              {category.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HealthTracker;
