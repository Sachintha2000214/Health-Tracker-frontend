import React from "react";

const HealthTrackerHero = () => {
  return (
    <div className="bg-neutralBackground min-h-screen flex items-center justify-center px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Your Own <br />
            <span className="text-pcolor">Mobile Health Tracker</span>
          </h1>
          <p className="text-gray-600">
            In times like today, your health is very important, especially since
            the number of COVID-19 cases is increasing day by day. We are ready
            to help you with your health consultation.
          </p>
          <button className="bg-pcolor text-white px-6 py-3 rounded-lg hover:bg-pcolor transition duration-300">
            Download App
          </button>
          {/* Statistics */}
          <div className="flex space-x-8 mt-6">
            <div>
              <h2 className="text-2xl font-bold text-darkColor">200+</h2>
              <p className="text-gray-500">Active Doctors</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-darkColor">15K+</h2>
              <p className="text-gray-500">Active Users</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-darkColor">20K+</h2>
              <p className="text-gray-500">Total Downloads</p>
            </div>
          </div>
        </div>
        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="/assets/img/bg.jpg"
            alt="Mobile Health Tracker"
            className="max-w-full rounded-3xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HealthTrackerHero;
