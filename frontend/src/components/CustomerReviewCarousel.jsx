import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import QRcode from "../assets/img/QRcode.jfif";

const CustomerReviewCarousel = () => {
  const [showQR, setShowQR] = useState(false)
  return (
    <div className="max-w-2xl mx-auto text-center py-20 p-6 relative">
      <h2 className="font-sans font-bold text-3xl mb-6 text-teal-600">Discover Health Tracker</h2>

      <p className="text-gray-700 mb-6 text-base px-4">
        Welcome to Health Tracker, your dedicated wellness companion. Our platform is designed to guide you through your health journey, offering personalized meal plans, detailed progress reports, and expert consultations with healthcare professionals to help you stay on track.
      </p>

      {/* Personalized Meal Plans */}
      <div className="mb-6 group relative">
        <h3 className="font-semibold text-xl mb-3 text-teal-500 group-hover:text-teal-700 transition duration-300">Personalized Meal Plans</h3>
        <p className="text-gray-600 text-base">
          Tailor your diet to meet your health goals with Health Tracker’s personalized meal plans. Whether you're aiming to lose weight, build muscle, or maintain a healthy lifestyle, our plans are crafted to support your unique needs.
        </p>
      </div>

      {/* Track Your Health Reports */}
      <div className="mb-6 group relative">
        <h3 className="font-semibold text-xl mb-3 text-teal-500 group-hover:text-teal-700 transition duration-300">Track Your Health Reports</h3>
        <p className="text-gray-600">
          Stay on top of your health with detailed reports that track your progress. By submitting regular updates, you can easily monitor your progress, adjust your wellness plan, and keep moving toward your goals.
        </p>
      </div>

      {/* Get Feedback from Doctors */}
      <div className="mb-6 group relative">
        <h3 className="font-semibold text-xl mb-3 text-teal-500 group-hover:text-teal-700 transition duration-300">Expert Feedback from Doctors</h3>
        <p className="text-gray-600">
          After submitting your health reports, our network of licensed doctors will review your progress and provide personalized advice. Their expert feedback ensures you stay on track and make informed decisions about your health.
        </p>
      </div>

      {/* Download Button with Hover Animation */}
  <div className="flex justify-center mt-6">
        <button 
          className="bg-teal-500 text-white py-3 px-8 rounded-full text-lg font-semibold transition duration-300 transform hover:bg-teal-600 hover:scale-105"
          onClick={() => setShowQR(true)}
        >
          Download the App
        </button>
      </div>

      {/* QR Code Popup Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 relative">
            {/* Close button */}
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
            
            {/* Modal content */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Scan to Download
              </h3>
              
              {/* QR Code Image */}
              <div className="flex justify-center mb-4">
                <img 
                  src={QRcode} 
                  alt="QR Code to download app"
                  className="w-48 h-48 border border-gray-200"
                />
              </div>
              
              <p className="text-gray-600 mb-4">
                Scan this QR code with your phone to download our mobile app
              </p>
              
              <button
                onClick={() => setShowQR(false)}
                className="bg-teal-500 text-white py-2 px-6 rounded-full hover:bg-teal-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerReviewCarousel;
