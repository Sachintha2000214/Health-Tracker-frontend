import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat, faTachometerAlt, faTint, faChartLine, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { Activity, Droplet, TrendingUp, Heart, FileText } from "react-feather"; // Assuming you use react-feather for icons

const HealthTracker = () => {
  const currentDate = new Date().toLocaleDateString("en-GB"); // Format the current date
  const [user, setUser] = useState(null); // State to hold user data

  // Categories for the dashboard
  const categories = [
    { name: "Blood Pressure", icon: <Activity className="w-6 h-6" />, path: "/bloodpressure" },
    { name: "Blood Sugar", icon: <Droplet className="w-6 h-6" />, path: "/bloodsugar" },
    { name: "Lipid Profile", icon: <TrendingUp className="w-6 h-6" />, path: "/lipidprofile" },
    { name: "FBC", icon: <Heart className="w-6 h-6" />, path: "/fbc" },
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
    <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
      {categories.map((category, index) => (
        <Link
          key={index}
          to={category.path} // Using Link for navigation
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-between w-full"
        >
          <div className="text-xl font-semibold text-teal-600 hover:text-teal-800 transition-colors duration-200">{category.name}</div>
          <div className="p-4 bg-teal-200 rounded-full transition-transform transform hover:scale-110 duration-300">
            {category.icon}
          </div>
        </Link>
      ))}
    </div>
  </div>
  );
};

export default HealthTracker;
