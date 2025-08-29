import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import patientImage from '../assets/img/patient.png'

const UserRegister = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://health-tracker-backend-s5ei.vercel.app/api/patient/signup", formData);
      console.log("User registered successfully:", response.data);
      navigate("/userlogin");
    } catch (error) {
      console.error("Error registering user:", error.response.data);
    }
  };

  return (
    <section className="relative py-20 lg:py-10 overflow-hidden">
      <div className="container mx-auto shadow-xl rounded-lg p-8 bg-gradient-to-r from-teal-100 to-blue-100 min-h-screen flex flex-col">
        <div className="max-w-md mx-auto">
          <h3 className="font-heading text-4xl text-gray-900 font-semibold mb-4">
            - Patient Sign Up Form -
          </h3>
          <div className="text-center mt-6">
            <img 
              src={patientImage} 
              alt="Patient" 
              className="mx-auto w-1/4" 
            />
          </div>
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-6">
              <label
                className="block mb-1.5 text-sm text-gray-900 font-semibold"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label
                className="block mb-1.5 text-sm text-gray-900 font-semibold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Mobile Number Field */}
            <div className="mb-6">
              <label
                className="block mb-1.5 text-sm text-gray-900 font-semibold"
                htmlFor="mobilenumber"
              >
                Mobile Number
              </label>
              <input
                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                type="text"
                id="mobilenumber"
                name="mobilenumber"
                placeholder="Enter your mobile number"
                value={formData.mobilenumber}
                onChange={handleChange}
              />
            </div>

            {/* Password Field */}
            <div className="mb-7">
              <label
                className="block mb-1.5 text-sm text-gray-900 font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-teal-500 focus:outline-purple rounded-lg"
                type="password"
                id="password"
                name="password"
                placeholder="Enter a secure password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Signup Button */}
            <button
              className="relative group block w-full mb-6 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-teal-900 rounded-full overflow-hidden"
              type="submit"
            >
              <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
              <span className="relative">Sign Up</span>
            </button>

            {/* Redirect to Login */}
            <Link to="/userlogin" className="block">
            <span className="text-xs font-semibold text-gray-900">
              <span>Already have an account?</span>
              <a
                className="ml-1 inline-block text-teal-700 hover:text-teal-700"
                href="#"
              >
                Login
              </a>
            </span>
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserRegister;
