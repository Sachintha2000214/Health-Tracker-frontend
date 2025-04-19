import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    doctornumber: '',
    mobilenumber: '',
    specialization: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5555/api/doctor/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      navigate("/login");
      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong!');
      }

      console.log('Signup Result:', result);
      // Redirect or show success message
    } catch (err) {
      setError(err.message || 'Failed to signup. Please try again.');
    }
  };

  return (
    <section className="relative py-20 lg:py-10 overflow-hidden">
      <div className="container mx-auto shadow-xl rounded-lg p-8 bg-sky-100">
        <div className="max-w-md mx-auto">
          <h3 className="font-heading text-4xl text-gray-900 font-semibold mb-4">
            Create a new account
          </h3>
          <p className="text-lg text-gray-500 mb-10">
            Welcome! Please fill in the form to create an account.
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
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
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            {/* Doctor Number Field */}
            <div className="mb-6">
              <label
                className="block mb-1.5 text-sm text-gray-900 font-semibold"
                htmlFor="doctorNumber"
              >
                Doctor Number
              </label>
              <input
                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                type="text"
                id="doctorNumber"
                name="doctornumber"
                value={formData.doctornumber}
                onChange={handleChange}
                placeholder="D12345"
              />
            </div>

            <div className="mb-6">
            <label
              className="block mb-1.5 text-sm text-gray-900 font-semibold"
              htmlFor="specialization"
            >
              Doctor Specialization
            </label>
            <select
              className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
            >
              <option value="">Select specialization</option>
              
              {/* General & Family Care */}
              <option value="Family Medicine Physician">Family Medicine Physician – General care for all ages</option>
              <option value="General Practitioner">General Practitioner (GP) – Basic health evaluation</option>
              <option value="Pediatrician">Pediatrician – Child health (birth to teens)</option>
              <option value="Geriatrician">Geriatrician – Elderly care</option>
              <option value="Internal Medicine Physician">Internal Medicine Physician – Adult health</option>
              
              {/* Specialist Referrals */}
              <option value="Cardiologist">Cardiologist – Heart health (BP, ECG, etc.)</option>
              <option value="Endocrinologist">Endocrinologist – Diabetes, thyroid, hormones</option>
              <option value="Gynecologist">Gynecologist – Women’s reproductive health</option>
              <option value="Dermatologist">Dermatologist – Skin, acne, moles</option>
              <option value="Ophthalmologist">Ophthalmologist – Vision and eye care</option>
              <option value="ENT">ENT (Otolaryngologist) – Ear, nose, throat</option>
              <option value="Dentist">Dentist – Oral checkups and hygiene</option>
              <option value="Nutritionist">Nutritionist/Dietitian – Diet and healthy eating</option>
              <option value="Psychiatrist">Psychiatrist/Psychologist – Mental health and stress</option>
            </select>
          </div>

            {/* Mobile Number Field */}
            <div className="mb-6">
              <label
                className="block mb-1.5 text-sm text-gray-900 font-semibold"
                htmlFor="mobileNumber"
              >
                Mobile Number
              </label>
              <input
                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                type="text"
                id="mobilenumber"
                name="mobilenumber"
                value={formData.mobilenumber}
                onChange={handleChange}
                placeholder="Enter your mobile number"
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
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
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
                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter a secure password"
              />
            </div>

            {/* Signup Button */}
            <button
              className="relative group block w-full mb-6 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-orange-900 rounded-full overflow-hidden"
              type="submit"
            >
              <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
              <span className="relative">Sign Up</span>
            </button>

            {/* Redirect to Login */}
            <span className="text-xs font-semibold text-gray-900">
              <span>Already have an account?</span>
              <a
                className="ml-1 inline-block text-orange-900 hover:text-orange-700"
                href="/login"
              >
                Login
              </a>
            </span>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
