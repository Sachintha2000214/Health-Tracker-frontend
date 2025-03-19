import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  // Slider content
  const slides = [
    {
      id: 1,
      name: "Selina Destin",
      role: "Web Development Agency",
      quote:
        "Untitled has become essential in starting every new project, we can't imagine working without it.",
    },
    {
      id: 2,
      name: "Kristin Watson",
      role: "Medical Assistant",
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    },
    {
      id: 3,
      name: "Darrell Steward",
      role: "Marketing Coordinator",
      quote:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5555/api/doctor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Login successful:", result);
        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("user", JSON.stringify(result.doctor));
        navigate("/docdashboard");
      } else {
        console.error("Error:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="relative py-20 lg:py-10 overflow-hidden">
      <div className="container mx-auto shadow-xl rounded-lg p-8 bg-sky-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap -mx-4 xl:items-center">
            {/* Slider Section */}
            <div className="w-full lg:w-1/2 xl:w-3/5 px-4 order-last lg:order-first">
              <div className="relative max-w-xl mx-auto lg:mx-0 lg:max-w-3xl h-full">
                <img
                  className="block w-full h-166 lg:h-full object-cover rounded-3xl"
                  src="aa.jpg"
                  alt="Slider Background"
                />
                <div className="absolute bottom-0 w-full left-0 p-4 sm:p-6">
                  <div className="p-6 sm:p-10 backdrop-blur-md backdrop-filter bg-black bg-opacity-30 rounded-5xl">
                    <div className="overflow-hidden">
                      <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                          transform: `translateX(-${activeSlide * 100}%)`,
                        }}
                      >
                        {slides.map((slide, index) => (
                          <div
                            key={slide.id}
                            className="flex-shrink-0 h-full w-full p-5"
                          >
                            <h5 className="text-3xl text-white font-semibold mb-2">
                              {slide.name}
                            </h5>
                            <span className="block text-sm text-white font-semibold mb-6">
                              {slide.role}
                            </span>
                            <p className="max-w-xl text-2xl text-white font-semibold mb-15">
                              {slide.quote}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handleSlideChange(index)}
                          className={`inline-block mr-2 h-1 w-5 rounded-full cursor-pointer ${
                            activeSlide === index
                              ? "bg-blue-900"
                              : "bg-white hover:bg-blue-100"
                          }`}
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Login Section */}
            <div className="w-full lg:w-1/2 xl:w-2/5 px-4 mb-16 lg:mb-0">
              <div className="max-w-md lg:py-20 mx-auto lg:mr-0">
                <h3 className="font-heading text-4xl text-gray-900 font-semibold mb-4">
                  Sign in to your account
                </h3>
                <p className="text-lg text-gray-500 mb-10">
                  Greetings on your return! We kindly request you to enter your
                  details.
                </p>
                <form onSubmit={handleLogin}>
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
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-7">
                    <div className="flex mb-1.5 items-center justify-between">
                      <label
                        className="block text-sm text-gray-900 font-semibold"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <a
                        className="inline-block text-xs font-semibold text-orange-900 hover:text-gray-900"
                        href="#"
                      >
                        Forget password?
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        className="absolute top-1/2 right-0 mr-3 transform -translate-y-1/2 inline-block hover:scale-110 transition duration-100"
                        type="button"
                      >
                        <img
                          className="h-6 w-6"
                          src="eye.png"
                          alt="Show password"
                        />
                      </button>
                    </div>
                  </div>
                  <button
                    className="relative group block w-full mb-6 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-orange-900 rounded-full overflow-hidden"
                    type="submit"
                  >
                    <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                    <span className="relative">Login</span>
                  </button>
                  <span className="text-xs font-semibold text-gray-900">
                    <span>Don’t have an account?</span>
                    <Link to="/register">
                    <a
                      className="ml-1 inline-block text-orange-900 hover:text-orange-700"
                      href="#"
                    >
                      Sign up
                    </a>
                    </Link>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
