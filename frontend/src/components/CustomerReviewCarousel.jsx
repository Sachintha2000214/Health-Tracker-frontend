import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const CustomerReviewCarousel = () => {
  return (
<div className="max-w-2xl mx-auto text-center py-20 p-6 relative">
  <h2 className="font-sans font-bold text-3xl mb-6 text-teal-600">About Health Tracker</h2>

  <p className="text-gray-700 mb-6 text-base px-4">
    Welcome to Health Tracker, your personal wellness companion. Our platform is designed to help you
    track your health journey by providing customized meal plans, collecting detailed user reports, 
    and connecting you with healthcare professionals to get expert feedback.
  </p>

  {/* Personalized Meal Plans */}
  <div className="mb-6 group relative">
    <h3 className="font-semibold text-xl mb-3 text-teal-500 group-hover:text-teal-700 transition duration-300">Personalized Meal Plans</h3>
    <p className="text-gray-600 text-base">
      With Health Tracker, you can get customized meal plans based on your dietary needs and health goals.
      Whether you're looking to lose weight, build muscle, or maintain a balanced lifestyle, our meal 
      plans are tailored just for you.
    </p>
  </div>

  {/* Track Your Health Reports */}
  <div className="mb-6 group relative">
    <h3 className="font-semibold text-xl mb-3 text-teal-500 group-hover:text-teal-700 transition duration-300">Track Your Health Reports</h3>
    <p className="text-gray-600">
      Keep track of your progress by submitting detailed health reports through our platform. 
      These reports help you stay on top of your goals, making it easier to monitor and adjust your 
      wellness plan as needed.
    </p>
  </div>

  {/* Get Feedback from Doctors */}
  <div className="mb-6 group relative">
    <h3 className="font-semibold text-xl mb-3 text-teal-500 group-hover:text-teal-700 transition duration-300">Get Feedback from Doctors</h3>
    <p className="text-gray-600">
      Once you submit your health reports, our network of qualified doctors can review them and 
      provide you with valuable feedback to help you stay on track. This ensures you receive 
      personalized advice and guidance to improve your overall health and wellness.
    </p>
  </div>

  {/* Download Button with Hover Animation */}
  <div className="flex justify-center mt-6">
    <button className="bg-teal-500 text-white py-3 px-8 rounded-full text-lg font-semibold transition duration-300 transform hover:bg-teal-600 hover:scale-105">
      Download the mobile app
    </button>
  </div>
</div>

  );
};

export default CustomerReviewCarousel;
