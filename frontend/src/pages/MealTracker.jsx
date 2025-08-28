import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import bmi from "../assets/img/bmi.png";
import calorie from "../assets/img/calorie.png";
import smartCalorie from "../assets/img/smart_calorie_counter.jpg"; // <-- Add this image to your assets

const MealTracker = () => {
  const currentDate = new Date().toLocaleDateString("en-GB"); // Format the current date
  const [user, setUser] = useState(null); // State to hold user data

  // Categories for the dashboard
  const categories = [
    { name: "BMI Calculator", image: bmi, path: "/bmiCal" },
    { name: "Calorie Calculator", image: calorie, path: "/caloriesCal" },
    { name: "Pre-Bite Calorie Counter", image: smartCalorie, path: "/smartcaloriecounter" }, // ⭐️ Added here
  ];

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-teal-700 mb-4 tracking-wide">HELLO!</h1>
          <p className="text-2xl font-medium text-gray-700 mb-2">{user ? user.name : "Guest"}</p>
          <p className="text-lg text-gray-500 bg-white px-4 py-2 rounded-full inline-block shadow-sm">
            📅 {currentDate}
          </p>
        </div>



        {/* Categories Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nutrition & Fitness Tools</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.path}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:scale-105 hover:-rotate-1 p-8 border border-gray-100"
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg bg-gradient-to-r from-teal-100 to-blue-100 p-4 group-hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 rounded-full border-4 border-teal-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-teal-700 group-hover:text-teal-800 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full mx-auto group-hover:w-24 transition-all duration-300"></div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-full text-sm font-medium">
                      Get Started →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer spacing */}
        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default MealTracker;