import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Contact from "../models/Contact";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const openForm = () => {
    setShowForm(true);
    setMenu(false);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/userlogin");
    // window.location.href = "/login"; // Example redirect
  };

  return (
  <div className="fixed w-full z-10 text-white bg-gradient-to-r from-teal-400 to-teal-600 shadow-lg">
    <div className="flex justify-between items-center p-5 md:px-32 px-5">
      
      {/* Health Tracker Title */}
      <div className="flex items-center cursor-pointer space-x-2">
        <h1 className="text-3xl font-semibold text-white tracking-wide">Health Tracker</h1>
      </div>
      
      {/* User Info and Logout */}
      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-sm text-white font-medium">
            Welcome, <span className="font-bold">
              {user.doctornumber ? `Dr. ${user.name}` : user.name}
            </span>
            {!user.doctornumber && ` - ID: ${user.id}`}
          </span>

          <button 
            className="bg-white text-teal-600 font-semibold py-2 px-4 rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  </div>

  );
};

export default Navbar;
