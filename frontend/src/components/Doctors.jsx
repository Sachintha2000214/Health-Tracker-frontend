import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const slider = useRef(null);

  // Array of doctor image paths
  const doctorImages = [
    "/src/assets/img/doctor12.png",
    "/src/assets/img/doctor12.png",
    "/src/assets/img/doctor12.png",
    "/src/assets/img/doctor12.png",
    "/src/assets/img/doctor12.png",
    "/src/assets/img/doctor12.png"
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://health-tracker-backend-s5ei.vercel.app/api/doctor/getalldoctors');
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        
        // Assign an image to each doctor in a cycle
        const doctorsWithImages = data.map((doctor, index) => ({
          ...doctor,
          img: doctorImages[index % doctorImages.length]
        }));
        
        setDoctors(doctorsWithImages);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-16">
      <div className="flex flex-col items-center lg:flex-row justify-between mb-10 lg:mb-0">
        <div>
          <h1 className="text-4xl font-semibold text-teal-600 text-center lg:text-start">
            Our Doctors
          </h1>
          <p className="mt-2 text-center lg:text-start">
            Meet our Specialist Doctors
          </p>
        </div>
        <div className="flex gap-5 mt-4 lg:mt-0">
          <button
            className="bg-[#d5f2ec] text-teal-500 px-4 py-2 rounded-lg active:bg-[#ade9dc]"
            onClick={() => slider.current.slickPrev()}
          >
            <FaArrowLeft size={25} />
          </button>
          <button
            className="bg-[#d5f2ec] text-teal-500 px-4 py-2 rounded-lg active:bg-[#ade9dc]"
            onClick={() => slider.current.slickNext()}
          >
            <FaArrowRight size={25} />
          </button>
        </div>
      </div>
      <div className="mt-5">
        {loading ? (
          <div className="text-center py-10">Loading doctors...</div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-10">No doctors found</div>
        ) : (
          <Slider ref={slider} {...settings}>
            {doctors.map((doctor, index) => (
              <div
                className="h-[350px] text-black rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-2 cursor-pointer"
                key={index}
              >
                <div>
                  <img
                    src={doctor.img || "/src/assets/img/doctor.jpg"}
                    alt={`Dr. ${doctor.name}`}
                    className="h-56 rounded-t-xl w-full"
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-semibold text-xl text-teal-500 pt-4">
                    Dr. {doctor.name}
                  </h1>
                  <h3 className="pt-2">{doctor.specialization}</h3>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Doctors;

