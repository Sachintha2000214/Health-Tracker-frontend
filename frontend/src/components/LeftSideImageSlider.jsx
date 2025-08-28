import React, { useState, useEffect } from 'react';
import img1 from './img1.jpg'; // Replace with your actual image paths
import img2 from './img2.jpg';
import img3 from './img3.jpg';

const LeftSideImageSlider = () => {
  const images = [img1, img2, img3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="left-image-slider">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Blood sugar ${index}`}
          className={`slider-image ${index === currentIndex ? 'visible' : 'hidden'}`}
        />
      ))}
      <style jsx>{`
        .left-image-slider {
          position: fixed;
          top: 0;
          left: 0;
          width: 600px; /* doubled width */
          height: 100vh;
          overflow: hidden;
          z-index: 0;
        }
        .slider-image {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }
        .slider-image.visible {
          opacity: 1;
          z-index: 1;
        }
        .slider-image.hidden {
          opacity: 0;
          z-index: 0;
        }
      `}</style>
    </div>
  );
};

export default LeftSideImageSlider;
