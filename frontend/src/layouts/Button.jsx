import React from "react";

const Button = ({ title }) => {
  return (
    <div>
      <button className="bg-pcolor text-white px-4 py-2 rounded-md transition duration-300 ease-in-out">
        {title}
      </button>
    </div>
  );
};

export default Button;
