import React from "react";
import img from "../assets/img/bg.jpg";
import ServicesSection from "./ServicesSection";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Doctors from "./Doctors";
import CustomerReviewCarousel from "./CustomerReviewCarousel";

const HealthTrackerHero = () => {  // Accepting user prop from parent or context

  return (
    <div className="bg-gradient-to-r from-teal-100 to-blue-100 min-h-screen flex flex-col">
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100 }}>
      <Navbar />
    </div>
    <div style={{ marginTop: "80px" }}> {/* Adjust the margin-top to prevent content from being hidden behind Navbar */}
      <CustomerReviewCarousel />
    </div>
    {/* Hero Section */}
    <div>
      <ServicesSection />
    </div>

    <div>
      <Doctors />
    </div>

    <Footer />
  </div>
  );
};

export default HealthTrackerHero;
