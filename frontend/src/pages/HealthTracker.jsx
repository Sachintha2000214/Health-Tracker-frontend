import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/img/bloodpressure.png";
import img2 from "../assets/img/bloodsugar.png";
import img3 from "../assets/img/lipidprofile.png";
import img4 from "../assets/img/fbc.png";

const HealthTracker = () => {
  const currentDate = new Date().toLocaleDateString("en-GB"); // Format the current date
  const [user, setUser] = useState(null); // State to hold user data
  const [doctors, setDoctors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

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
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5555/api/doctor/getalldoctors');
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
      
        const savedDoctorId = localStorage.getItem('selectedDoctorId');
        if (savedDoctorId && Array.isArray(data)) {
          const savedDoctor = data.find(doc => doc.doctorNumber === savedDoctorId);
          if (savedDoctor) {
            console.log(savedDoctor)
            setSelectedDoctor(savedDoctor.doctorNumber);
            setDoctors(data);
          }
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);


  const handleChange = (e) => {
    setSelectedDoctor({ ...doctors, [e.target.name]: e.target.value });
    console.log(e.target.value)
    if (e.target.value) {
      localStorage.setItem('selectedDoctorId', e.target.value);
    } else {
      localStorage.removeItem('selectedDoctorId');
    }
  };
  return (
    <div className="bg-gradient-to-r from-teal-100 to-blue-100 min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="text-center mb-8 py-8">
        <h1 className="text-4xl font-semibold text-teal-700">HELLO!</h1>
        <p className="text-lg text-gray-700">{user ? user.name : "Guest"}</p>
        <p className="text-sm text-gray-500">Date: {currentDate}</p>
      </div>

         
      {loading ? (
        <p className="text-center">Loading doctors...</p>
      ) : (
        <div className="max-w-md mx-auto mb-8">
          <label htmlFor="doctorSelect" className="block text-gray-700 mb-2">
            Select a Doctor:
          </label>
          <select
            id="doctorSelect"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            onChange={handleChange}
            value={selectedDoctor}
          >
            <option value="">-- Select a Doctor --</option>
            {doctors.map(doctor => (
              <option key={doctor.doctorNumber} value={doctor.doctorNumber}>
                {doctor.name} ({doctor.specialization})
              </option>
            ))}
            </select>
        </div>
      )}

      {/* Categories Section */}
      {doctors && (
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.path}// Using Link for navigation
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
    )}
    </div>
  );
};

export default HealthTracker;
