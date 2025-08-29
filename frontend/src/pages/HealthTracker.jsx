import React, { useState, useEffect, useMemo } from "react";
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

  const categories = [
    { name: "Blood Pressure", image: img1, path: "/bloodpressure" },
    { name: "Blood Sugar", image: img2, path: "/bloodsugar" },
    { name: "Lipid Profile", image: img3, path: "/lipidprofile" },
    { name: "FBC", image: img4, path: "/fbc" },
  ];

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    const fetchDoctors = async () => {
      try {
        const response = await fetch("https://health-tracker-backend-s5ei-umr8y997a.vercel.app//api/doctor/getalldoctors");
        if (!response.ok) throw new Error("Failed to fetch doctors");
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setDoctors(data);
          const savedDoctorId = localStorage.getItem("selectedDoctorId");
          if (savedDoctorId) setSelectedDoctor(savedDoctorId);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const doctorId = e.target.value; // keep as string
    setSelectedDoctor(doctorId);
    if (doctorId) {
      localStorage.setItem("selectedDoctorId", doctorId);
    } else {
      localStorage.removeItem("selectedDoctorId");
    }
  };

  // Derive the full doctor object for the selected id (coerce both to string)
  const selectedDoctorObj = useMemo(
    () => doctors.find((d) => String(d.doctorNumber) === String(selectedDoctor)),
    [doctors, selectedDoctor]
  );

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

        {/* Doctor Selection Section */}
        <div className="max-w-2xl mx-auto mb-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-lg border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1000&q=80"
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Your Doctor</h2>
            <p className="text-gray-600">Choose your preferred healthcare provider</p>
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
                {doctors.map((doctor) => (
                  <option key={doctor.doctorNumber} value={String(doctor.doctorNumber)}>
                    Dr. {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>

              {selectedDoctorObj && (
                <div className="mt-4 p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400">
                  <p className="text-teal-700 font-medium">
                    ✅ Selected: {selectedDoctorObj.name}
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
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Health Monitoring Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.path}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:scale-105 hover:-rotate-1 p-8 border border-gray-100"
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="relative">
                    <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg bg-gradient-to-r from-teal-100 to-blue-100 p-4 group-hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 rounded-full border-4 border-teal-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-teal-700 group-hover:text-teal-800 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full mx-auto group-hover:w-24 transition-all duration-300"></div>
                  </div>

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

      {/* Floating Chat Button (shows only when a doctor is selected) */}
      {selectedDoctorObj && (
        <div className="fixed bottom-6 right-6">
          <Link
            to={`/chat?doctor=${encodeURIComponent(selectedDoctor)}`}
            className="inline-flex items-center gap-2 px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
            aria-label={`Chat with Dr. ${selectedDoctorObj.name}`}
          >
            {/* Chat icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M2 5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H9.83l-4.12 3.294A1 1 0 0 1 4 19.47V17H5a3 3 0 0 1-3-3V5z" />
            </svg>
            <span>Chat with Dr. {selectedDoctorObj.name}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HealthTracker;
