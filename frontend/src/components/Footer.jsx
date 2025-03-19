import React from "react";
import { Link } from "react-scroll";



const Footer = () => {
  return (
    <div>
<div>
      </div>
    <div className="  text-white bg-gradient-to-r from-teal-400 to-teal-600 rounded-t-3xl mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className=" w-full md:w-1/4">
          <h1 className=" font-semibold text-xl pb-4">Health Tracker</h1>
          <p className=" text-sm">
            Our team of dedicated doctors, each specializing in unique fields
            such as orthopedics, cardiology, pediatrics, neurology, dermatology,
            and more.
          </p>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Services</h1>
          <nav className=" flex flex-col gap-2">
            <Link
              to="healthtracker"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Meal Tracker
            </Link>
            <Link
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Health Tracker
            </Link>
          </nav>
        </div>
      </div>
    </div>
    
    </div>

  );
};

export default Footer;
