import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import img1 from "../assets/img/meal-tracker.jpg"
import img2 from "../assets/img/HEALTHTRACK.png"

const ServicesSection = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);

      // Conditionally set services
      if (storedUser.doctornumber) {
        setServices([
          {
            title: "View Patient Reports",
            description: "Access your patients' health and meal reports easily.",
            button: "View",
            img: img2, // make sure you have this image imported
          },
        ]);
      } else {
        setServices([
          {
            title: "Meal Tracker",
            description:
              "Learn your diet and track meal information using our application to live a healthier life.",
            button: "Next",
            img: img1,
          },
          {
            title: "Health Tracker",
            description:
              "Get in touch with your family doctor for consultations and medical advice anytime.",
            button: "Next",
            img: img2,
          },
        ]);
      }
    }
  }, []);

  const handleNavigate = (index) => {
    if (user?.doctornumber) {
      navigate("/reports"); // your route for doctors
    } else {
      if (index === 0) {
        navigate("/mealtracker");
      } else if (index === 1) {
        navigate("/healthtracker");
      } else {
        alert("Feature coming soon!");
      }
    }
  };
  
  return (
    <div id="services" className="bg-neutralBackground py-12 px-4">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-darkColor mb-8">
        Our <span className="text-teal-500">Main Services</span> Categories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 text-center flex flex-col items-center"
          >
            <img
              src={service.img}
              alt={service.title}
              className="h-48 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-500 mb-4">{service.description}</p>
            <button
              className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-500 transition duration-300"
              onClick={() => handleNavigate(index)} // Trigger navigation
            >
              {service.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
