import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// You'll need to import a doctor image similar to the patient image
import doctorImage from '../assets/img/doctor.png'

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = formData;

    try {
      const response = await fetch("http://health-tracker-backend-s5ei.vercel.app/api/doctor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Login successful:", result);
        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("user", JSON.stringify(result.doctor));
        navigate("/docdashboard");
      } else {
        console.error("Error:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="relative py-20 lg:py-10 overflow-hidden">
      <div className="container mx-auto shadow-xl rounded-lg p-8 bg-gradient-to-r from-teal-100 to-blue-100 min-h-screen flex flex-col">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap -mx-4 xl:items-center">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 xl:w-3/5 px-4 order-last lg:order-first">
              <div className="relative max-w-xl mx-auto lg:mx-0 lg:max-w-3xl h-full">
                {/* Replace with your doctor image */}
                <img
                  className="block w-1/2 h-auto object-contain rounded-3xl mx-auto"
                  src={doctorImage}
                  alt="Doctor"
                />
              </div>
            </div>

            {/* Login Section */}
            <div className="w-full lg:w-1/2 xl:w-2/5 px-4 mb-16 lg:mb-0">
              <div className="max-w-md lg:py-20 mx-auto lg:mr-0">
                <h3 className="font-heading text-4xl text-gray-900 font-semibold mb-4">
                  Doctor Login
                </h3>
                <p className="text-lg text-gray-500 mb-10">
                  Greetings on your return!
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label
                      className="block mb-1.5 text-sm text-gray-900 font-semibold"
                      htmlFor="email"
                    >
                      Doctor Email
                    </label>
                    <input
                      className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-blue-500 focus:outline-blue rounded-lg"
                      type="email"
                      id="email"
                      placeholder="doctor@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-7">
                    <div className="flex mb-1.5 items-center justify-between">
                      <label
                        className="block text-sm text-gray-900 font-semibold"
                        htmlFor="password"
                      >
                        Password
                      </label>
                    </div>
                    <input
                      className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-blue-500 focus:outline-blue rounded-lg"
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button
                     className="relative group block w-full mb-6 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-teal-900 rounded-full overflow-hidden"
                    type="submit"
                  >
                    Login
                  </button>
                  <span className="text-xs font-semibold text-gray-900">
                    <span>Don't have an account?</span>
                    <Link to="/register">
                      <span className="ml-1 inline-block text-teal-700 hover:text-bg-teal-900 cursor-pointer">
                        Sign up
                      </span>
                    </Link>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;