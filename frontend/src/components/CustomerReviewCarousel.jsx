import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const CustomerReviewCarousel = () => {
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
        <button className="bg-teal-500 text-white py-3 px-8 rounded-full text-lg font-semibold transition duration-300 transform hover:bg-teal-600 hover:scale-105">
          Download the App
        </button>
      </div>
    </div>
  );
};

export default CustomerReviewCarousel;
