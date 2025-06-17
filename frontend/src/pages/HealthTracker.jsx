import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/img/bloodpressure.png";
import img2 from "../assets/img/bloodsugar.png";
import img3 from "../assets/img/lipidprofile.png";
import img4 from "../assets/img/fbc.png";


const HealthTracker = () => {
  const currentDate = new Date().toLocaleDateString("en-GB");
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  // Categories for the dashboard with updated images
  // Categories for the dashboard with updated images
  const categories = [
    { name: "Blood Pressure", image: img1, path: "/bloodpressure" },
    { name: "Blood Sugar", image: img2, path: "/bloodsugar" },
    { name: "Lipid Profile", image: img3, path: "/lipidprofile" },
    { name: "FBC", image: img4, path: "/fbc" },
    { name: "Blood Pressure", image: img1, path: "/bloodpressure" },
    { name: "Blood Sugar", image: img2, path: "/bloodsugar" },
    { name: "Lipid Profile", image: img3, path: "/lipidprofile" },
    { name: "FBC", image: img4, path: "/fbc" },
  ];

  // Set user info on component mount
  useEffect(() => {
    // Get user from session storage
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    
    // Fetch doctors from API
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5555/api/doctor/getalldoctors');
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        
        const data = await response.json();
        console.log("Doctors data received:", data);
        
        if (Array.isArray(data) && data.length > 0) {
          setDoctors(data);
          
          // Check for previously selected doctor
          const savedDoctorId = localStorage.getItem('selectedDoctorId');
          console.log("Saved doctor ID:", savedDoctorId);
          
          if (savedDoctorId) {
            setSelectedDoctor(savedDoctorId);
          }
        } else {
          console.warn("No doctors found or invalid data format");
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
    const doctorId = e.target.value;
    console.log("Selected doctor ID:", doctorId);
    
    setSelectedDoctor(doctorId);
    
    // Store selected doctor ID
    if (doctorId) {
      localStorage.setItem('selectedDoctorId', doctorId);
    } else {
      localStorage.removeItem('selectedDoctorId');
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-teal-700 mb-4 tracking-wide">
            HELLO!
          </h1>
          <p className="text-2xl font-medium text-gray-700 mb-2">
            {user ? user.name : "Guest"}
          </p>
          <p className="text-lg text-gray-500 bg-white px-4 py-2 rounded-full inline-block shadow-sm">
            📅 {currentDate}
          </p>
        </div>

        {/* Doctor Selection Section */}
        <div className="max-w-2xl mx-auto mb-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            {/* Doctor Image */}
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-lg border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Select Your Doctor
            </h2>
            <p className="text-gray-600">
              Choose your preferred healthcare provider
            </p>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading doctors...</p>
            </div>
          ) : doctors.length > 0 ? (
            <div>
              <select
                id="doctorSelect"
                className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                onChange={handleChange}
                value={selectedDoctor}
                name="doctorNumber"
              >
                <option value="">-- Select a Doctor --</option>
                {doctors.map(doctor => (
                  <option key={doctor.doctorNumber} value={doctor.doctorNumber}>
                    Dr. {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
              
              {selectedDoctor && (
                <div className="mt-4 p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400">
                  <p className="text-teal-700 font-medium">
                    ✅ Selected: {doctors.find(d => d.doctorNumber === selectedDoctor)?.name || "Unknown"}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-red-500 text-lg">❌ No doctors available</p>
            </div>
          )}
        </div>

        {/* Health Categories Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Health Monitoring Dashboard
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.path}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:scale-105 hover:-rotate-1 p-8 border border-gray-100"
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Image Container */}
                  <div className="relative">
                    <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg bg-gradient-to-r from-teal-100 to-blue-100 p-4 group-hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    {/* Decorative ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-teal-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  </div>
                  
                  {/* Category Name */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-teal-700 group-hover:text-teal-800 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full mx-auto group-hover:w-24 transition-all duration-300"></div>
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-full text-sm font-medium">
                      Click to Monitor →
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

export default HealthTracker;