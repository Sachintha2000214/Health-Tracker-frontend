import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="min-h-screen bg-[#B2EBF2] text-black p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-4">Protecting you and</h1>
          <h2 className="text-6xl font-bold mb-8">your health</h2>
          <p className="text-black text-xl">
            Your trusted healthcare platform focused on providing quality medical services
          </p>
        </div>

        {/* Login Section */}
        <div className="text-center mb-8">
          <h3 className="text-2xl mb-8 font-bold">Log in as a</h3>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Doctor Card */}
          <Link to="/login" className="block">
            <div className="bg-[#1a1a1a] rounded-2xl p-8 hover:bg-[#222] transition-colors cursor-pointer">
              <div className="aspect-square rounded-full overflow-hidden mb-6 max-w-[200px] mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400&h=400"
                  alt="Doctor"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-3xl text-white mb-4 flex items-center justify-center gap-3">
                <span className="text-2xl">👨‍⚕️</span>
                DOCTOR
              </h3>
            </div>
          </Link>

          {/* Patient Card */}
          <Link to="/userlogin" className="block">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 hover:bg-[#222] transition-colors cursor-pointer">
            <div className="aspect-square rounded-full overflow-hidden mb-6 max-w-[200px] mx-auto">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400&h=400"
                alt="Patient"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-3xl mb-4 flex items-center justify-center gap-3 text-white">
              <img
                src="patient.png"
                alt="Patient"
                className="w-7 h-7 object-cover"
              />
              PATIENT
            </h3>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
